import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import './AccountPage.css';
import { FavoriteBorderSharp, SentimentDissatisfiedSharp, WatchLaterSharp } from '@mui/icons-material';
import { getMovieInList as getMoviesInList, addMovieToList, deleteMovieFromList } from '../utils/api';

const Account = () => {
  const [movieLists, setMovieLists] = useState({ 0: [], 1: [], 2: [] }); // { 0: liked, 1: disliked, 2: watch later }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovieLists();
  }, []);

  const fetchMovieLists = async () => {
    const user = localStorage.getItem('UID');
    let newState = { 0: [], 1: [], 2: [] };

    try {
      for (let type of [0, 1, 2]) {
        const payload = { user, type };
        const data = await getMoviesInList(payload);
        newState[type] = data.movies || [];
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
      if (movieLists[type].find(movie => movie.id === movieId)) {
        await deleteMovieFromList(payload);
        updatedList = updatedList.filter(movie => movie.id !== movieId);
      } else {
        await addMovieToList(payload);
        updatedList.push(movieLists[type].find(movie => movie.id === movieId));
      }
      setMovieLists({ ...movieLists, [type]: updatedList });
    } catch (error) {
      console.error('Error updating movie list:', error);
    }
  };

  const renderMovieRow = (movies, rowTitle, iconType) => (
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
                <IconButton size="medium" onClick={() => handleAction(movie.id, 0)}>
                  {iconType === 'liked' ? (
                    <FavoriteBorderSharp color="primary" />
                  ) : (
                    <FavoriteBorderSharp />
                  )}
                </IconButton>
                <IconButton size="medium" onClick={() => handleAction(movie.id, 1)}>
                  {iconType === 'disliked' ? (
                    <SentimentDissatisfiedSharp color="primary" />
                  ) : (
                    <SentimentDissatisfiedSharp />
                  )}
                </IconButton>
                <IconButton size="medium" onClick={() => handleAction(movie.id, 2)}>
                  {iconType === 'watchLater' ? (
                    <WatchLaterSharp color="primary" />
                  ) : (
                    <WatchLaterSharp />
                  )}
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
      {renderMovieRow(movieLists[0], 'Liked Movies', 'liked')}
      {renderMovieRow(movieLists[2], 'Watch Later Movies', 'watchLater')}
      {renderMovieRow(movieLists[1], 'Disliked Movies', 'disliked')}
    </div>
  );
};

export default Account;
