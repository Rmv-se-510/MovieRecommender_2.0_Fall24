
from datetime import datetime
from movierecommender import db , login_manager
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))
class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    feedback = db.relationship('Feedback', backref='author', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Feedback(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)

    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Feedback('{self.title}','{self.content}')"

class MovieList(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    movieId = db.Column(db.Integer, primary_key=True)
    listType = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=True)  # Movie title
    poster = db.Column(db.String(500), nullable=True)  # Poster URL
    director = db.Column(db.String(100), nullable=True)  # Director
    cast = db.Column(db.Text, nullable=True)  # Cast details
    genre = db.Column(db.String(100), nullable=True)  # Genre
    rating = db.Column(db.Float, nullable=True)  # Rating (e.g., IMDb)

    def __repr__(self):
        return f"MovieList('{self.userId}', '{self.movieId}', '{self.listType}', '{self.title}')"


# class LikedMovies(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     movie_id = db.Column(db.Integer, nullable=False)
#     movie_title = db.Column(db.String(100), nullable=False)

#     # Relationship backref (optional if you want to access liked movies from User object)
#     user = db.relationship('User', backref=db.backref('liked_movies', lazy=True))

#     def __repr__(self):
#         return f"LikedMovies('{self.user_id}', '{self.movie_id}', '{self.movie_title}')"


# class WatchLater(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     movie_id = db.Column(db.Integer, nullable=False)
#     movie_title = db.Column(db.String(100), nullable=False)

#     # Relationship backref (optional if you want to access watch later movies from User object)
#     user = db.relationship('User', backref=db.backref('watch_later', lazy=True))

#     def __repr__(self):
#         return f"WatchLater('{self.user_id}', '{self.movie_id}', '{self.movie_title}')"




