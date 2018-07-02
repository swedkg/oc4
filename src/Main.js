import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/projects/:canonicalURL' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
      <Redirect to='/' />
    </Switch>
  </main>
)

export default Main;
