from flask import render_template,url_for,flash,redirect,jsonify,request
from flask_cors import CORS, cross_origin
from movierecommender import app,db, bcrypt
# from movierecommender.forms import RegistrationForm, LoginForm
from flask_login import login_user, current_user, logout_user, login_required
from movierecommender.models import MovieList, User, Feedback
import json
import sys
# import csv
import time
import re
import os
import requests
# from movierecommender.prediction_scripts.item_based import recommendForNewUser
from movierecommender.search import Search
from dotenv import load_dotenv
from sqlalchemy import and_

CORS(app, resources={r"/*": {"origins": "*"}})




# Load the .env file
load_dotenv()

# Get API Keys from .env file
api_key = os.getenv("api_key")
access_token = os.getenv("access_token")


# def clean_movie_title(title):
#     year = re.search(r'\((\d{4})\)', title).group(1)
#     new_title = re.sub(r'\(.*?\)', '', title)
#     new_title = re.sub(r'[^A-Za-z0-9\s]', '', new_title).strip()

#     return new_title, year

def clean_movie_title(title):
    if title == " ":
        return "Blank title", 9999

    year = re.search(r'\((\d{4})\)', title).group(1)
    new_title = re.sub(r'\(.*?\)', '', title)
    new_title = re.sub(r'[^A-Za-z0-9\s/]', '', new_title).strip()

    return new_title, year

def get_genre_info():
    genre_url = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}&language=en-US'
    response = requests.get(genre_url)
    genres = response.json()['genres']

    genre_dict = {}
    for genre in genres:
        genre_dict[genre['id']] = genre['name']

    return genre_dict


def get_movie_info2(title):

    genre_dict = get_genre_info()

    new_title, year = clean_movie_title(title)

    url = f'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={new_title}&year={year}'

    response = requests.get(url)
    movie_data = response.json()

    info = {}

    if movie_data['results']:
        movie = movie_data['results'][0]

        movie_id = movie['id']
        # title = movie['title']
        poster_path = movie.get('poster_path', '')
        vote_average = movie.get('vote_average', 'N/A')
        genres = movie.get('genre_ids', [])

        poster_url = f'https://image.tmdb.org/t/p/w500{poster_path}' if poster_path else 'No poster available'

        genre_names = [genre_dict[genres] for genres in genres]
        vote_average = round(vote_average, 1) # round rating to 1 decimal pt
        info = { 'MovieID': movie_id, 'Title': title, 'rating':vote_average, 'Genre':genre_names, 'Poster':poster_url}

    else:
        info = { 'MovieID': "N/A", 'Title': title, 'rating':"N/A",'Genre':'N/A', 'Poster':'https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg'}


    return info

# def get_movie_info(title):

#     new_title, year = clean_movie_title(title)   # removes special characters from title and returns title and year of release as 2 variables

#     url = f"http://www.omdbapi.com/?t={new_title}&y={year}&apikey={OMDB_API_KEY}"   # make API call with year for better result

#     print(url)
#     response = requests.get(url)
#     if response.status_code == 200:
#         res=response.json()
#         print(res)
#         if(res['Response'] == "True"):
#             return res
#         else:
#             return { 'Title': title, 'imdbRating':"N/A", 'Genre':'N/A'} #,"Poster":"https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg"}
#     else:
#         return  { 'Title': title, 'imdbRating':"N/A",'Genre':'N/A'} #, "Poster":"https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg"}


def get_poster(title):

    new_title, year = clean_movie_title(title)

    url = f'https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={new_title}&year={year}'



    response = requests.get(url)
    movie_data = response.json()

    if movie_data['results']:

        movie = movie_data['results'][0]   # get first result

        title = movie['title']
        poster_path = movie.get('poster_path', '')

        poster_url = f'https://image.tmdb.org/t/p/w500{poster_path}' if poster_path else 'https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg'



    else:
        poster_url = "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg"

    return poster_url


@app.route("/home")
def landing_page():
    return render_template("landing_page.html")

@app.route("/register", methods=['POST'])
def register():
    payload = request.get_json()
    username = payload["username"]
    email = payload["email"]
    password = payload["password"]
    # print(username, email,password)
    user = User()
    user.username = username
    user.email = email
    user.password = password
    try:
        db.session.add(user)
        db.session.commit()
        resp = {"message": "Account created successfully"}
        return jsonify(resp),200
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        print(e)
        resp = {"error": "Registration failed, try again later"}
        return jsonify(resp),400

@app.route("/login", methods=['POST'])
def login():
    payload = request.get_json()
    email = payload["email"]
    password = payload["password"]
    user = User.query.filter_by(email = email).all()
    if(len(user) > 1):
        # This should not happen owing to the uniqueness constraints we have in our schema
        print("This should not happen because of the uniqueness constraints of our User schema, more than one user cannot have the same email",user)
        return jsonify({"error": "Something went wrong while trying to login"}),500
    elif(len(user) == 0):
        return jsonify({"error": "Invalid user email. Register first before logging in"}),404
    elif(password != user[0].password):
        return jsonify({"error": "Passwords do not match"}),404
    # print(user[0].email, user[0].password, user[0].password == password)
    return jsonify({"message": "Logged in successfully", "id":user[0].id}),200

