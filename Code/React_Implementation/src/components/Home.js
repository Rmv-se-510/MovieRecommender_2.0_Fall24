// // src/components/Home.js
// import React from 'react';
// import './Home.css'

// const Home = () => {
//     return (
//         <div>
//             <h2>Welcome to NextMovie!</h2>
//             <p>Find the best movie recommendations based on your preferences.</p>
//             {/* Add more about the website here */}
//         </div>
//     );
// };

// export default Home;



import React from 'react';
import './Home.css';

const Home = ({ openLogin, openSignUp }) => {
    return (
        <div className="home-container">
            <section className="hero">
                <div className="hero-content">
                    <h1>Discover Movies Based on Your Taste</h1>
                    <p>Let NextMovie recommend the best films for you. Get personalized suggestions based on your preferences, ratings, and viewing habits.</p>
                    <button className="get-started-btn" onClick={openSignUp}>Get Started</button>
                </div>
                <div className="hero-images">
                    <img src="movie1.jpg" alt="Movie Poster 1" />
                    <img src="movie2.jpg" alt="Movie Poster 2" />
                    <img src="movie3.jpeg" alt="Movie Poster 3" />
                </div>
            </section>

            <section id="about" className="about-section">
                <h2>About Us</h2>
                <p>NextMovie uses advanced recommendation algorithms to help you find your next favorite movie. Our system adapts to your taste and provides curated suggestions tailored to your preferences. So grab that popcorn while we show you your NextMovie!!!</p>
            </section>

            {/* <section id="contact" className="contact-section">
                <h2>Contact Us</h2>
                <p>Have any questions? Reach out to us at support@nextmovie.com</p>
            </section> */}
        </div>
    );
};

export default Home;