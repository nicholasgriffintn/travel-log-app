import React from 'react';

import { Flex, Link } from 'rebass';

const Footer = () => {
  return (
    <footer className="App-footer">
      <Flex
        className="App-footer-flex"
        px={2}
        color="white"
        bg="black"
        alignItems="center"
      >
        <span>App by: </span>
        <Link variant="nav" href="https://nicholasgriffin.dev">
          Nicholas Griffin
        </Link>
      </Flex>
    </footer>
  );
};

export default Footer;
