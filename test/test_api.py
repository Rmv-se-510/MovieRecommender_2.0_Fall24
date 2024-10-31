import unittest
import warnings
import sys
import os


sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "../Code/recommenderapp/"))
)

# Code\recommenderapp\movierecommender\routes.py
from movierecommender.routes import get_movie_info2, clean_movie_title
from movierecommender.prediction_scripts.item_based import find_title_match

warnings.filterwarnings("ignore")


class Tests(unittest.TestCase):

    def test_movieid(self):
        title = " "
        info = get_movie_info2(title)
        print(info)
        self.assertTrue(info['MovieID'] == "N/A")

    def test_movieid_validtitle(self):
        title = "Toy Story 3 (2010)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['MovieID'] == "N/A")
    
    def test_empty_title(self):
        title = " "
        info = get_movie_info2(title)
        print(info)
        self.assertTrue(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_title_apostrophe(self):
        title = "It's Such a Beautiful Day (2012)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_title_amp(self):
        title = "Dumb & Dumber (1994)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_title_slash(self):
        title = "The Batman/Superman Movie (1998)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_title_half(self):
        title = "The Lion King 1½ (2004)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_title_colon(self):
        title = "The Darkman II: Return of Durant (1995)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_title_question(self):
        title = "Who Am I? (1998)"
        info = get_movie_info2(title)
        print(info)
        self.assertFalse(info['Poster'] == "https://www.creativefabrica.com/wp-content/uploads/2020/12/29/Line-Corrupted-File-Icon-Office-Graphics-7428407-1.jpg")

    def test_genres_scifi(self):
        title = "Interstellar (2014)"
        info = get_movie_info2(title)
        print(info)
        self.assertTrue("Science Fiction" in info['Genre']) 

    def test_genres_animation(self):
        title = "Toy Story (1995)"
        info = get_movie_info2(title)
        print(info)
        self.assertTrue("Animation" in info['Genre']) 
    
    def test_rating(self):
        title = "Toy Story (1995)"
        info = get_movie_info2(title)
        print(info)
        self.assertTrue(info['rating'] >= 0 and info['rating'] <= 10)

    def test_matching(self):
        movies = [{"title": "The Dark Knight", "rating": 5.0}, {"title": "The Empire Strikes Back", "rating": 5.0}]
        matched_movies = find_title_match(movies)
        self.assertTrue(matched_movies == [{'title': 'The Dark Knight (2008)', 'rating': 5.0}, {'title': 'Star Wars: Episode V - The Empire Strikes Back (1980)', 'rating': 5.0}])

    def test_matching_many(self):
        movies = [{"title": "Ginger Snaps Unleashed", "rating": 5.0}]
        matched_movies = find_title_match(movies)
        self.assertTrue(matched_movies == [{'title': 'Ginger Snaps: Unleashed (2004)', 'rating': 5.0}])

    def test_matching_shortened(self):
        movies = [{"title": "Harry Potter", "rating": 5.0}]
        matched_movies = find_title_match(movies)
        # print("MATCHED", matched_movies)
        self.assertTrue('Harry Potter' in matched_movies[0]['title'])

    def test_title_clean(self):
        title = "Interstellar (2014)"
        newtitle, year = clean_movie_title(title)
        self.assertEqual(newtitle, "Interstellar")
        self.assertEqual(year, "2014")
    
    def test_title_clean_slash(self):
        title = "The Batman/Superman Movie (1998)"
        newtitle, year = clean_movie_title(title)
        self.assertEqual(newtitle, "The Batman/Superman Movie")
        self.assertEqual(year, "1998")

    def test_title_clean_amp(self):
        title = "Dumb & Dumber (1994)"
        newtitle, year = clean_movie_title(title)
        self.assertEqual(newtitle, "Dumb  Dumber")   # title cleaning function removes the special characters that break the API
        self.assertEqual(year, "1994")
    
    def test_title_clean_colon(self):
        title = "Ice Age 2: The Meltdown (2006)"
        newtitle, year = clean_movie_title(title)
        self.assertEqual(newtitle, "Ice Age 2 The Meltdown")   # title cleaning function removes the special characters that break the API
        self.assertEqual(year, "2006")
    
    def test_title_clean_numerictitle(self):
        title = "9/11 (2002)"
        newtitle, year = clean_movie_title(title)
        self.assertEqual(newtitle, "9/11")   # title cleaning function removes the special characters that break the API
        self.assertEqual(year, "2002")


if __name__ == "__main__":
    unittest.main()
