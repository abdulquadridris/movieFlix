import React, { useState, useEffect } from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Grid,  Box } from '@mui/material';

import MovieInformation from './MovieInformation';
import Movies from './Movies';
import NavBar from './NavBar';
import Profile from './Profile';
import Actors from './Actors';

function App () {

  return (
      <Box sx={{display: 'flex', height: '100%'}}>
        <Router>
          <CssBaseline />
          <NavBar />
          <Box sx={{flexGrow: 1, p: '2rem', width: '100%' }}>
            <Box sx={{height: '70px'}}>
              <Routes>
                <Route path='/' exact element={<Movies />} />
                <Route path='/movies/:id' exact element={<Movies />} />
                <Route path='/actor/:id' exact element={<Actors />} />
                <Route path='/profile/:id' exact element={<Profile />} />
              </Routes>
            </Box>
          </Box>
        </Router>
        
      </Box>
  );

}

  
export default App;