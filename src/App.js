import React from 'react';
import Header from './commons/header/Header';
import Main from './Main';
import Nav from './commons/nav/Nav';
import './App.css';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';

const App = () => (
  <CssBaseline>
    <Grid container className="container">
      <Grid item xs={12}>
        {/* <Header /> */}
        <Nav />
        <Main />
      </Grid>
    </Grid>
  </CssBaseline>
)

export default App;
