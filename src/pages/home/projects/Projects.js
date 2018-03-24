import React from 'react';
import ProjectsData from './ProjectsData';
import Grid from 'material-ui/Grid';


class Projects extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ProjectsData.projects,
      index: 0,
    };
  }

  handleClick(e, number) {
    // e.preventDefault();
    this.setState({ index: number - 1 })
    console.log(number);
  }

  render() {

    let data = this.state.data;
    let index = this.state.index;
    return (
      <Grid container justify='space-around' className="projects-container">
          {
            data.map(p => (
            <Grid item className="project" xs={3} key={p.number}
                onClick={(e) => this.handleClick(e, p.number)} >
                <p>{p.name}</p>
                <div> {p.description}
                </div>
            </Grid>
            ))
          }
          {/* <p>I just clicked on {this.state.data[index].name}</p> */}
        </Grid>
    )
  }
}

export default Projects;
