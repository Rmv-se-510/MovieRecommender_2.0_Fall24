from flask import render_template,url_for,flash,redirect,jsonify,request
from flask_cors import CORS, cross_origin
from movierecommender import app,db, bcrypt
from movierecommender.forms import RegistrationForm, LoginForm
from flask_login import login_user, current_user, logout_user, login_required
from movierecommender.models import User, Post
import json
import sys
import csv
import time
import re
import os
import requests
from movierecommender.prediction_scripts.item_based import recommendForNewUser
from movierecommender.search import Search
from dotenv import load_dotenv
CORS(app, resources={r"/*": {"origins": "*"}})


# Load the .env file
load_dotenv()

# Get API Keys from .env file
OMDB_API_KEY = os.getenv("OMDB_API_KEY")
api_key = os.getenv("tmdb_api_key")


def clean_movie_title(title):
    year = re.search(r'\((\d{4})\)', title).group(1)

    new_title = re.sub(r'[^A-Za-z0-9\s]', '', re.sub(r'\(.*?\)', '', title))
    
    return new_title, year


def get_movie_info(title): 

    new_title, year = clean_movie_title(title)   # removes special characters from title and returns title and year of release as 2 variables

    url = f"http://www.omdbapi.com/?t={new_title}&y={year}&apikey={OMDB_API_KEY}"   # make API call with year for better result
    print(url)
    response = requests.get(url)
    if response.status_code == 200:
        res=response.json()
        print(res)
        if(res['Response'] == "True"):
            return res
        else:  
            return { 'Title': title, 'imdbRating':"N/A", 'Genre':'N/A',"Poster":"https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg"}
    else:
        return  { 'Title': title, 'imdbRating':"N/A",'Genre':'N/A', "Poster":"https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg"}


@app.route("/home")
def landing_page():
    return render_template("landing_page.html")

@app.route("/", methods=['GET','POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('landing_page'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created! You are now able to log in', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)
@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('landing_page'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('landing_page'))
        else:
            flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)
@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('register'))
@app.route("/account")
@login_required
def account():
    return render_template('account.html', title='Account')

    


@app.route("/predict", methods=["POST"])
# def predict():
#     data = json.loads(request.data)  # contains movies
#     data1 = data["movie_list"]
#     training_data = []
#     for movie in data1:
#         movie_with_rating = {"title": movie, "rating": 5.0}
#         training_data.append(movie_with_rating)
#     recommendations = recommendForNewUser(movie_with_rating)
    
#     for movie in data1:    
#         movie_info = get_movie_info(movie)
#         if movie_info:
#             movie_with_rating["title"]=movie
#             movie_with_rating["rating"]=movie_info["imdbRating"]
    
#     recommendations = recommendations[:10]
#     resp = {"recommendations": recommendations}
#     return resp
def predict():
    data = json.loads(request.data)  # contains movies from the user
    print("data ",data) #~
    data1 = data["movie_list"]
    training_data = []
    for movie in data1:
        movie_with_rating = {"title": movie, "rating": 5.0}
        training_data.append(movie_with_rating)
    recommendations = recommendForNewUser(training_data)
    recommendations = recommendations[:10] # Top 10 recommended
    print("recommendations Top 10", recommendations) #~
    for movie in recommendations:
        movie_info = get_movie_info(movie)
        #print("movie_info", movie_info) #~

        if(movie_info.get('imdbID')): # IMDB ID
            imdb_id = movie_info['imdbID'] #~
            #print("IMDB id = ", imdb_id)
            url = f'https://api.themoviedb.org/3/find/{imdb_id}?external_source=imdb_id&api_key={api_key}'
            resp = requests.get(url)
            if resp.status_code == 200:
                res1=resp.json()
                #print('res1', res1)

                if(res1["movie_results"]):
                    movie_id = res1["movie_results"][0]['id']
                    print('movie id', movie_id)
                    url2 = f'https://api.themoviedb.org/3/movie/{movie_id}/videos?language=en-US&api_key={api_key}'
                    res_vid = requests.get(url2)
                    if res_vid.status_code == 200:
                        res_vid=res_vid.json()
                        #print("res_vid",res_vid)
                        if(res_vid['results']):
                            url_vid = f"https://www.youtube.com/watch?v={res_vid['results'][0]['key']}"
                            #print('url_vid_________________',url_vid)
                        else:
                            #print('empty video')
                            url_vid = None
                    else:
                        url_vid = None
                else:
                    movie_id = None
                    print('Empty list')
                    url_vid=None
            else:
                url_vid = None
                
        else:
            imdb_id = None #~
            url_vid = None
        #print(movie_info['imdbRating']) 
        if movie_info:
            movie_with_rating[movie+"-r"]=movie_info['imdbRating']
            movie_with_rating[movie+"-g"]=movie_info['Genre']
            movie_with_rating[movie+"-p"]=movie_info['Poster']
            movie_with_rating[movie+"-u"]=url_vid

    resp = {"recommendations": recommendations, "rating":movie_with_rating}
    return resp

@app.route("/search", methods=['GET','POST'])
def search():
    term = request.form["q"]
    print("term= ", term) #~
    search = Search()
    filtered_dict = search.resultsTop10(term)
    resp = jsonify(filtered_dict)
    resp.status_code = 200
    return resp

@app.route("/feedback", methods=["POST"])
def feedback():
    data = json.loads(request.data)
    stri=""
    with open(f"experiment_results/feedback_{int(time.time())}.csv", "w") as f:
        for key in data.keys():
            f.write(f"{key} - {data[key]}\n")
            stri+=key+":"+data[key]+" "
            

    post = Post(title="movieratings", content=stri, author=current_user)
    db.session.add(post)
    db.session.commit()
    print(data)
    return data
@app.route("/movie")
def movie():
    posts=Post.query.all()
    return render_template("movie.html",posts=posts)

@app.route("/success")
def success():
    return render_template("success.html")
