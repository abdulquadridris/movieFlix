import React, { useEffect, useState } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, useMediaQuery } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams, userParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../services/TMDB';
import genreIcons from '../assets/genres';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';
import MovieList from './MovieList';
import { userSelector } from '../features/auth';

function MovieInformation() {
  const { id } = useParams();
  const theme = useTheme()
  
  const { user } = useSelector(userSelector);
  const { data, isFetching, error } = useGetMovieQuery(id);
  console.log(data)
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  },[favoriteMovies, data])
  
  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id))
  },[watchlistMovies, data])

  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prev) => !prev);
  }

  if (isFetching || isRecommendationsFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong! - Go back to Home</Link>
      </Box>
    );
  }


  return (
    <Grid container sx={{display: 'flex',justifyContent: 'space-around',margin: '10px 0 !important',[theme.breakpoints.down('sm')]: {flexDirection: 'column',flexWrap: 'wrap',alignItems: 'center' },}}>
      <Grid item sm={12} lg={4} style={{ display: 'flex', marginBottom: '30px', justifyContent: 'center', alignItems: 'center', }}>
        <img
          style={{borderRadius: '20px', boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',width: '80%',[theme.breakpoints.between('lg','xl')]: { margin: '0 auto',width: '85%', height: '70%', }, [theme.breakpoints.down('md')]: {margin: '0 auto',width: '50%',},[theme.breakpoints.down('sm')]: {margin: '0 auto',width: '100%',height: '350px',marginBottom: '30px',},}}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>{data?.title} ({data.release_date.split('-')[0]})</Typography>
        <Typography variant="h5" align="center" gutterBottom>{data?.tagline}</Typography>
        <Grid container sx={{display: 'flex',justifyContent: 'space-around',margin: '10px 0 !important',[theme.breakpoints.down('sm')]: {flexDirection: 'column',flexWrap: 'wrap', },}}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2}></Rating>
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average}/10 </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>{data?.runtime} min | Language: {data?.spoken_languages[0].name}</Typography>
        </Grid>
        <Grid item sx={{margin: '10px 0 !important',display: 'flex',justifyContent: 'space-around', flexWrap: 'wrap'}}>
          {data?.genres?.map((genre, i) => (
            <Link key={genre.name} style={{display: 'flex',justifyContent: 'center',alignItems: 'center',textDecoration: 'none',[theme.breakpoints.down('sm')]: {padding: '0.5rem 1rem',},}} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <img src={genreIcons[genre.name.toLowerCase()]} style={{ filter: theme.palette.mode === 'dark' && 'invert(1)',marginRight: '10px',}} height={30} />
              <Typography color="textPrimary" variant="subtitle1">{genre?.name}</Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && (
              <Grid key={i} item xs={4} md={2} component={Link} to={`/actor/${character.id}`} style={{ textDecoration: 'none' }}>
                <img style={{width: '100%',maxWidth: '7em',height: '8em', objectFit: 'cover',borderRadius: '10px',}} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
                <Typography color="textPrimary">{character.name}</Typography>
                <Typography color="textSecondary">{character.character.split('/')[0]}</Typography>
              </Grid>
            )
          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div style={{display: 'flex',justifyContent:'space-between',width:'100%',[theme.breakpoints.down('sm')]: {flexDirection: 'column', flexWrap: 'wrap',}}}>
            <Grid item xs={12} sm={12} sx={{display: 'flex',justifyContent:'space-between',width:'100%',[theme.breakpoints.down('sm')]: {flexDirection: 'column',flexWrap: 'wrap',},}}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            
          </div>
          <Grid item xs={12} sm={12} sx={{display: 'flex',justifyContent:'space-between',width:'100%',[theme.breakpoints.down('sm')]: {flexDirection: 'column',flexWrap: 'wrap'},}}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />} >{isMovieFavorited ? 'Unfavorite' : 'Favorite'}</Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />} >{isMovieWatchlisted ? 'Remove' : 'Watchlist'}</Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography component={Link} to="/" color="inherit" variant="subtitle2" style={{ textDecoration: 'none' }}>Back</Typography>
                </Button>
              </ButtonGroup>
            </Grid>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" align="center" gutterBottom>You might also like</Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing is found.</Box>
        }
      </Box>
      {/* {console.log(data.videos.results[0].key)} */}
      <Modal
        closeAfterTransition
        sx={{display: 'flex',alignItems: 'center',justifyContent:'center',}}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            style={{width: '50%',height: '50%',[theme.breakpoints.down('sm')]: {width: '90%',height: '90%' },}}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  )
}

export default MovieInformation

