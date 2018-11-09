import React, { Component } from 'react';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import Dashboard from './components/Dashboard';
import {BrowserRouter,Route} from 'react-router-dom';

class App extends Component {
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
