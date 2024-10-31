import unittest
import warnings
import sys
import os

# sys.path.append("../")
# from Code.recommenderapp.search import Search

sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "../Code/recommenderapp/"))
)

from movierecommender.search import Search

warnings.filterwarnings("ignore")


class Tests(unittest.TestCase):

    # Words
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

    # Misspelled Words
    def testSearchGibberish(self):
        search_word = "gibberish"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchMoster(self):
        search_word = "moster"  # Instead of monster
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchFastr(self):
        search_word = "fastr"  # Instead of faster
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchMonsta(self):
        search_word = "monsta"  # Instead of monster
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchHighr(self):
        search_word = "highr"  # Instead of Higher
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    # Numbers
    def testSearch1995(self):
        search_word = "1995"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Toy Story (1995)",
            "Jumanji (1995)",
            "Grumpier Old Men (1995)",
            "Waiting to Exhale (1995)",
            "Father of the Bride Part II (1995)",
            "Heat (1995)",
            "Sabrina (1995)",
            "Tom and Huck (1995)",
            "Sudden Death (1995)",
            "GoldenEye (1995)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearch2000(self):
        search_word = "2000"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Blues Brothers 2000 (1998)",
            "The Yards (2000)",
            "Fantasia 2000 (1999)",
            "Next Friday (2000)",
            "Supernova (2000)",
            "Down to You (2000)",
            "Scream 3 (2000)",
            "The Boondock Saints (2000)",
            "Gun Shy (2000)",
            "The Beach (2000)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearch2002(self):
        search_word = "2002"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Big Trouble (2002)",
            "Orange County (2002)",
            "Impostor (2002)",
            "Kung Pow: Enter the Fist (2002)",
            "Snow Dogs (2002)",
            "The Count of Monte Cristo (2002)",
            "The Mothman Prophecies (2002)",
            "Walk to Remember, A (2002)",
            "Slackers (2002)",
            "Big Fat Liar (2002)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearch1945(self):
        search_word = "1945"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Spellbound (1945)",
            "The Three Caballeros (1945)",
            "The Body Snatcher (1945)",
            "The Lost Weekend (1945)",
            "Mildred Pierce (1945)",
            "Anchors Aweigh (1945)",
            "The Spiral Staircase (1945)",
            "Detour (1945)",
            "I Know Where I'm Going! (1945)",
            "And Then There Were None (1945)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    # Partial Matches
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

    def testSearchApple(self):
        search_word = "Appl"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Appleseed (2004)",
            "Applesauce (2015)",
            "The Apple Dumpling Gang (1975)",
            "The Apple Dumpling Gang Rides Again (1979)",
            "The Apple (1998)",
            "Meet the Applegates (1991)",
            "Adam's Apples (2005)",
            "Pineapple Express (2008)",
            "You Are the Apple of My Eye (2011)",
            "Bungo Stray Dogs: Dead Apple (2018)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

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

    def testSearchBeach(self):
        search_word = "Beac"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Beach Blanket Bingo (1965)",
            "Beaches (1988)",
            "Bhaji on the Beach (1993)",
            "Blood Beach (1981)",
            "Police Academy 5: Assignment: Miami Beach (1988)",
            "Brighton Beach Memoirs (1986)",
            "The Palm Beach Story (1942)",
            "The Beach (2000)",
            "On the Beach (1959)",
            "Psycho Beach Party (2000)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    # Case Sensitive
    def testSearchBeach(self):
        search_word1 = "hello"
        search_word2 = "HELLO"
        search = Search()
        filtered_dict1 = search.resultsTop10(search_word1)
        filtered_dict2 = search.resultsTop10(search_word2)
        self.assertTrue(filtered_dict1 == filtered_dict2)

    def testSearchBeach(self):
        search_word1 = "toy"
        search_word2 = "TOY"
        search = Search()
        filtered_dict1 = search.resultsTop10(search_word1)
        filtered_dict2 = search.resultsTop10(search_word2)
        self.assertTrue(filtered_dict1 == filtered_dict2)

    def testSearchBeach(self):
        search_word1 = "new york"
        search_word2 = "NEW YORK"
        search = Search()
        filtered_dict1 = search.resultsTop10(search_word1)
        filtered_dict2 = search.resultsTop10(search_word2)
        self.assertTrue(filtered_dict1 == filtered_dict2)

    def testSearchBeach(self):
        search_word1 = "cinema"
        search_word2 = "CINEMA"
        search = Search()
        filtered_dict1 = search.resultsTop10(search_word1)
        filtered_dict2 = search.resultsTop10(search_word2)
        self.assertTrue(filtered_dict1 == filtered_dict2)

    def testSearchBeach(self):
        search_word1 = "match"
        search_word2 = "MATCH"
        search = Search()
        filtered_dict1 = search.resultsTop10(search_word1)
        filtered_dict2 = search.resultsTop10(search_word2)
        self.assertTrue(filtered_dict1 == filtered_dict2)

    # Special Character
    def testSearchSC1(self):
        search_word = "@"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchSC2(self):
        search_word = "#"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Love Potion #9 (1992)",
            "What the #$*! Do We Know!? (2004)",
            "Mesrine: Public Enemy #1 (2008)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchSC3(self):
        search_word = "&"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "Love & Human Remains (1993)",
            "Dumb & Dumber (1994)",
            "Tom & Viv (1994)",
            "Nelly & Monsieur Arnaud (1995)",
            "The Truth About Cats & Dogs (1996)",
            "Oliver & Company (1988)",
            "Wallace & Gromit: The Best of Aardman Animation (1996)",
            "Wallace & Gromit: A Close Shave (1995)",
            "Secrets & Lies (1996)",
            "Willy Wonka & the Chocolate Factory (1971)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchSC4(self):
        search_word = "%"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = []
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchSC5(self):
        search_word = "$"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [
            "The Secret of My Succe$s (1987)",
            "What the #$*! Do We Know!? (2004)",
        ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchInc(self):
        search_word = "Inc"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [ 'Incognito (1997)', 'Incident at Loch Ness (2004)', 'Inconvenient Truth, An (2006)', 'Inception (2010)', 'Incendies (2010)', 'Incredibles 2 (2018)', 'The Boys of St. Vincent (1992)', 'Little Princess, A (1995)', 'The Swan Princess (1994)', 'Fatal Instinct (1993)' ]
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchBat(self):
        search_word = "bat"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = [ 'Batman Forever (1995)', 'Batman (1989)', 'Batman Returns (1992)', 'Batman & Robin (1997)', 'Battle for the Planet of the Apes (1973)', 'Bats (1999)', 'Batman: Mask of the Phantasm (1993)', 'Battlefield Earth (2000)', 'Battleship Potemkin (1925)', 'Battle Beyond the Stars (1980)']
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchDun(self):
        search_word = "dun"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = ['Dunston Checks In (1996)', 'Dune (1984)', 'Dungeons & Dragons (2000)', 'Dune (2000)', 'Dunkirk (2017)', 'Kundun (1997)', 'Crocodile Dundee (1986)', 'Crocodile Dundee II (1988)', 'Woman in the Dunes (1964)', 'Crocodile Dundee in Los Angeles (2001)']
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchSoc(self):
        search_word = "social"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = ['Buena Vista Social Club (1999)', 'The Social Network (2010)', 'Anti-Social (2015)']
        self.assertTrue(filtered_dict == expected_resp)

    def testSearchPerc(self):
        search_word = "percy"
        search = Search()
        filtered_dict = search.resultsTop10(search_word)
        expected_resp = ['Percy Jackson & the Olympians: The Lightning Thief (2010)', 'Percy Jackson: Sea of Monsters (2013)']
        self.assertTrue(filtered_dict == expected_resp)

if __name__ == "__main__":
    unittest.main()
