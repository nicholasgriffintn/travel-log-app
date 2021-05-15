import React from 'react';

import { Box } from 'rebass';

import { compose } from 'recompose';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SetNewPasswordForm from './SetNewPasswordForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

const mapStateToProps = (state) => ({
  authState: state.session,
});

const Auth = ({ logoText, authState }) => (
  <Box
    className="auth_box"
    sx={{
      maxWidth: 512,
      mx: 'auto',
      px: 3,
    }}
  >
    {authState.authStatus === 'signIn' ? (
      <LoginForm logoText={logoText} />
    ) : (
      <></>
    )}
    {authState.authStatus === 'requireNewPassword' ? (
      <SetNewPasswordForm />
    ) : (
      <></>
    )}
    {authState.authStatus === 'forgotPassword' ? <ForgotPasswordForm /> : <></>}
    {authState.authStatus === 'resetPassword' ? <ResetPasswordForm /> : <></>}
  </Box>
);

export default compose(connect(mapStateToProps, null))(Auth);
