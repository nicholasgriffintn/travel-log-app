import React, { Component } from 'react';

import { Box, Flex, Link } from 'rebass';

import logo from './logo.svg';
import './App.css';
import HealthCheck from './components/health-check';

import AmplifyReduxAuth from './components/auth/Wrapper';

class AppInner extends Component {
  render() {
    return (
      <div className="App-wrap">
        <header className="App-header">
          <Flex px={2} color="white" bg="black" alignItems="center">
            <img src={logo} className="App-logo" alt="logo" />
            <Box mx="auto" />
            <Link variant="nav" href="https://nicholasgriffin.dev">
              Nicholas Griffin
            </Link>
          </Flex>
        </header>
        <section className="App-main">
          <AmplifyReduxAuth>
            <HealthCheck />
          </AmplifyReduxAuth>
        </section>
      </div>
    );
  }
}

export default AppInner;