@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('register'))
@app.route("/account")
@login_required
def account():
    return render_template('account.html', title='Account')




# @app.route("/predict", methods=["POST"])
# # def predict():
# #     data = json.loads(request.data)  # contains movies
# #     data1 = data["movie_list"]
# #     training_data = []
# #     for movie in data1:
# #         movie_with_rating = {"title": movie, "rating": 5.0}
# #         training_data.append(movie_with_rating)
# #     recommendations = recommendForNewUser(movie_with_rating)

# #     for movie in data1:
# #         movie_info = get_movie_info(movie)
# #         if movie_info:
# #             movie_with_rating["title"]=movie
# #             movie_with_rating["rating"]=movie_info["imdbRating"]

# #     recommendations = recommendations[:10]
# #     resp = {"recommendations": recommendations}
# #     return resp
# def predict():
#     data = json.loads(request.data)  # contains movies from the user
#     print("data ",data) #~
#     data1 = data["movie_list"]
#     training_data = []
#     for movie in data1:
#         movie_with_rating = {"title": movie, "rating": 5.0}
#         training_data.append(movie_with_rating)
#     print(training_data)
#     recommendations = recommendForNewUser(training_data)
#     recommendations = recommendations[:12] # Top 10 recommended
#     print("recommendations Top 12", recommendations) #~
#     for movie in recommendations:
#         movie_info = get_movie_info2(movie)
#         #print("movie_info", movie_info) #~

#         # if(movie_info.get('imdbID')): # IMDB ID
#         if(movie_info['MovieID']): # IMDB ID
#             # imdb_id = movie_info['imdbID'] #~
#             imdb_id = movie_info['MovieID'] #~
#             #print("IMDB id = ", imdb_id)
#             # url = f'https://api.themoviedb.org/3/find/{imdb_id}?external_source=imdb_id&api_key={api_key}'
#             url = f'https://api.themoviedb.org/3/movie/{imdb_id}/videos?api_key={api_key}'
#             resp = requests.get(url)
#             if resp.status_code == 200:
#                 res1=resp.json()
#                 print('res1', res1)

#                 trailer = next((video for video in res1['results'] if video['type'] == 'Trailer'), None)
#                 if trailer:
#                     url_vid = f"https://www.youtube.com/watch?v={trailer['key']}"
#                     print(f"Trailer URL: {url_vid}")
#                 else:
#                     url_vid = None


#                 # if(res1["movie_results"]):
#                 #     movie_id = res1["movie_results"][0]['id']
#                 #     print('movie id', movie_id)
#                 #     url2 = f'https://api.themoviedb.org/3/movie/{movie_id}/videos?language=en-US&api_key={api_key}'
#                 #     res_vid = requests.get(url2)
#                 #     if res_vid.status_code == 200:
#                 #         res_vid=res_vid.json()
#                 #         #print("res_vid",res_vid)
#                 #         if(res_vid['results']):
#                 #             url_vid = f"https://www.youtube.com/watch?v={res_vid['results'][0]['key']}"
#                 #             print('url_vid_________________',url_vid)
#                 #         else:
#                 #             print('empty video')
#                 #             url_vid = None
#                 #     else:
#                 #         url_vid = None
#                 # else:
#                 #     movie_id = None
#                 #     print('Empty list')
#                 #     url_vid=None
#             else:
#                 url_vid = None

#             credits_url = f'https://api.themoviedb.org/3/movie/{imdb_id}/credits?api_key={api_key}'
#             credits_response = requests.get(credits_url)
#             credits_data = credits_response.json()
#             # print("CREDITS", credits_data)

#             cast = credits_data.get('cast', [])

#             top_cast = []
#             for actor in cast[:3]:    # get top 3 actors
#                 top_cast.append(actor['name'])
#             actors = ', '.join(top_cast)

#             crew = credits_data.get('crew', [])
#             director = ' '
#             for member in crew:
#                 if member['job'] == 'Director':
#                     director = member['name']
#                     break

#         else:
#             imdb_id = None
#             url_vid = None
#             top_cast = None
#             director = None


#         if movie_info:
#             movie_with_rating[movie+"-i"]=imdb_id
#             movie_with_rating[movie+"-t"]=movie_info['Title']
#             movie_with_rating[movie+"-r"]=movie_info['rating']
#             movie_with_rating[movie+"-g"]=movie_info['Genre']
#             movie_with_rating[movie+"-p"]=movie_info['Poster']
#             movie_with_rating[movie+"-u"]=url_vid
#             movie_with_rating[movie+"-c"]=actors
#             movie_with_rating[movie+"-d"]=director

#     resp = {"recommendations": recommendations, "rating":movie_with_rating}
#     return resp



