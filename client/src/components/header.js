import React from 'react';

import { Box, Flex, Link } from 'rebass';

import logo from './logo.svg';

import { useSelector } from 'react-redux';

const Header = () => {
  const currentUser = useSelector((state) => state.session.currentUser);

  return (
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
        {currentUser && currentUser.attributes && (
          <div className="App-CurrentUser">
            <span>{currentUser.attributes.email}</span>
          </div>
        )}
        {console.debug('Current User => ', currentUser)}
      </Flex>
    </header>
  );
};

export default Header;
