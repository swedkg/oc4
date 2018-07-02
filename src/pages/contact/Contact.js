import React from 'react';
import ContactForm from './contactForm/ContactForm';
import { Grid, Typography } from 'material-ui';

const Contact = () => {
  document.title = 'Contact';
  return (
    <div>
      <Typography variant="headline">Contact</Typography>
      <Grid container justify={'space-between'} spacing={40}>
        <Grid item xs={12} md={3}>
          <Typography>
            Fill in this form if you want me to get back to you.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <ContactForm />
        </Grid>
      </Grid>
    </div>
  )
}

export default Contact
