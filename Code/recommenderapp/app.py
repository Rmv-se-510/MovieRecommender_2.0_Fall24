from movierecommender.models import MovieList, User, Feedback
from movierecommender import app,db
if __name__ == "__main__":
    MovieList.__table__.drop(db.engine)
    User.__table__.drop(db.engine)
    Feedback.__table__.drop(db.engine)
    # db.drop_all()
    db.create_all()
    app.run(port=5001, debug=True)
