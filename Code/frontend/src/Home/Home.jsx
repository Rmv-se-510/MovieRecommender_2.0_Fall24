// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   CircularProgress,
//   Autocomplete,
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormControl,
// } from "@mui/material";
// import axios from "axios";

// function HomePage() {
//   const [homeInfo, setHomeInfo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [autocompleteOptions, setAutocompleteOptions] = useState([]);
//   const [loadingSuggestions, setLoadingSuggestions] = useState(false);
//   const [selectedMovies, setSelectedMovies] = useState([]);
//   const [recommendations, setRecommendations] = useState(null);
//   const [movieFeedback, setMovieFeedback] = useState({});
//   const [savedMovies, setSavedMovies] = useState({}); // New state for tracking saved movies

//   useEffect(() => {
//     const fetchHomeInfo = async () => {
//       try {
//         const response = await fetch("/testing");
//         if (!response.ok) {
//           console.log("Network response was not ok");
//           return;
//         }
//         const data = await response.json();
//         setHomeInfo(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHomeInfo();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.post("/predict", {
//         movie_list: selectedMovies,
//       });
//       console.log("Response", response);
//       const data = response.data;
//       console.log("Data", data);

//       const transformedRecommendations = data.recommendations.map((title) => {
//         const baseKey = title;
//         console.log(baseKey);

//         return {
//           title: data.rating[`${baseKey}-t`] || "Title not available",
//           genre:
//             data.rating[`${baseKey}-g`]?.join(", ") || "Genre not available",
//           poster:
//             data.rating[`${baseKey}-p`] || "https://via.placeholder.com/250",
//           rating: data.rating[`${baseKey}-r`] || "Rating not available",
//           url: data.rating[`${baseKey}-u`] || null,
//           cast: data.rating[`${baseKey}-c`] || " ",
//           director: data.rating[`${baseKey}-d`] || " ",
//         };
//       });

//       setRecommendations(transformedRecommendations);
//       const initialFeedback = {};
//       transformedRecommendations.forEach((movie, index) => {
//         initialFeedback[index] = "";
//       });
//       setMovieFeedback(initialFeedback);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//     }
//   };

//   const handleFeedbackChange = (movieIndex, value) => {
//     setMovieFeedback((prev) => ({
//       ...prev,
//       [movieIndex]: value,
//     }));
//   };

//   // New function to handle saving movies
//   const handleSaveMovie = (movieIndex) => {
//     setSavedMovies((prev) => ({
//       ...prev,
//       [movieIndex]: !prev[movieIndex],
//     }));
//   };

//   const fetchSuggestions = async (query) => {
//     if (!query) return;
//     setLoadingSuggestions(true);
//     try {
//       const response = await axios.get(
//         "https://api.themoviedb.org/3/search/movie",
//         {
//           params: {
//             query,
//             api_key: "ac43a832f0b2ad9b1fac50f785b3452d",
//             include_adult: false,
//           },
//         }
//       );
//       const suggestions = response.data.results.map((movie) => ({
//         label: `${movie.title} (${movie.release_date?.split("-")[0] || "N/A"})`,
//         id: movie.id,
//         value: movie.title,
//       }));
//       setAutocompleteOptions(suggestions);
//     } catch (error) {
//       console.error("Error fetching suggestions:", error);
//     } finally {
//       setLoadingSuggestions(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="App">
//       <main>
//         <div className="search-container">
//           <Autocomplete
//             freeSolo
//             options={autocompleteOptions}
//             getOptionLabel={(option) => option.label}
//             inputValue={searchQuery}
//             onInputChange={(event, newValue) => {
//               setSearchQuery(newValue);
//               fetchSuggestions(newValue);
//             }}
//             onChange={(event, newValue) => {
//               if (newValue?.value) {
//                 setSelectedMovies((prevMovies) => [
//                   ...prevMovies,
//                   newValue.value,
//                 ]);
//                 setSearchQuery("");
//               }
//             }}
//             renderInput={(params) => (
//               <div style={{ width: "100%" }}>
//                 <TextField
//                   {...params}
//                   label="Search Movies"
//                   variant="outlined"
//                   fullWidth
//                   InputProps={{
//                     ...params.InputProps,
//                     endAdornment: (
//                       <>
//                         {loadingSuggestions ? (
//                           <CircularProgress color="inherit" size={20} />
//                         ) : null}
//                         {params.InputProps.endAdornment}
//                       </>
//                     ),
//                   }}
//                   style={{ margin: "10px" }}
//                 />
//               </div>
//             )}
//           />
//         </div>

//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSearch}
//           style={{ margin: "10px" }}
//         >
//           Get Recommendations
//         </Button>

//         <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//           <h3>Selected Movies:</h3>
//           <ul>
//             {selectedMovies.map((movie, index) => (
//               <li key={index}>{movie}</li>
//             ))}
//           </ul>
//         </div>

