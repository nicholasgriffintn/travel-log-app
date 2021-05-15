import React, { Component } from 'react';

import { Box, Flex, Link } from 'rebass';

import logo from './logo.svg';
import './App.css';
import AWSMap from './components/map/awsMap';

import AmplifyReduxAuth from './components/auth/Wrapper';

class AppInner extends Component {
  render() {
    return (
      <div className="App-wrap">
        <section className="App-main">
          <div className="App-MapWrap">
            <header className="App-header">
              <Flex
                className="App-header-flex"
                px={2}
                color="white"
                bg="black"
                alignItems="center"
              >
                <img src={logo} className="App-logo" alt="logo" />
                <Box mx="auto" />
                <AmplifyReduxAuth header={true}></AmplifyReduxAuth>
                <Link variant="nav" href="https://nicholasgriffin.dev">
                  Nicholas Griffin
                </Link>
              </Flex>
            </header>
            <AmplifyReduxAuth>
              <AWSMap />
            </AmplifyReduxAuth>
          </div>
        </section>
      </div>
    );
  }
}

export default AppInner;
