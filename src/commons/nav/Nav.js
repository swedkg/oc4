import React from 'react'
import { NavLink } from 'react-router-dom'
import Grid from 'material-ui/Grid';
import './nav.css';

const Nav = () => (
  <Grid component="nav" container={true} spacing={16}>
    <Grid item component="span">
      <NavLink to='/' exact activeClassName="active">Home</NavLink>
    </Grid>
    <Grid item component="span">
      <NavLink to='/about' activeClassName="active">About</NavLink>
    </Grid>
    <Grid item component="span">
      <NavLink to='/contact' activeClassName="active">Contact</NavLink>
    </Grid>
  </Grid>
)

export default Nav;
