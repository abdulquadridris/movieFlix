import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles'


function Movie({movie, i}) {
  const theme = useTheme()
  
  return (
    <Grid item xs={6} sm={6} md={4} lg={3} xl={2} sx={{padding: '10px'}}>
        <Grow in key={i} timeout={(i + 1) * 500}>
            <Link 
              style={{alignItems: 'center', fontWeight: 'bolder', textDecoration: 'none', [theme.breakpoints.up('xs')]: {display: 'flex', flexDirection: 'column',}, '&:hover':{ cursor: 'pointer',},}} 
              to={`/movie/${movie.id}`}>
                {/* {movie.poster_path
                    ? <img alt={movie.title} sx={{borderRadius: '20px', height: '300px',marginBottom: '10px','&:hover':{transform: 'scale(1.05)',},}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                    : <img alt={movie.title} sx={{borderRadius: '20px', height: '300px',marginBottom: '10px','&:hover':{transform: 'scale(1.05)',},}} src="https://fillmurray.com/200/300" />
                } */}
                <img 
                  alt={movie.title} 
                  style={{borderRadius: '20px', height: '200px', marginBottom: '10px', '&:hover':{transform: 'scale(1.05)', },}} 
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://fillmurray.com/200/300"} 
                />
                <Typography sx={{color: theme.palette.text.primary, textOverflow: 'ellipsis', width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', marginTop: '10px',marginBottom: 0, textAlign: 'center',}} 
                  variant="h6">{movie.title}
                </Typography>
                <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
                    <div>
                        <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
                    </div>
                </Tooltip>
            </Link>
        </Grow>
    </Grid>
  )
}

export default Movie