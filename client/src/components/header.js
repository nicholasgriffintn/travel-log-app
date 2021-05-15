import React from 'react';

import { Box, Flex, Button } from 'rebass';

import logo from './logo.svg';

import { useSelector, useDispatch } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();

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
        <Box mx="auto" />
        <Button
          className="btn btn-secondary btn-header"
          type="button"
          onClick={() => dispatch({ type: 'LOGOUT' })}
        >
          LOGOUT
        </Button>
      </Flex>
    </header>
  );
};

export default Header;
