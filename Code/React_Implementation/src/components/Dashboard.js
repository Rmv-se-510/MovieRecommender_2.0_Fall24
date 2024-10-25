// // src/components/Dashboard.js
// import React, { useState } from 'react';

// const Dashboard = () => {
//     const [movie, setMovie] = useState('');
//     const [recommendedMovies, setRecommendedMovies] = useState([]);

//     const handleMovieSelection = (e) => {
//         setMovie(e.target.value);
//     };

//     const handleGetRecommendations = () => {
//         // Replace this with real recommendation logic
//         const recommendations = [
//             'Inception',
//             'Interstellar',
//             'The Dark Knight'
//         ];
//         setRecommendedMovies(recommendations);
//     };

//     return (
//         <div>
//             <h2>Your Dashboard</h2>
//             <input
//                 type="text"
//                 placeholder="Search for a movie"
//                 value={movie}
//                 onChange={handleMovieSelection}
//             />
//             <button onClick={handleGetRecommendations}>Get Recommendations</button>

//             {recommendedMovies.length > 0 && (
//                 <div>
//                     <h3>Recommended Movies:</h3>
//                     <ul>
//                         {recommendedMovies.map((rec, index) => (
//                             <li key={index}>{rec}</li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Dashboard;


// src/Dashboard.js
import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
    const [movieInput, setMovieInput] = useState('');
    const [selectedMovie, setSelectedMovie] = useState('');
    const [recommendations, setRecommendations] = useState([]);

    // Dummy data for movie recommendations
    const movies = ['Inception', 'Interstellar', 'The Dark Knight', 'Pulp Fiction', 'The Matrix'];

    const handleSearch = (e) => {
        setMovieInput(e.target.value);
    };

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie);
        // Simulate fetching recommendations based on the selected movie
        setRecommendations([`${movie} Recommendation 1`, `${movie} Recommendation 2`, `${movie} Recommendation 3`]);
    };

    const handleGetRecommendations = () => {
        // You can call your API here if needed
        console.log('Get recommendations for:', selectedMovie);
    };

    return (
        <div className="dashboard">
            <div className="search-container">
                <input
                    type="text"
                    value={movieInput}
                    onChange={handleSearch}
                    placeholder="Search for a movie..."
                />
                <div className="movie-options">
                    {movies.filter(movie => movie.toLowerCase().includes(movieInput.toLowerCase())).map(movie => (
                        <div key={movie} className="movie-option" onClick={() => handleSelectMovie(movie)}>
                            {movie}
                        </div>
                    ))}
                </div>
                {selectedMovie && <span className="selected-movie">{selectedMovie}</span>}
            </div>
            <button onClick={handleGetRecommendations} className="get-recommendations-btn">
                Get Recommendations
            </button>
            <div className="recommendations">
                {recommendations.map((rec, index) => (
                    <img key={index} src={`movie1.jpg`} alt={rec} className="recommended-movie-image" />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
