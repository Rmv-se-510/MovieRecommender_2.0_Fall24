import { TextField, Button, CircularProgress, Autocomplete, Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  let navigate = useNavigate();

  const [movieInfo, setMovieInfo] = useState(null);
  const [cast, setCast] = useState([]);
  const [loadingPersonDetails, setLoadingPersonDetails] = useState(false);
  const [personDetails, setPersonDetails] = useState(null); // To store person details

  const handlePersonClick = async (name) => {
    if (!name) return;
  
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
        console.log("Person details")
        console.log(personDetails)
      } else {
        setPersonDetails(null); // Handle no results
      }
    } catch (error) {
      console.error("Error fetching person details:", error);
    } finally {
      setLoadingPersonDetails(false); // Optional: Stop loading indicator
    }
  };

  

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post("/movie_details", {
        movie_id: movieId,
      });

      const cast = await axios.post("/cast", {
        movie_id: movieId,
      });

      console.log(cast.data);
      setCast(cast.data);
      setMovieInfo(response.data);
    };
    fetchData();
  }, []);

  if (!movieInfo)
    return <div className="h-screen w-screen">{/* <Loading /> */}</div>;

  const {
    id,
    poster_path,
    title,
    overview,
    imdb_id,
    genres,
    vote_average,
    release_date,
    status,
  } = movieInfo;

  return (
    <div className="min-h-screen">
      {/* <Header /> */}
      <button onClick={() => navigate(-1)}>
        <IoIosArrowDropleftCircle className="text-red-500 h-12 w-12 hover:opacity-75 relative left-10" />
      </button>
      <div className="text-white flex justify-center items-center p-4 ">
        {movieInfo ? (
          <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-2 mt-5">
            <div className="lg:w-3/12 flex flex-col items-center">
              <img
                src={"https://image.tmdb.org/t/p/w500/" + poster_path}
                alt={title}
                className="w-48 sm:w-60 rounded-md"
              />
            </div>
            <div className="w-9/12 lg:w-6/12 flex flex-col gap-4">
              <h1 className="text-3xl font-semibold">
                {title}{" "}
                {release_date && <span>({release_date.slice(0, -6)})</span>}
              </h1>
              <p className="text-lg text-slate-400 py-2">{overview}</p>
              <Typography variant="body2">
                <strong>Cast:</strong>{" "}
                {cast.cast.split(", ").map((actor, index) => (
                  <React.Fragment key={index}>
                    <Button
                      size="small"
                      onClick={() => handlePersonClick(actor)}
                      style={{ textTransform: "none", padding: 0 }}
                    >
                      {actor}
                    </Button>
                    {index < cast.cast.split(", ").length - 1 && ", "}
                  </React.Fragment>
                ))}
              </Typography>
              <Typography variant="body2">
                <strong>Director:</strong>{" "}
                {cast.director && (
                  <Button
                    size="small"
                    onClick={() => handlePersonClick(cast.director)}
                    style={{ textTransform: "none", padding: 0 }}
                  >
                    {cast.director}
                  </Button>
                )}
              </Typography>
              <Link
                to={"https://m.imdb.com/title/" + imdb_id}
                className="flex hover:underline text-slate-400"
              >
                <img
                  src={
                    "https://m.media-amazon.com/images/G/01/imdb/images-ANDW73HA/favicon_desktop_32x32._CB1582158068_.png"
                  }
                  className="mr-2 w-7 rounded-md"
                  alt="imdb"
                />
                Go to IMDB{" "}
              </Link>
              <p className="text-slate-400">
                {genres?.map(
                  (genre, index) =>
                    genre.name + (index < genres.length - 1 ? ", " : "")
                )}
              </p>
              {vote_average !== 0 && (
                <span className="text-lg text-slate-400">
                  Ratings: {vote_average.toFixed(1)}/(10) ⭐
                </span>
              )}
              <h1 className="text-slate-400">Status: {status} </h1>
              <h1 className="text-slate-400">
                Release Date : {new Date(release_date).toDateString("En-IN")}{" "}
              </h1>
            </div>
          </div>
        ) : (
          <h1>Loading....</h1>
        )}
      </div>
  
      {personDetails && (
        <div style={{ marginTop: "20px" }}>
          <h3>Movies of: { personDetails.name}</h3>
          <br></br>
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
    </div>
  );
}  

export default MovieDetails;
