import React from 'react'
import { Typography, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import './header.css';
import styles from "./header.css.js";

function Header (props) {
  const { classes } = props;
  return (
    <Button
      component={Link}
      to='/'
      disableRipple={true}
      disableFocusRipple={true}
      classes={{
        root: classes.button
      }}>
      <header>
        <Typography variant="caption" classes={{ caption: classes.header }}>
          dg.inlectus.com
    </Typography>
      </header>
    </Button>
  )
}

export default withStyles(styles)(Header);