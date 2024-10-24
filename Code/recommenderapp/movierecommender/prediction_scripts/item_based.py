import pandas as pd
import warnings
import os
from fuzzywuzzy import process

app_dir = os.path.dirname(os.path.abspath(__file__))
code_dir = os.path.dirname(app_dir)
project_dir = os.path.dirname(code_dir)

ratings = pd.read_csv(code_dir + "/data/ratings.csv")
# movies = pd.read_csv(code_dir + "/data/movies.csv")
movies = pd.read_csv(code_dir + "/data/cleaned_movies.csv")

warnings.filterwarnings("ignore")

def find_title_match(input_titles):

    user_movies = []

    for i in range(len(input_titles)):
        user_movies.append(input_titles[i]['title'])
    
    print(user_movies)

    matched_movies = []
    training_data = []

    correct_titles = movies['title'].tolist()

    for movie in user_movies:

        best_match = process.extractOne(movie, correct_titles)

        if best_match:
            matched_movies.append(best_match[0])
        else:
            matched_movies.append(movie)
    
    print(matched_movies)
    
    for movie in matched_movies:
        movie_with_rating = {"title": movie, "rating": 5.0}
        training_data.append(movie_with_rating)
    print(training_data)
    
    return training_data


def recommendForNewUser(user_rating):

    user_rating = find_title_match(user_rating)

    user = pd.DataFrame(user_rating)
    userMovieID = movies[movies["title"].isin(user["title"])]
    movie_list = list(userMovieID["title"])
    userRatings = pd.merge(userMovieID, user)

    moviesGenreFilled = movies.copy(deep=True)
    copyOfMovies = movies.copy(deep=True)
    for index, row in copyOfMovies.iterrows():
        copyOfMovies.at[index, "genres"] = row["genres"].split("|")
    for index, row in copyOfMovies.iterrows():
        for genre in row["genres"]:
            moviesGenreFilled.at[index, genre] = 1
    moviesGenreFilled = moviesGenreFilled.fillna(0)

    userGenre = moviesGenreFilled[moviesGenreFilled.movieId.isin(userRatings.movieId)]
    userGenre.drop(["movieId", "title", "genres"], axis=1, inplace=True)
    userProfile = userGenre.T.dot(userRatings.rating.to_numpy())
    moviesGenreFilled.set_index(moviesGenreFilled.movieId)
    moviesGenreFilled.drop(["movieId", "title", "genres"], axis=1, inplace=True)

    recommendations = (moviesGenreFilled.dot(userProfile)) / userProfile.sum()
    joinMoviesAndRecommendations = movies.copy(deep=True)

    for movie in movie_list:               # drop movies just searched for from showing on recommended list
        rows_to_drop = joinMoviesAndRecommendations[joinMoviesAndRecommendations['title'] == movie].index

        joinMoviesAndRecommendations = joinMoviesAndRecommendations.drop(rows_to_drop)

    joinMoviesAndRecommendations["recommended"] = recommendations
    joinMoviesAndRecommendations.sort_values(
        by="recommended", ascending=False, inplace=True
    )
    #print("returning value " ,[x for x in joinMoviesAndRecommendations["title"]][:201]) #~
    return [x for x in joinMoviesAndRecommendations["title"]][:201]
