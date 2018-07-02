import React from 'react';
import { Grid, Typography } from 'material-ui';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import styles from "./about.css.js";

const About = (props) => {
  document.title = 'About';
  const { classes } = props;
  return (
    <div>
      <Typography variant="headline">About me</Typography>
      <Grid container justify={'space-between'} className="about-me" spacing={40}>
        <Grid item xs={12} md={3}>
          <Typography variant="subheading" dangerouslySetInnerHTML={{ __html: '<p>I am keen on discovering new technologies and ideas, and implementing new ways to approach my way of working.</p><p>I enjoy working in a challenging environment, geared towards performance and quality</p>' }}></Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={40}>
            <Grid item xs={12} sm={2} classes={{ 'grid-xs-12': classes['grid-xs-12'] }}>
              <Typography noWrap>
                Name:
              </Typography>
            </Grid>
            <Grid item classes={{ 'typeItem': classes['item'] }}>
              <Typography xs={12} sm={10} >
                Dimitris Giannopoulos
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={40}>
            <Grid item xs={12} sm={2} classes={{ 'grid-xs-12': classes['grid-xs-12'] }}>
              <Typography noWrap>
                Email:
              </Typography>
            </Grid>
            <Grid item classes={{ 'typeItem': classes['item'] }}>
              <Typography xs={12} sm={10} className='bold'>
                desk@inlectus.com
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={40}>
            <Grid item xs={12} sm={2} classes={{ 'grid-xs-12': classes['grid-xs-12'] }}>
              <Typography noWrap>
                History:
              </Typography>
            </Grid >
            <Grid item xs={12} sm={10} classes={{ 'typeItem': classes['item'] }}>
              <Typography>
                I wan born on the 8th of September of 1974 in Kozani, Greece. In my early thirties I moved to Ireland, were I spent a couple of years in Dublin. Since 2016 I leave and work in Luxembourg.
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container spacing={40}>
            <Grid item xs={12} sm={2} classes={{ 'grid-xs-12': classes['grid-xs-12'] }}>
              <Typography noWrap>
                Education:
              </Typography>
            </Grid>
            <Grid item xs={12} sm={10} classes={{ 'typeItem': classes['item'] }}>
              <Typography >
                After graduating high school in 1992, I studied Marine Enginnering. Following that, I studied Industrial Design. Over the years I have attended various courses regarding network administration, WEB design and Material Design, computer languages such as HTML, CSS, PHP and Javascript, libraries and framweorks as Boostrap, AngularJs and React and visulalisation libraries like Highsoft Highcharts, Vega visualization, C3.js and D3.js.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div >
  )
}

export default withStyles(styles)(About);