@app.route("/predict", methods=["POST"])
def predict():
    data = json.loads(request.data)  # contains movies from the user
    print("data ",data) 
    fetched_movies = []
    movieData = []
    
    for movie_id in data['movie_id_list']:
        fetched_movies.append(movie_id)
        url = f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations?language=en-US&page=1"

        headers = {
            "accept": "application/json",
            "Authorization": "Bearer "+access_token
        }

        response = requests.get(url, headers=headers)

        response = response.json()['results'][:3]
        for result in response:    
            fetched_movies.append(result['id'])
        
    # getting the details of all the movies from movie api
    
    for movie_id in set(fetched_movies):
        response = fetch_movie_details(movie_id)
        movieData.append(response)
                    
    resp = {"recommendations": movieData}
    return resp

@app.route("/movie_details",methods=['POST'])
def movie_details():
    movie_id = request.json['movie_id']
    result = fetch_movie_details(movie_id)
    return jsonify(result)



def fetch_movie_details(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?language=en-US"

    headers = {
        "accept": "application/json",
        "Authorization": "Bearer "+ access_token
    }

    response = requests.get(url, headers=headers)
    return response.json()


@app.route("/search", methods=['GET','POST'])
def search():
    term = request.form["q"]
    print("term= ", term) #~
    search = Search()
    filtered_dict = search.resultsTop10(term)
    resp = jsonify(filtered_dict)
    resp.status_code = 200
    return resp

# @app.route("/feedback", methods=["POST"])
# def feedback():
#     data = json.loads(request.data)
#     stri=""
#     with open(f"experiment_results/feedback_{int(time.time())}.csv", "w") as f:
#         for key in data.keys():
#             f.write(f"{key} - {data[key]}\n")
#             stri+=key+":"+data[key]+" "


#     post = Feedback(title="movieratings", content=stri, author=current_user)
#     db.session.add(post)
#     db.session.commit()
#     print(data)
#     return data


@app.route("/movie/<user>/<listType>", methods=["GET"])
def getMoviesInList(user, listType):
    user = int(user)
    listType = int(listType)

    # Fetch all movie details from the MovieList for the given user and listType
    rows = MovieList.query.filter_by(userId=user, listType=listType).all()
    # Format response with detailed movie information
    movieData = [
        {
            "id": row.movieId,
            "title": row.title,         # Movie title
            "poster": row.poster,       # Movie poster URL
            "rating": row.rating,       # Movie rating
            "genre": row.genre,         # e.g., "Action, Sci-Fi"
            "cast": row.cast,           # e.g., "Leonardo DiCaprio, Joseph Gordon-Levitt"
            "director": row.director    # e.g., "Christopher Nolan"
        }
        for row in rows
    ]
    print(movieData)
    return jsonify({"movies": movieData}), 200


@app.route("/movie/<user>/<listType>/<movieId>", methods=["DELETE"])
def removeMovieFromList(user,listType,movieId):
    user = int(user)
    listType = int(listType)
    movieId = int(movieId)
    print(user,type,movieId)
    try:
        db.session.query(MovieList).filter(and_(MovieList.userId == user , MovieList.listType == listType , MovieList.movieId== movieId)).delete()
        db.session.commit()
        return jsonify({"message": "Deleted movie from the list"}),200
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        print(e)
        resp = {"error": "Deleting movie from the list failed"}
        return jsonify(resp),400

@app.route("/movie/<user>/<listType>/<movieId>", methods=["POST"])
def addMovieToList(user, listType, movieId):
    print(user, listType, movieId)
    user = int(user)
    listType = int(listType)
    movieId = int(movieId)

    # Extract additional movie details from the request body
    details = request.get_json()
    title = details.get("title")
    poster = details.get("poster")
    director = details.get("director")
    cast = details.get("cast")
    genre = details.get("genre")
    rating = details.get("rating")

    print(user, listType, movieId, title)

    rows = db.session.query(MovieList).filter(
        and_(
            MovieList.userId == user,
            MovieList.movieId == movieId,
        )
    ).all()

    if len(rows) > 0:
        resp = {"error": "Adding movie to the list failed"}
        return jsonify(resp), 400

    # Create a new row with additional details
    row = MovieList(
        userId=user,
        movieId=movieId,
        listType=listType,
        title=title,
        poster=poster,
        director=director,
        cast=cast,
        genre=genre,
        rating=rating,
    )
    try:
        db.session.add(row)
        db.session.commit()
        return jsonify({"message": "Added movie to the list"}), 200
    except Exception as e:
        db.session.rollback()
        db.session.flush()
        print(e)
        resp = {"error": "Adding movie to the list failed"}
        return jsonify(resp), 400


@app.route("/movie")
def movie():
    posts=Feedback.query.all()
    return render_template("movie.html",posts=posts)

@app.route("/success")
def success():
    return render_template("success.html")

@app.route("/cast",methods=["GET", "POST"])
def get_cast():
    movie_id = request.json['movie_id']
    credits_url = f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={api_key}'
    credits_response = requests.get(credits_url)
    credits_data = credits_response.json()
    print("CREDITS", credits_data)

    cast = credits_data.get('cast', [])

    top_cast = []
    for actor in cast[:3]:    # get top 3 actors
        top_cast.append(actor['name'])
    actors = ', '.join(top_cast)

    crew = credits_data.get('crew', [])
    director = ' '
    for member in crew:
        if member['job'] == 'Director':
            director = member['name']
            break
        
    return jsonify({"cast": actors, "director": director})