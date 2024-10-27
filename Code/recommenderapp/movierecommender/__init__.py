from flask import Flask

from flask_sqlalchemy import SQLAlchemy


import sys
from flask_bcrypt import Bcrypt
from flask_login import LoginManager



sys.path.append("../../")


import requests

app = Flask(__name__)
app.secret_key = "secret key"
app.config['SECRET_KEY']='3e5078d69a0c5e023fd5daed7cc9f5f4'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db=SQLAlchemy(app)
bcrypt=Bcrypt(app)
login_manager=LoginManager(app)
login_manager.login_view='login'
login_manager.login_message_category='info'

app.app_context().push()
app.config["SQLALCHEMY_ECHO"] = True
app.config["SQLALCHEMY_RECORD_QUERIES"] = True

# from movierecommender import routes