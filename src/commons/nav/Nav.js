import React from 'react'
import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid';

const Nav = () => (
  <Grid component="nav" container={true} spacing={16}>
    <Grid item component="span"><Link to='/'>Home</Link></Grid>
    <Grid item component="span"><Link to='/about'>about</Link></Grid>
    <Grid item component="span"><Link to='/contact'>contact</Link></Grid>
  </Grid>
)

export default Nav;