//         {recommendations && (
//           <div style={{ marginTop: "20px", marginBottom: "20px" }}>
//             <h3>Recommended Movies:</h3>
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//               {recommendations.map((movie, index) => (
//                 <Card key={index} style={{ width: "250px" }}>
//                   <CardMedia
//                     component="img"
//                     height="350"
//                     image={movie.poster || "https://via.placeholder.com/250"}
//                     alt={movie.title}
//                   />
//                   <CardContent>
//                     <Typography variant="h6">
//                       {movie.title || "Title not available"}
//                     </Typography>
//                     <Typography variant="body2">
//                       Rating: {movie.rating || "N/A"}/10
//                     </Typography>
//                     <Typography variant="body2">
//                       Director: {movie.director || " "}
//                     </Typography>
//                     <Typography variant="body2">
//                       Cast: {movie.cast || " "}
//                     </Typography>
//                     <Typography variant="body2">
//                       Genres: {movie.genre || "N/A"}
//                     </Typography>
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "10px",
//                         marginTop: "10px",
//                       }}
//                     >
//                       {movie.url && (
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           href={movie.url}
//                           target="_blank"
//                         >
//                           Watch Trailer
//                         </Button>
//                       )}
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         onClick={() => handleSaveMovie(index)}
//                       >
//                         {savedMovies[index] ? "Saved" : "Save"}
//                       </Button>
//                     </div>
//                     <FormControl
//                       component="fieldset"
//                       style={{ marginTop: "10px" }}
//                     >
//                       <RadioGroup
//                         row
//                         value={movieFeedback[index] || ""}
//                         onChange={(e) =>
//                           handleFeedbackChange(index, e.target.value)
//                         }
//                       >
//                         <FormControlLabel
//                           value="like"
//                           control={<Radio />}
//                           label="Like"
//                         />
//                         <FormControlLabel
//                           value="dislike"
//                           control={<Radio />}
//                           label="Dislike"
//                         />
//                       </RadioGroup>
//                     </FormControl>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Autocomplete,
  Card,
  CardContent,
  CardMedia,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import axios from "axios";

function HomePage() {
  const [homeInfo, setHomeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [movieFeedback, setMovieFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("movieFeedback");
    return savedFeedback ? JSON.parse(savedFeedback) : {};
  });
  const [savedMovies, setSavedMovies] = useState(() => {
    const savedMoviesData = localStorage.getItem("savedMovies");
    return savedMoviesData ? JSON.parse(savedMoviesData) : {};
  });

  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        const response = await fetch("/testing");
        if (!response.ok) {
          console.log("Network response was not ok");
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
    if (selectedMovies.length === 0) {
      console.log("No movies selected");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/predict", {
        movie_list: selectedMovies,
      });
      const data = response.data;
      console.log("Received data:", data);

      if (data && data.recommendations) {
        const transformedRecommendations = data.recommendations.map((title) => {
          const baseKey = title;
          return {
            title: data.rating[`${baseKey}-t`] || "Title not available",
            genre:
              data.rating[`${baseKey}-g`]?.join(", ") || "Genre not available",
            poster:
              data.rating[`${baseKey}-p`] || "https://via.placeholder.com/250",
            rating: data.rating[`${baseKey}-r`] || "Rating not available",
            url: data.rating[`${baseKey}-u`] || null,
            cast: data.rating[`${baseKey}-c`] || " ",
            director: data.rating[`${baseKey}-d`] || " ",
          };
        });
        console.log("Transformed recommendations:", transformedRecommendations);
        setRecommendations(transformedRecommendations);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackChange = (movieIndex, value, movieData) => {
    const movieKey = `${movieData.title}-${movieIndex}`;
    const updatedFeedback = {
      ...movieFeedback,
      [movieKey]: {
        value,
        movieInfo: movieData,
      },
    };
    setMovieFeedback(updatedFeedback);
    localStorage.setItem("movieFeedback", JSON.stringify(updatedFeedback));
  };

  const handleSaveMovie = (movieIndex, movieData) => {
    const movieKey = `${movieData.title}-${movieIndex}`;
    const updatedSavedMovies = {
      ...savedMovies,
      [movieKey]: {
        isSaved: !savedMovies[movieKey]?.isSaved,
        movieInfo: movieData,
      },
    };
    setSavedMovies(updatedSavedMovies);
    localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <main>
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
                setSelectedMovies((prevMovies) => [
                  ...prevMovies,
                  newValue.value,
                ]);
                setSearchQuery("");
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
          disabled={selectedMovies.length === 0}
        >
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

        {recommendations && recommendations.length > 0 && (
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            <h3>Recommended Movies:</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {recommendations.map((movie, index) => {
                const movieKey = `${movie.title}-${index}`;
                return (
                  <Card key={movieKey} style={{ width: "250px" }}>
                    <CardMedia
                      component="img"
                      height="350"
                      image={movie.poster || "https://via.placeholder.com/250"}
                      alt={movie.title}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {movie.title || "Title not available"}
                      </Typography>
                      <Typography variant="body2">
                        Rating: {movie.rating || "N/A"}/10
                      </Typography>
                      <Typography variant="body2">
                        Director: {movie.director || " "}
                      </Typography>
                      <Typography variant="body2">
                        Cast: {movie.cast || " "}
                      </Typography>
                      <Typography variant="body2">
                        Genres: {movie.genre || "N/A"}
                      </Typography>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        {movie.url && (
                          <Button
                            variant="contained"
                            color="secondary"
                            href={movie.url}
                            target="_blank"
                          >
                            Watch Trailer
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleSaveMovie(index, movie)}
                        >
                          {savedMovies[movieKey]?.isSaved ? "Saved" : "Save"}
                        </Button>
                      </div>
                      <FormControl
                        component="fieldset"
                        style={{ marginTop: "10px" }}
                      >
                        <RadioGroup
                          row
                          value={movieFeedback[movieKey]?.value || ""}
                          onChange={(e) =>
                            handleFeedbackChange(index, e.target.value, movie)
                          }
                        >
                          <FormControlLabel
                            value="like"
                            control={<Radio />}
                            label="Like"
                          />
                          <FormControlLabel
                            value="dislike"
                            control={<Radio />}
                            label="Dislike"
                          />
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default HomePage;