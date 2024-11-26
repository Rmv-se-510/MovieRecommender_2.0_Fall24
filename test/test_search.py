import unittest
import warnings
import sys
import os

sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "../Code/recommenderapp/"))
)

# Code\recommenderapp\movierecommender\search.py
from movierecommender.search import Search

warnings.filterwarnings("ignore")


class Tests(unittest.TestCase):

    def testSearchFurious(self):
        search_word = "Furiou"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Furious 7 (2015)",
            "The Fast and the Furious (2001)",
            "The 2 Fast 2 Furious (Fast and the Furious 2 (2003)",
            "The Fast and the Furious: Tokyo Drift (2006)",
            "Kung Fu Panda: Secrets of the Furious Five (2008)",
            "The Fast & Furious (Fast and the Furious 4 (2009)",
            "The Fast Five (Fast and the Furious 5 (2011)",
            "The Fast & Furious 6 (Fast and the Furious 6 (2013)",
            "The Fate of the Furious (2017)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchCity(self):
        search_word = "city"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "City Hall (1996)",
            "City Slickers II: The Legend of Curly's Gold (1994)",
            "City of Angels (1998)",
            "City Lights (1931)",
            "City Slickers (1991)",
            "City by the Sea (2002)",
            "City of God (2002)",
            "City Heat (1984)",
            "City Hunter (1993)",
            "City of Men (2007)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchHighr(self):
        search_word = "highr"  # Instead of Higher
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchToy(self):
        search_word = "toy"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Toy Story (1995)",
            "Toys (1992)",
            "Toy Story 2 (1999)",
            "Toy Soldiers (1991)",
            "Toy Story 3 (2010)",
            "Babes in Toyland (1961)",
            "Babes in Toyland (1934)",
            "The Toy (1982)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchPerc(self):
        search_word = "percy"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Percy Jackson & the Olympians: The Lightning Thief (2010)",
            "Percy Jackson: Sea of Monsters (2013)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchSC1(self):
        search_word = "@"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchLove(self):
        search_word = "love"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Love & Human Remains (1993)",
            "Love Affair (1994)",
            "Love and a .45 (1994)",
            "Love in the Afternoon (1957)",
            "Love Jones (1997)",
            "Love and Other Catastrophes (1996)",
            "Love Serenade (1996)",
            "Love and Death on Long Island (1997)",
            "Love Is the Devil (1998)",
            "Love Is a Many-Splendored Thing (1955)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchStory(self):
        search_word = "story"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Storytelling (2001)",
            "Story of Women (1988)",
            "Toy Story (1995)",
            "The NeverEnding Story III (1994)",
            "Pyromaniac's Love Story, A (1995)",
            "The Philadelphia Story (1940)",
            "Entertaining Angels: The Dorothy Day Story (1996)",
            "The Line King: The Al Hirschfeld Story (1996)",
            "FairyTale: A True Story (1997)",
            "West Side Story (1961)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchNY(self):
        search_word = "New Yor"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "New York Cop (1993)",
            "New York Stories (1989)",
            "New York, New York (1977)",
            "New York, I Love You (2009)",
            "Escape from New York (1981)",
            "King of New York (1990)",
            "Home Alone 2: Lost in New York (1992)",
            "All the Vermeers in New York (1990)",
            "King in New York, A (1957)",
            "Autumn in New York (2000)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchMonsta(self):
        search_word = "monsta"  # Instead of monster
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchGibberish(self):
        search_word = "gibberish"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchMonster(self):
        search_word = "Monste"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Monsters, Inc. (2001)",
            "Monster's Ball (2001)",
            "Monster (2003)",
            "Monster in a Box (1992)",
            "Monster-in-Law (2005)",
            "Monster House (2006)",
            "Monsters vs. Aliens (2009)",
            "Monsters (2010)",
            "Monsters University (2013)",
            "Gods and Monsters (1998)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchMachine(self):
        search_word = "machine"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "The Time Machine (1960)",
            "Dr. Goldfoot and the Bikini Machine (1965)",
            "Mean Machine (2001)",
            "The Time Machine (2002)",
            "Terminator 3: Rise of the Machines (2003)",
            "Those Magnificent Men in Their Flying Machines (1965)",
            "The Machine Girl (2008)",
            "Hot Tub Time Machine (2010)",
            "All Watched Over by Machines of Loving Grace (2011)",
            "Hot Tub Time Machine 2 (2015)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

if __name__ == "__main__":
    unittest.main()
