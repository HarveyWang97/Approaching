import React, { Component } from 'react';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';

import { faFileAlt, faClock, faMapMarkerAlt, faListUl, faPen, faTrashAlt, faTimes, faCalendarAlt, faSave, faEnvelope, faBell, faSignOutAlt, faUserCircle, faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faFileAlt, faClock, faMapMarkerAlt, faListUl, faPen, faTrashAlt, faTimes, faCalendarAlt, faSave, faEnvelope, faBell, faSignOutAlt, faUserCircle, faUser);

/**
 * @classdesc The base component for our application, it contains two pages: 
 * login page and dashboard page.
 */
class App extends Component {
  /**
   * Render the whole application.
   * @return {html} Return html block for the whole application.
   */
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LoginButton} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
