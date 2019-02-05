import React, { Component, Fragment } from 'react';
import './styles/App.css';
import { Footer, Header } from './components/common';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <h1 className="App-center">Hello from Social Network!</h1>
        <Footer />
      </Fragment>
    )
  }
}

export default App;
