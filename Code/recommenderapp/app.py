from movierecommender.models import MovieList
from movierecommender import app,db
if __name__ == "__main__":
    # MovieList.__table__.drop(db.engine)
    db.create_all()
    app.run(port=5001, debug=True)
