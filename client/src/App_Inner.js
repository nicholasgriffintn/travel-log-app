import React, { Component } from 'react';

import './App.css';
import BaseMap from './components/map/baseMap';
import AWSMap from './components/map/awsMap';

import Header from './components/header';
import Footer from './components/footer';

import AmplifyReduxAuth from './components/auth/Wrapper';

class AppInner extends Component {
  render() {
    return (
      <div className="App-wrap">
        <section className="App-main">
          <div className="App-MapWrap">
            <Header />
            <AmplifyReduxAuth>
              {process.env.REACT_APP_USE_AWSMAPS === true ? (
                <AWSMap />
              ) : (
                <BaseMap />
              )}
            </AmplifyReduxAuth>
            <Footer />
          </div>
        </section>
      </div>
    );
  }
}

export default AppInner;
