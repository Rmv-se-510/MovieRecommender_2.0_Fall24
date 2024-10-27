# from Code.recommenderapp.movierecommender import db
# from Code.recommenderapp import app
from movierecommender import app,db

if __name__ == "__main__":
    db.create_all()
    app.run(port=5001, debug=True)
