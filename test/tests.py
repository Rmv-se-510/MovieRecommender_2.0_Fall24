import unittest
import warnings
import sys
import os

# sys.path.append("../")
# from Code.prediction_scripts.item_based import recommendForNewUser

sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), "../Code/recommenderapp/"))
)

from movierecommender.prediction_scripts.item_based import recommendForNewUser

warnings.filterwarnings("ignore")


class Tests(unittest.TestCase):

    def testMultipleMovies1(self):
        ts = [
            {"title": "Harry Potter and the Goblet of Fire (2005)", "rating": 5.0},
            {"title": "Twilight Saga: New Moon, The (2009)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Twilight (2008)" in recommendations))

    def testMultipleMovies2(self):
        ts = [
            {"title": "Man of Steel (2013)", "rating": 5.0},
            {"title": "Krull (1983)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Starcrash (1978)" in recommendations))

    def testMultipleMovies3(self):
        ts = [
            {
                "title": "Aqua Teen Hunger Force Colon Movie Film for Theaters (2007)",
                "rating": 5.0,
            },
            {"title": "Marvel One-Shot: Agent Carter (2013)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Spider-Man 3 (2007)" in recommendations))

    def testMultipleMovies4(self):
        ts = [
            {
                "title": "Aqua Teen Hunger Force Colon Movie Film for Theaters (2007)",
                "rating": 5.0,
            },
            {"title": "Marvel One-Shot: Agent Carter (2013)", "rating": 5.0},
            {"title": "Madagascar: Escape 2 Africa (2008)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Antz (1998)" in recommendations))

    def testMultipleMovies5(self):
        ts = [
            {"title": "Ratchet & Clank (2016)", "rating": 5.0},
            {"title": "The Lego Movie (2014)", "rating": 5.0},
            {"title": "Green Lantern: First Flight (2009)", "rating": 5.0},
            {
                "title": "Sword Art Online The Movie: Ordinal Scale (2017)",
                "rating": 5.0,
            },
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Moana (2016)" in recommendations))

    def testMultipleMovies6(self):
        ts = [
            {"title": "The Twelve Tasks of Asterix (1976)", "rating": 5.0},
            {"title": "TMNT (2007)", "rating": 5.0},
            {"title": "Robots (2005)", "rating": 5.0},
            {"title": "Super Mario Bros. (1993)", "rating": 5.0},
            {"title": "Chicken Little (2005)", "rating": 5.0},
            {"title": "Final Fantasy VII: Advent Children (2004)", "rating": 5.0},
            {"title": "Justice League: The New Frontier (2008)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Home (2015)" in recommendations))

    def testHome(self):
        ts = [
            {"title": "Home (2015)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("TMNT (2007)" in recommendations))

    def testMTR(self):
        ts = [
            {"title": "Meet the Robinsons (2007)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Chicken Little (2005)" in recommendations))

    def testSJ(self):
        ts = [
            {"title": "Space Jam (1996)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Transformers: The Movie (1986)" in recommendations))

    def testRaC(self):
        ts = [
            {"title": "Ratchet & Clank (2016)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("The Incredibles (2004)" in recommendations))

    def testPage(self):
        ts = [
            {"title": "The Pagemaster (1994)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Dragon Ball Z: Bojack Unbound (1993)" in recommendations))

    def testIO(self):
        ts = [
            {"title": "Inside Out (2015)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Minions (2015)" in recommendations))

    def testMG(self):
        ts = [
            {"title": "Mind Game (2004)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Futurama: Bender's Game (2008)" in recommendations))

    def testToyStory(self):
        ts = [
            {"title": "Toy Story (1995)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue("Toy Story 3 (2010)" in recommendations)

    def testKunfuPanda(self):
        ts = [
            {"title": "Kung Fu Panda (2008)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue("Toy Story (1995)" in recommendations)

    def testHorrorWithCartoon(self):
        ts = [
            {"title": "Strangers, The (2008)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Toy Story (1995)" in recommendations) == False)

    def testIronMan(self):
        ts = [
            {"title": "Iron Man (2008)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Avengers: Infinity War - Part I (2018)" in recommendations))

    def testRoboCop(self):
        ts = [
            {"title": "RoboCop (1987)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("RoboCop 2 (1990)" in recommendations))

    def testNolan(self):
        ts = [
            {"title": "Inception (2010)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Jack Reacher: Never Go Back (2016)" in recommendations))

    def testDC(self):
        ts = [
            {"title": "Man of Steel (2013)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(
            ("Batman v Superman: Dawn of Justice (2016)" in recommendations)
        )

    def testArmageddon(self):
        ts = [
            {"title": "Armageddon (1998)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("2012 (2009)" in recommendations))

    def testLethalWeapon(self):
        ts = [
            {"title": "Lethal Weapon (1987)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Lethal Weapon 3 (1992)" in recommendations))

    def testDarkAction(self):
        ts = [
            {"title": "Batman: The Killing Joke (2016)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Punisher: War Zone (2008)" in recommendations))

    def testDark(self):
        ts = [
            {"title": "Puppet Master (1989)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Black Mirror: White Christmas (2014)" in recommendations))

    def testHorrorComedy(self):
        ts = [
            {"title": "Scary Movie (2000)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("I Sell the Dead (2008)" in recommendations))

    def testSuperHeroes(self):
        ts = [
            {"title": "Spider-Man (2002)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Iron Man 2 (2010)" in recommendations))

    def testCartoon(self):
        ts = [
            {"title": "Moana (2016)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Monsters, Inc. (2001)" in recommendations))

    def testInception(self):
        ts = [
            {"title": "Inception (2010)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('Watchmen (2009)' in recommendations))

    def testDunkirk(self):
        ts = [
            {"title": "Dunkirk (2017)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('The Hurt Locker (2008)' in recommendations))

    def testInterstellar(self):
        ts = [
            {"title": "Interstellar (2014)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('Star Trek Into Darkness (2013)' in recommendations))

    def testStarTrek(self):
        ts = [
            {"title": "Star Trek Into Darkness (2013)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('After Earth (2013)' in recommendations))

    def testAvengers(self):
        ts = [
            {"title": "The Avengers (2012)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(("Ender's Game (2013)" in recommendations))

    def testMatrix(self):
        ts = [
            {"title": "The Matrix Revolutions (2003)", "rating": 5.0},
            {"title": "The Matrix Reloaded (2003)", "rating": 4.0}
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('G.I. Joe: Retaliation (2013)' in recommendations))

    def testMatrix2(self):
        ts = [
            {"title": "The Matrix Revolutions (2003)", "rating": 3.0},
            {"title": "The Matrix Reloaded (2003)", "rating": 4.0}
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('Licence to Kill (1989)' in recommendations))

    def testMatrix3(self):
        ts = [
            {"title": "The Matrix Revolutions (2003)", "rating": 5.0},
            {"title": "The Matrix Reloaded (2003)", "rating": 4.0}
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('Iron Man 3 (2013)' in recommendations))



    def testMultiple(self):
        ts = [
            {"title": "Star Trek Into Darkness (2013)", "rating": 5.0},
            {"title": "After Earth (2013)", "rating": 5.0},
        ]
        recommendations = recommendForNewUser(ts)
        self.assertTrue(('Tron: Legacy (2010)' in recommendations))


if __name__ == "__main__":
    unittest.main()
