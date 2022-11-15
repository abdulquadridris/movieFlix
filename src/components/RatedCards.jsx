import React from 'react';
import { Typography, Box } from '@mui/material';
import Movie from './Movie';


function RatedCards({title, data }) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" sx={{}}>
          {data?.results.map((movie, i) => (
              <Movie key={movie.id} movie={movie} i={i} />
          ))}
      </Box>
    </Box>
)
}

export default RatedCards

// searchContainer: {
//   [theme.breakpoints.down('sm')]: {
//       display: 'flex',
//       justifyContent: 'center',
//       width: '100%',
//   },
// },
// searchInput: {
//   color: theme.palette.mode === 'light' && 'black',
//   filter: theme.palette.mode === 'light' && 'invert(1)',
//   [theme.breakpoints.down('sm')]: {
//       marginTop: '-10px',
//       marginBottom: '10px',
//   },
// },