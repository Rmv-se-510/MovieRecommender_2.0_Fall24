import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import './AccountPage.css';
import { FavoriteBorderSharp, SentimentDissatisfiedSharp, WatchLaterSharp } from '@mui/icons-material';
import { getMovieInList, addMovieToList, deleteMovieFromList } from '../utils/api';

const Account = () => {
  const [movieLists, setMovieLists] = useState({ 0: [], 1: [], 2: [] }); // { 0: liked, 1: disliked, 2: watch later }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieLists();
  }, []);

  const fetchMovieLists = async () => {
    const user = localStorage.getItem('UID');
    const newState = { 0: [], 1: [], 2: [] };

    try {
      for (let type of [0, 1, 2]) {
        const payload = { user, type };
        const data = await getMovieInList(payload);
        if (data && Array.isArray(data)) {
          newState[type] = data;
        }
      }
      setMovieLists(newState);
    } catch (error) {
      console.error('Error fetching movie lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (movieId, type) => {
    const user = localStorage.getItem('UID');
    const payload = { user, movieId, type };
    let updatedList = [...movieLists[type]];

    try {
      if (updatedList.some(movie => movie.id === movieId)) {
        await deleteMovieFromList(payload);
        updatedList = updatedList.filter(movie => movie.id !== movieId);
      } else {
        await addMovieToList(payload);
        updatedList.push({ id: movieId }); // Add a new movie placeholder with id
      }
      setMovieLists(prevState => ({ ...prevState, [type]: updatedList }));
    } catch (error) {
      console.error('Error updating movie list:', error);
    }
  };

  const renderMovieRow = (movies, rowTitle, type) => (
    <div className="movie-row">
      <h2>{rowTitle}</h2>
      <div className="movie-list">
        {movies.map((movie, index) => (
          <Card key={index} style={{ width: '250px', margin: '10px' }}>
            <CardMedia
              component="img"
              height="350px"
              image={movie.poster || 'https://via.placeholder.com/250'}
              alt={movie.title || 'Movie Poster'}
            />
            <CardContent>
              <Typography variant="h6">{movie.title || 'Title not available'}</Typography>
              <Typography variant="body2">Rating: {movie.rating || 'N/A'}/10</Typography>
              <div className="actionButtons">
                <IconButton
                  size="medium"
                  onClick={() => handleAction(movie.id, 0)}
                  color={type === 0 ? 'primary' : 'default'}
                >
                  <FavoriteBorderSharp />
                </IconButton>
                <IconButton
                  size="medium"
                  onClick={() => handleAction(movie.id, 1)}
                  color={type === 1 ? 'primary' : 'default'}
                >
                  <SentimentDissatisfiedSharp />
                </IconButton>
                <IconButton
                  size="medium"
                  onClick={() => handleAction(movie.id, 2)}
                  color={type === 2 ? 'primary' : 'default'}
                >
                  <WatchLaterSharp />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-container">
      <h1>Your Movie Lists</h1>
      {renderMovieRow(movieLists[0], 'Liked Movies', 0)}
      {renderMovieRow(movieLists[2], 'Watch Later Movies', 2)}
      {renderMovieRow(movieLists[1], 'Disliked Movies', 1)}
    </div>
  );
};

export default Account;
