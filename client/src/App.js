import React, { Component } from 'react';
import Header from './components/Header';
import LoginButton from './components/LoginButton';
import {BrowserRouter,Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LoginButton} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
