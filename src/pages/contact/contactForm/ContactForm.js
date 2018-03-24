import React from 'react';

class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      firstNameError: '',
      lastName: '',
      lastNameError: '',
      email: '',
      emailError: '',
      message: '',
      messageError: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.info(email, re.test(email));
    return re.test(email);
  }

  validate = () => {
    let isError = false;
    const errorMessages = {}

    this.setState({
      firstNameError: '',
      lastNameError: '',
      emailError: '',
      messageError: '',
    });

    if (this.state.firstName.length === 0) {
      errorMessages.firstNameError = 'Please fill in your first name';
      isError = true;
    }
    if (this.state.lastName.length === 0) {
      errorMessages.lastNameError = 'Please fill in your last name';
      isError = true;
    }
    if (this.state.email.length === 0) {
      errorMessages.emailError = 'Please fill in your email';
      isError = true;
    }
    
    let validEmail = this.validateEmail(this.state.email);

    if (!validEmail) {
      errorMessages.emailError = 'Please use a proper email';
      isError = true;
    }

    if (this.state.message.length === 0) {
      errorMessages.messageError = 'Please leave a message';
      isError = true;
    }

    if (isError) {
      console.info(this.state);
      this.setState({
        ...this.state,
        ...errorMessages
      });
      console.info(this.state);
    }

    return isError;

  }

  handleSubmit(event) {

    event.preventDefault();
    const err = this.validate();
    if (!err) {
      console.clear();
      console.info(this.state);
      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} noValidate>
          <label>
            Name:
          <input type="text"
              name="firstName"
              value={this.state.firstName}
              placeholder='First Name'
              onChange={this.handleInputChange} />
          </label>
          <label>
            Last Name:
          <input type="text"
              name="lastName"
              placeholder='Last Name'
              value={this.state.lastName}
              onChange={this.handleInputChange} />
          </label>
          <label>
            email:
          <input type="email"
              name="email"
              placeholder='email'
              value={this.state.email}
              onChange={this.handleInputChange} />
          </label>
          <label>
            Your message:
          <textarea name="message"
              placeholder='your message here'
              value={this.state.message}
              onChange={this.handleInputChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.firstNameError}</p>
        <p>{this.state.lastNameError}</p>
        <p>{this.state.emailError}</p>
        <p>{this.state.messageError}</p>
      </div>
    )
  }
}


export default ContactForm;
