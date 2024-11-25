import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Autocomplete, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import './Home.css';
import { FavoriteBorderSharp, SentimentDissatisfiedSharp, WatchLaterSharp } from '@mui/icons-material';
import { addMovieToList, deleteMovieFromList, getMovieInList as getMoviesInList } from '../utils/api';

function HomePage() {
  const [homeInfo, setHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [movieLists, setMovieLists] = useState({ 0: new Set(), 1: new Set(), 2: new Set() })
  const [loadingPersonDetails, setLoadingPersonDetails] = useState(false);
  const [personDetails, setPersonDetails] = useState(null); // To store person details

  useEffect(() => {
    fetchHomeInfo();
    getMovieLists();
  }, []);
 

  const fetchHomeInfo = async () => {
    try {
      const response = await fetch('/testing');           // just a testing route I made in routes.py
      console.log(response)
      // if (!response.ok) throw new Error('Network response was not ok');
      if (!response.ok) {
        console.log(':( Network response was not ok');
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

  const getMovieLists = async () => {
    const user = localStorage.getItem("UID");
    let newState = { ...movieLists };
    //console.log(newState)
    for (const type in movieLists) {
      const payload = { user, type };
      const data = await getMoviesInList(payload);
      //console.log(data)
      const movies = data["movies"];
      //console.log(movieIds)
      // movieIds.forEach(id => newState[type].add(id));
      newState[type].add(movies)
    }
    // console.log("Here bro")
    // console.log(newState)
    setMovieLists(newState);
  };
  

  const handleSearch = async () => {
    try {
      let selectedMovieIds = selectedMovies.map(movie=>movie.id);
      const response = await axios.post("/predict", {
        movie_list: selectedMovieIds,
      });
      console.log("Response", response);
      const data = response.data;
      console.log("Data", data);

      const transformedRecommendations = data.recommendations.map((title) => {
        const baseKey = title;
        console.log(baseKey);

        return {
          id: baseKey.id,
          imdb_id: baseKey.imdb_id,
          title: baseKey.title,
          poster_path: baseKey.poster_path,
          genres: baseKey.genres
          // id: data.rating[`${baseKey}-i`] || undefined,
          // title: data.rating[`${baseKey}-t`] || "Title not available",
          // genre:
          //   data.rating[`${baseKey}-g`]?.join(", ") || "Genre not available",
          // poster:
          //   data.rating[`${baseKey}-p`] || "https://via.placeholder.com/250",
          // rating: data.rating[`${baseKey}-r`] || "Rating not available",
          // url: data.rating[`${baseKey}-u`] || null,
          // cast: data.rating[`${baseKey}-c`] || " ",
          // director: data.rating[`${baseKey}-d`] || " ",
        };
      });
      console.log(transformedRecommendations)

      setRecommendations(transformedRecommendations);
      setSearchQuery("");
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };


  const actionButtonHandler = async (movie, type) => {
    const user = localStorage.getItem("UID");
  
    const payload = {
      user,
      movieId: movie.id,
      type,
      details: {
        title: movie.title,
        poster: movie.poster,
        cast: movie.cast,
        director: movie.director,
        genre: movie.genre,
        rating: movie.rating,
      },
    };
  
    let resp;
    let newState = { ...movieLists };
    console.log("action handler")
    console.log(movieLists)

    if (Array.from(movieLists[type]).some(m => m.id === movie.id)) {
      console.log("del")
      resp = await deleteMovieFromList(payload);
      const updatedSet = new Set(movieLists[type]);
      updatedSet.delete(movie.id);
      newState[type] = updatedSet;
    } else {
      resp = await addMovieToList(payload);
      if (resp) {
        console.log("add")
        const updatedSet = new Set(movieLists[type]);
        updatedSet.add(movie.id);
        newState[type] = updatedSet;
      }
    }
  
    setMovieLists(newState);
  };
  
  

  const fetchSuggestions = async (query) => {
    if (!query) return;
    setLoadingSuggestions(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            query,
            api_key: "ac43a832f0b2ad9b1fac50f785b3452d",
            include_adult: false,
          },
        }
      );
      const suggestions = response.data.results.map((movie) => ({
        label: `${movie.title} (${movie.release_date?.split("-")[0] || "N/A"})`,
        id: movie.id,
        value: movie.title,
      }));
      setAutocompleteOptions(suggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handlePersonClick = async (name) => {
    if (!name) return;
  
    setRecommendations(null); // Clear recommendations
    setSelectedMovies([]);
    setLoadingPersonDetails(true);

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/person",
        {
          params: {
            query: name,
            api_key: "ac43a832f0b2ad9b1fac50f785b3452d",
            include_adult: false,
            language: "en-US",
            page: 1,
          },
        }
      );
  
      if (response.data.results && response.data.results.length > 0) {
        const person = response.data.results[0]; // Get the first result
        const personDetails = {
          name: person.name,
          knownFor: person.known_for.map((work) => ({
            title: work.title || work.original_title || "N/A",
            mediaType: work.media_type,
            releaseDate: work.release_date || "N/A",
            overview: work.overview || "No description available",
            posterPath: work.poster_path
              ? `https://image.tmdb.org/t/p/w500${work.poster_path}`
              : "https://via.placeholder.com/500",
            voteAverage: work.vote_average || "N/A",
          })),
        };
        setPersonDetails(personDetails); // Store details for rendering
      } else {
        setPersonDetails(null); // Handle no results
      }
    } catch (error) {
      console.error("Error fetching person details:", error);
    } finally {
      setLoadingPersonDetails(false); // Optional: Stop loading indicator
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main data-testid="home">
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
              setSelectedMovies(prevMovies => [...prevMovies, newValue]);
              setSearchQuery(""); // Clear search bar
            }
          }}
          renderInput={(params) => (
            <div style={{ width: "100%" }}>
              <TextField
                {...params}
                label="Search Movies"
                variant="outlined"
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loadingSuggestions ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {loadingSuggestions ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
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

      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ margin: "10px" }}
      >
        Get Recommendations
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={ ()=> {
          setRecommendations(null);
          setSelectedMovies([]);
        }}
        style={{ margin: "10px" }}
      >
        Reset Search
      </Button>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      {recommendations && <h3>Recommendation based on Selected Movies:</h3>}
        {/* <ul> */}
          {selectedMovies.map((movie) => (
            <li key={movie.id}>{movie.value}</li>
          ))}
        {/* </ul> */}
      </div>

      {recommendations && (
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <h3>Recommended Movies:</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {recommendations.map((movie, index) => (
              <Card key={index} style={{ width: '250px' }}>
                <CardMedia
                  component="img"
                  height="350px"
                  image={ `https://image.tmdb.org/t/p/original/${movie.poster_path}` || "https://via.placeholder.com/250"}  // Check if movie has poster property
                  alt={movie.title}     // Check if movie has title property
                />
                <CardContent>
                  {/* <div className='actionButtons'>
                    {<IconButton size='medium' onClick={async () => await actionButtonHandler(movie, 0)}>
                      {Array.from(movieLists[0]).some(m => m.id === movie.id) ? (<FavoriteBorderSharp color='primary' />) : (<FavoriteBorderSharp />)}
                    </IconButton>}
                    {<IconButton size='medium' onClick={async () => await actionButtonHandler(movie, 1)}>
                      {Array.from(movieLists[1]).some(m => m.id === movie.id) ? (<SentimentDissatisfiedSharp color='primary' />) : (<SentimentDissatisfiedSharp />)}
                    </IconButton>}
                    {<IconButton size='medium' onClick={async () => await actionButtonHandler(movie, 2)}>
                      {Array.from(movieLists[2]).some(m => m.id === movie.id) ? (<WatchLaterSharp color='primary' />) : (<WatchLaterSharp />)}
                    </IconButton>}
                  </div> */}
                  <Typography variant="h6">{movie.title || "Title not available"}</Typography>
                  {/* <Typography variant="body2">Rating: {movie.rating || "N/A"}/10</Typography> */}
                  <Typography variant="body2">
                    <strong>Director:</strong>{" "}
                    {movie.director && (
                      <Button
                        size="small"
                        onClick={() => handlePersonClick(movie.director)}
                        style={{ textTransform: "none", padding: 0 }}
                      >
                        {movie.director}
                      </Button>
                    )}
                  </Typography>
                  {/* <Typography variant="body2">
                    <strong>Cast:</strong>{" "}
                    {movie.cast.split(", ").map((actor, index) => (
                      <React.Fragment key={index}>
                        <Button
                          size="small"
                          onClick={() => handlePersonClick(actor)}
                          style={{ textTransform: "none", padding: 0 }}
                        >
                          {actor}
                        </Button>
                        {index < movie.cast.split(", ").length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </Typography> */}
                  {/* <Typography variant="body2">Genres: {movie.genres || "N/A"}</Typography> */}
                  {movie.url && (
                    <Button
                      variant="contained"
                      color="secondary"
                      href={movie.url}
                      target="_blank"
                      style={{ marginTop: "10px", marginRight: "10px" }}
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

      {personDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>{personDetails.name}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {personDetails.knownFor.map((work, index) => (
              <Card key={index} style={{ width: "250px" }}>
                <CardMedia
                  component="img"
                  height="350px"
                  image={work.posterPath}
                  alt={work.title}
                />
                <CardContent>
                  <Typography variant="h6">{work.title}</Typography>
                  <Typography variant="body2">
                    <strong>Type:</strong> {work.mediaType}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Release Date:</strong> {work.releaseDate}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rating:</strong> {work.voteAverage}/10
                  </Typography>
                  <Typography variant="body2">{work.overview}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

    </main>
  );
}

export default HomePage;
