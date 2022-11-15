import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'


const FeaturedMovie = ({ movie }) => {
  const theme = useTheme()

    if (!movie) return null;

    // console.log('movie',movie);
    return (
        <Box component={Link} to={`/movie/${movie.id}`} sx={{marginBottom: '20px', margin: '20px', display: 'flex',justifyContent: 'center',height: '20px',textDecoration: 'none',}}>
            <Card sx={{width: '50%',display: 'flex',justifyContent: 'flex-end',flexDirection: 'column',}} classes={{ root: {position: 'relative'} }}>
                <CardMedia
                    media="picture"
                    alt={movie.title}
                    image={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                    title={movie.title}
                    sx={{position: 'absolute',top: 0,right: 0,height: '100%', width: '100%',backgroundColor: 'rgba(0,0,0,0.575)',backgroundBlendMode: 'darken',}}
                />
                <Box padding="20px">
                    <CardContent sx={{color: '#fff',width: '40%',[theme.breakpoints.down('sm')]: {width: '100%',}}} classes={{ root: {position: 'relative',backgroundColor: 'transparent',}}}>
                        <Typography variant="h5" gutterBottom>{movie.title}</Typography>
                        <Box display="flex" align="center">
                            <Rating readOnly value={movie.vote_average / 2}></Rating>
                            <Typography variant="subtitle1" gutterBottom sx={{ marginLeft: '10px' }}>{movie?.vote_average}/10 </Typography>
                        </Box>
                        <Typography variant="body2">{movie.overview}</Typography>
                    </CardContent>
                </Box>
            </Card>
        </Box>
    );
};

export default FeaturedMovie;
