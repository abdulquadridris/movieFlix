import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresQuery } from '../services/TMDB';
import genreIcons from '../assets/genres/index';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function Sidebar({setmobileOpen}) {
  const {genreIdOrCategoryName} = useSelector((state) => state.currentGenreOrCategory)
  const theme = useTheme()
  const dispatch = useDispatch()
  const { data, error, isFetching } = useGetGenresQuery()
  console.log(data)
  console.log(genreIdOrCategoryName)
  return (
    <>
      <Link to='/' style={{display: 'flex', justifyContent: 'center', padding: '10% 0',}} >
        <img alt='Movieflix logo' style={{width: '70%',}} src={theme.palette.mode === 'light' ? redLogo : blueLogo} />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} style={{color: theme.palette.text.primary, textDecoration: 'none',}} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <ListItemIcon>
                <img src={genreIcons[label.toLowerCase()]} style={{filter: theme.palette.mode === 'dark' && 'invert(1)',}} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
          
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link key={name} style={{color: theme.palette.text.primary, textDecoration: 'none',}} to="/">
            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
              <ListItemIcon>
                <img src={genreIcons[name.toLowerCase()]} style={{filter: theme.palette.mode === 'dark' && 'invert(1)',}} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
        </List>
        
    </>
  )
}

export default Sidebar