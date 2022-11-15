import React from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Movie from './Movie';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const theme = useTheme()
  const startFrom = excludeFirst ? 1 : 0;

    return (
        <Grid container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', overflow: 'auto', [theme.breakpoints.down('sm')]: {justifyContent: 'center'}}}>
            {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}
        </Grid>
    );
};

export default MovieList;