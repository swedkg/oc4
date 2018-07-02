import React from 'react';
import ProjectsData from './ProjectsData';
import Grid from 'material-ui/Grid';
import Modal from 'material-ui/Modal';
import { Divider, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from 'material-ui/Tabs';
import './projects.css';

const styles = theme => ({
  modal: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

const customStyles = {
  projectsContainer: {
    margin: '0',
    width: 'auto',
  }
}

function getModalStyle () {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    width: '75vw',
    maxHeight: '90%',
    transform: `translate(-${top}%, -${left}%)`,
    // display: 'flex',
    // flexDirection: 'column'
    overflowY: 'auto'
  };
}

class Projects extends React.Component {

  constructor (props) {
    super(props);
    // const tabIndex = parseInt(sessionStorage.getItem('tabIndex')) || 0;
    const { currentTab } = props;
    this.state = {
      data: ProjectsData.projects,
      modalOpen: false,
      tabIndex: currentTab
    };
  }

  resize = () => this.handleSwipeableContainerHeight()

  handleSwipeableContainerHeight () {

    let windowEl = (document.compatMode === "CSS1Compat") ?
      document.documentElement :
      document.body;

    let windowHeight = windowEl.clientHeight;

    let singleProject = document.getElementsByClassName('singleProject');
    let reactSwipeableViewContainer = document.getElementsByClassName('react-swipeable-view-container');
    if (singleProject.length > 0) {
      let containerDims = reactSwipeableViewContainer[0].getBoundingClientRect();
      let arrOfHeights = [];
      [...singleProject].forEach(p => {
        arrOfHeights.push(p.offsetHeight);
      })
      let singleProjectHeight = Math.max(...arrOfHeights);

      let ph = singleProjectHeight * 2 + 150 + 'px';
      let wh = windowHeight - containerDims.top - 50 + 'px';

      // reactSwipeableViewContainer[0].style.height = (ph > wh) ? ph : wh;
      reactSwipeableViewContainer[0].style.height = wh;
      // console.warn(reactSwipeableViewContainer[0].getBoundingClientRect(), windowHeight)
    }
  }

  componentDidMount () {
    const { history } = this.props;
    const { match: { params } } = this.props;

    let project = this.checkProjectTitle(params.canonicalURL)
    if (project.length === 0) {
      history.push('/')
    } else {
      project = project[0];
      this.displayModal(project);
    }
    document.title = `${project.title}`;
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resize)
  }

  getModalImageStyle () {
    const { modalImage } = this.state;
    const imageURL = process.env.PUBLIC_URL + '/images/' + modalImage

    return {
      width: '100%',
      height: 'calc(75vw * 9 / 16 - 27px)',
      // maxHeight: '40vh',
      marginBottom: '1rem',
      backgroundImage: `url(${imageURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }
  }

  getGridItemImageStype (project) {
    const imageURL = process.env.PUBLIC_URL + '/images/' + project.image

    return {
      width: '100%',
      height: 'calc(75vw * 9 / 16 - 27px)',
      maxHeight: '40vh',
      marginBottom: '1rem',
      backgroundImage: `url(${imageURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
    }
  }

  checkProjectTitle (canonicalURL) {
    let project = [];
    const { data } = this.state;
    project = data.filter((p) => { return p.canonicalURL === canonicalURL })
    return project;
  }

  displayModal (project) {
    this.setState({
      modalTitle: project.title,
      modalDescription: project.description,
      modalImage: project.image,
      modaldateStart: project.dateStart,
      modaldateEnd: project.dateEnd,
      technologies: project.technologies,
      modalOpen: true
    })
  }

  handleOpen (e, p) {
    e.preventDefault();
    const { history } = this.props;
    const url = '/projects/' + p.canonicalURL;
    history.push(url);
  }

  handleClose (e) {
    const { history } = this.props;
    this.setState({ modalOpen: false });
    history.push('/')
  };

  handleChange = (event, value) => {
    this.setState({
      tabIndex: value,
    });
    this.props.setCurrentTab(value);
    // sessionStorage.setItem('tabIndex', value);

  };

  handleChangeIndex = tabIndex => {
    this.setState({
      tabIndex,
    });
  };

  render () {

    let data = this.state.data;
    const { classes } = this.props;
    const { tabIndex } = this.state;
    var sortedData = {}

    data.forEach(d => {
      let category = d.category;
      if (!sortedData.hasOwnProperty(category)) {
        sortedData[category] = [];
      }
      sortedData[category].push(d);
      sortedData[category].sort((a, b) => {
        return a.number - b.number;
      });
    })

    this.handleSwipeableContainerHeight();

    return (
      <div>
        <Tabs value={tabIndex}
          fullWidth
          centered
          onChange={this.handleChange}>
          <Tab disableRipple label="wep apps" />
          <Tab disableRipple label="websites" />
          <Tab disableRipple label="projects" />
        </Tabs>
        <SwipeableViews index={tabIndex} onChangeIndex={this.handleChangeIndex}>
          {
            Object.keys(sortedData).map(cat => (
              <Grid container
                spacing={40}
                justify="flex-start"
                key={cat}
                style={customStyles.projectsContainer}>
                {
                  sortedData[cat].map(p => (
                    <Grid item
                      className="project"
                      lg={6} md={6} sm={12} xs={12}
                      key={p.number}
                      onClick={(e) => this.handleOpen(e, p)} >
                      <div className="singleProject">
                        <p>{p.title}</p>
                        <div style={this.getGridItemImageStype(p)}></div>
                      </div>
                    </Grid>
                  ))
                }
              </Grid>
            ))
          }
        </SwipeableViews>
        <Modal
          open={this.state.modalOpen}
          className='modalRoot'
          onBackdropClick={(e) => this.handleClose(e)}
          onClose={(e) => this.handleClose(e)}>
          <div className={`${classes.modal} modalHolder`}
            style={getModalStyle()}>
            <Typography paragraph={true} variant={'display1'}>
              {this.state.modalTitle}
            </Typography>
            <div style={this.getModalImageStyle()}></div>
            {/* <Typography>
              Starting date: {this.state.modaldateStart}
            </Typography>
            <Typography>
              Ending date: {this.state.modaldateEnd}
            </Typography> */}
            <Typography dangerouslySetInnerHTML={{ __html: this.state.modalDescription }}>
            </Typography>
            <Typography>
              Built with {this.state.technologies}
            </Typography>
          </div>
        </Modal>
      </div>
    )
  }
}

export default withStyles(styles)(Projects);
