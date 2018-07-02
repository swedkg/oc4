import React from 'react';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import './ContactForm.css';
import { Grid } from 'material-ui';
import Snackbar from 'material-ui/Snackbar';

class ContactForm extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      unValidatedInputs: ['firstName', 'lastName', 'email', 'message'],
      sendDisabled: true,
      snackbarOpen: false
    };

    this.initialState = Object.assign({}, this.state);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handleInputChange (event) {
    const target = event.target;
    const input = target.name;
    const value = target.value;
    this.setState({
      [input]: value
    }, () => {
      this.validate(input);
    });
  }

  setStateUnvalidatedInputs (unValidatedInputs) {
    let sendDisabled = (unValidatedInputs.length === 0) ? false : true;
    this.setState({
      unValidatedInputs: unValidatedInputs,
      sendDisabled: sendDisabled
    }, () => {
    });
  }

  addToUnValidatedInputs (input) {
    let unValidatedInputs = this.state.unValidatedInputs;
    var idx = this.state.unValidatedInputs.indexOf(input);
    if (idx === -1) unValidatedInputs.push(input);
    this.setStateUnvalidatedInputs(unValidatedInputs);
  }

  removeFromUnValidatedInputs (input) {
    let unValidatedInputs = this.state.unValidatedInputs.filter((item) => {
      return item !== input;
    });
    this.setStateUnvalidatedInputs(unValidatedInputs);
  }

  validateEmailAddress (email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validateEmailInput (input) {
    var validEmail = this.validateEmailAddress(this.state.email);
    let status = input + 'ErrorStatus';
    let error = input + 'Error';

    if (validEmail) {
      this.setState({
        [status]: false,
        [error]: ' ',
      });
      this.removeFromUnValidatedInputs(input);
    } else {
      this.setState({
        [error]: 'Please use a proper email',
        [status]: true
      });
      this.addToUnValidatedInputs(input);
    }
  }

  validate (input) {
    if (typeof input === 'undefined') return null;
    let status = input + 'ErrorStatus';
    let error = input + 'Error';
    var value = this.state[input];

    if (input === 'email') {
      this.validateEmailInput(input);
      return null;
    }

    if ((!value || /^\s*$/.test(value)) && input !== 'email') {
      this.setState({
        [status]: true,
        [error]: 'Please fill in this field'
      });
      this.addToUnValidatedInputs(input);
    } else {
      this.setState({
        [status]: false,
        [error]: ' ',
      });
      this.removeFromUnValidatedInputs(input);
    }
  }

  onBlur (event) {
    const target = event.target;
    const input = target.name;
    this.validate(input);
  }

  handleSubmit (event) {
    event.preventDefault();
    let initialState = this.initialState;

    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;
    const message = this.state.message;

    let user_name = firstName + ' ' + lastName;

    // const user_id = process.env.REACT_APP_USER_ID;
    // user_id: user_id,

    const emailData = {
      service_id: 'contact_service',
      template_id: 'contact_form',
      template_params: {
        'user_name': user_name,
        'user_email': email,
        'text': message
      }
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://lit-brook-43242.herokuapp.com/endpoint", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");


    xhr.send(JSON.stringify(emailData));

    xhr.onload = function () {
      if (xhr.readyState < 4)
        console.info("Waiting for response from server...");
      else if (xhr.readyState === 4) {
        if (xhr.status == 200 && xhr.status < 300) {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Thank you for your message.'
          }, this.setState({
            ...initialState
          }));
          console.info(xhr.responseText);
        } else {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: 'Something went wrong.'
          });
        }
      }
    }.bind(this)

  }

  handleCloseSnackbar = () => {
    this.setState({ snackbarOpen: false });
  };

  render () {
    return (
      <Grid container justify={'center'} className="form-container" >
        <Grid item xs={12} className="form">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-element" onBlur={this.onBlur}>
              <FormControl error={this.state.firstNameErrorStatus} required fullWidth>
                <InputLabel htmlFor="firstName">First name</InputLabel>
                <Input name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange} />
                <FormHelperText id="name-helper-text">{this.state.firstNameError}</FormHelperText>
              </FormControl>
            </div>
            <div className="form-element" onBlur={this.onBlur}>
              <FormControl error={this.state.lastNameErrorStatus} required fullWidth>
                <InputLabel htmlFor="lastName">Last name</InputLabel>
                <Input name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange} />
                <FormHelperText id="name-helper-text">{this.state.lastNameError}</FormHelperText>
              </FormControl>
            </div>
            <div className="form-element" onBlur={this.onBlur}>
              <FormControl error={this.state.emailErrorStatus} required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input name="email"
                  value={this.state.email}
                  type={'email'}
                  onChange={this.handleInputChange} />
                <FormHelperText id="name-helper-text">{this.state.emailError}</FormHelperText>
              </FormControl>
            </div>
            <div className="form-element" onBlur={this.onBlur}>
              <FormControl error={this.state.messageErrorStatus} required fullWidth>
                <InputLabel htmlFor="message">Your message</InputLabel>
                <Input name="message"
                  rowsMax={4}
                  multiline={true}
                  value={this.state.message}
                  onChange={this.handleInputChange} />
                <FormHelperText id="name-helper-text">{this.state.messageError}</FormHelperText>
              </FormControl>
            </div>
          </form>
          <Button variant="raised"
            className="send-button"
            onClick={this.handleSubmit}
            disabled={this.state.sendDisabled}
            color="primary">
            Send
            <Icon className="icon">send</Icon>
          </Button>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          className={'snackbar'}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.handleCloseSnackbar}
          contentprops={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackbarMessage}</span>}
        />
      </Grid>
    )
  }
}

export default ContactForm;
