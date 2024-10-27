import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Autocomplete, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';

function HomePage() {
    const [homeInfo, setHomeInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [autocompleteOptions, setAutocompleteOptions] = useState([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [recommendations, setRecommendations] = useState(null);

    useEffect(() => {
        const fetchHomeInfo = async () => {
            try {
                const response = await fetch('/testing');           // just a testing route I made in routes.py 
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setHomeInfo(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHomeInfo();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.post('/predict', { movie_list: selectedMovies });
            console.log("Recommendations data:", response.data);  // Debugging line to inspect response data
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };

    const fetchSuggestions = async (query) => {
        if (!query) return;
        setLoadingSuggestions(true);
        try {
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    query,
                    api_key: "ac43a832f0b2ad9b1fac50f785b3452d",
                    include_adult: false
                }
            });
            const suggestions = response.data.results.map(movie => ({
                label: `${movie.title} (${movie.release_date?.split('-')[0] || 'N/A'})`,
                id: movie.id,
                value: movie.title
            }));
            setAutocompleteOptions(suggestions);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        } finally {
            setLoadingSuggestions(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* <h1>{homeInfo?.message}</h1>
            <p>{homeInfo?.info}</p> */}

            <Autocomplete
                freeSolo
                options={autocompleteOptions}
                getOptionLabel={(option) => option.label}
                inputValue={searchQuery}
                onInputChange={(event, newValue) => {
                    setSearchQuery(newValue);
                    fetchSuggestions(newValue);
                }}
                onChange={(event, newValue) => {
                    if (newValue?.value) {
                        setSelectedMovies(prevMovies => [...prevMovies, newValue.value]);
                        setSearchQuery('');  // Clear search bar
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search Movies"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loadingSuggestions ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        style={{ margin: "20px 0" }}
                    />
                )}
            />

            <Button variant="contained" color="primary" onClick={handleSearch} style={{ margin: "20px 0" }}>
                Get Recommendations
            </Button>

            <div style={{ marginTop: "20px" }}>
                <h3>Selected Movies:</h3>
                <ul>
                    {selectedMovies.map((movie, index) => (
                        <li key={index}>{movie}</li>
                    ))}
                </ul>
            </div>

            {recommendations && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Recommended Movies:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {recommendations.map((movie, index) => (
                            <Card key={index} style={{ width: '250px' }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={movie.poster}  // Check if movie has poster property
                                    alt={movie.title}     // Check if movie has title property
                                />
                                <CardContent>
                                    <Typography variant="h6">{movie.title || "Title not available"}</Typography>
                                    <Typography variant="body2">Genre: {movie.genre || "Genre not available"}</Typography>
                                    <Typography variant="body2">Rating: {movie.rating || "Rating not available"}</Typography>
                                    {movie.url && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            href={movie.url}
                                            target="_blank"
                                            style={{ marginTop: '10px' }}
                                        >
                                            Watch Trailer
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
