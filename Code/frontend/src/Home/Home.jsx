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
                console.log(response)
                // if (!response.ok) throw new Error('Network response was not ok');
                if (!response.ok) {
                    console.log('Network response was not ok');
                    return;
                }
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
            console.log("Response", response)
            const data = response.data;
            console.log("Data", data)

            const transformedRecommendations = data.recommendations.map(title => {
                const baseKey = title;
                console.log(baseKey)

                return {
                    id: data.rating[`${baseKey}-movieId`] || undefined,
                    title: data.rating[`${baseKey}-t`] || "Title not available",
                    genre: data.rating[`${baseKey}-g`]?.join(", ") || "Genre not available",
                    poster: data.rating[`${baseKey}-p`] || "https://via.placeholder.com/250",
                    rating: data.rating[`${baseKey}-r`] || "Rating not available",
                    url: data.rating[`${baseKey}-u`] || null,
                    cast: data.rating[`${baseKey}-c`] || " ",
                    director: data.rating[`${baseKey}-d`] || " "
                };
            });

            setRecommendations(transformedRecommendations);
            setSearchQuery("");
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        }
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
        <main data-testid="home">
            {/* <h1>{homeInfo?.message}</h1>
            <p>{homeInfo?.info}</p> */}
            <div className="search-container">
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
                        <div style={{ width: '100%' }}>
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
                                style={{ margin: "10px" }}
                            />
                        </div>
                    )}
                />
            </div>

            <Button variant="contained" color="primary" onClick={handleSearch} style={{ margin: "10px" }}>
                Get Recommendations
            </Button>

            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <h3>Selected Movies:</h3>
                <ul>
                    {selectedMovies.map((movie, index) => (
                        <li key={index}>{movie}</li>
                    ))}
                </ul>
            </div>

            {recommendations && (
                // <div style={{ marginTop: "20px" }}>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <h3>Recommended Movies:</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {recommendations.map((movie, index) => (
                            <Card key={index} style={{ width: '250px' }}>
                                <CardMedia
                                    component="img"
                                    height="350"
                                    image={movie.poster || "https://via.placeholder.com/250"}  // Check if movie has poster property
                                    alt={movie.title}     // Check if movie has title property
                                />
                                <CardContent>
                                    <Typography variant="h6">{movie.title || "Title not available"}</Typography>
                                    <Typography variant="body2">Rating: {movie.rating || "N/A"}/10</Typography>
                                    <Typography variant="body2">Director: {movie.director || " "}</Typography>
                                    <Typography variant="body2">Cast: {movie.cast || " "}</Typography>
                                    <Typography variant="body2">Genres: {movie.genre || "N/A"}</Typography>
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
            )
            }
        </main >
    );
}

export default HomePage;
