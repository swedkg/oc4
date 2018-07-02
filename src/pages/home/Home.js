import React from 'react';
import Projects from './projects/Projects';
import { Route } from "react-router-dom";
import { Grid, Typography } from 'material-ui';

class Home extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentTab: 0
    }
    this.setCurrentTab = this.setCurrentTab.bind(this);
  }

  setCurrentTab (index) {
    this.setState({
      currentTab: index
    })
  }

  render () {
    document.title = 'Home';
    const { currentTab } = this.state;

    return (
      <div>
        <Typography variant="headline">Dimitris Giannopoulos</Typography>
        <Grid container justify={'space-between'} spacing={40}>
          <Grid item xs={12} md={3}>
            <Typography variant="subheading" dangerouslySetInnerHTML={{ __html: '<p>I have working experience in various Web Development Technologies and a background in customer services and support.</p><p>In my most recent position, I\'m involved in a project that will deliver a solution provide solutions for the navigation in the data collections, consultation of data and metadata, filtering on data dimensions and the visualisation of data (charts, maps), the capacity to compare indicators and tp be able to download data in full or to query the API for filtered dimensions.</p><p>I\'m working mainly with HTML/HTML5, Twitter Bootstrap, CSS3, SASS, LESS, JavaScript, jQuery, AngularJS, Highsoft Highcharts, Vega visualization, C3.js and D3.js.</p>' }}></Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Route exact path="/" render={(props) => (
              <Projects {...props} currentTab={currentTab} setCurrentTab={this.setCurrentTab} />
            )} />
            <Route exact path="/projects/:canonicalURL" render={(props) => (
              <Projects {...props} currentTab={currentTab} setCurrentTab={this.setCurrentTab} />
            )} />

          </Grid>
        </Grid>
      </div>
    )
  }

}

export default Home;