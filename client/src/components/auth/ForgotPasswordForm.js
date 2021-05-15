import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthStatus, forgotPassword } from '../../store/actions/session';
import ErrorMessage from './ErrorMessage';

import { Heading, Button } from 'rebass';
import { Label, Input } from '@rebass/forms';

const mapStateToProps = (state) => ({
  error: state.session.error,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthStatus: bindActionCreators(setAuthStatus, dispatch),
  forgotPassword: bindActionCreators(forgotPassword, dispatch),
});

const ForgotPasswordForm = ({
  classes,
  forgotPassword,
  error,
  inputs,
  handleInputChange,
  setAuthStatus,
}) => (
  <div className="auth_main">
    <div className="auth_card">
      <div className="auth_title">
        <Heading fontSize={[6]} color="primary">
          Forgot your password?
        </Heading>
        <p>Fill in the form below to request a password reset</p>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className="auth_form"
        onSubmit={(e) => {
          e.preventDefault();
          forgotPassword(inputs.username);
        }}
      >
        <div className="auth_form_wrap">
          <div className="auth_form_input">
            <Label htmlFor="username">Username</Label>
            <Input
              required
              id="username"
              name="username"
              label="Username"
              placeholder="Enter your email address, username or phone number"
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_card_actions">
            <Button className="btn btn-primary btn-full" type="submit">
              Confirm
            </Button>
          </div>
          <div className="auth_card_actions">
            <Button
              className="btn btn-secondary btn-full"
              onClick={() => setAuthStatus('signIn')}
            >
              Remembered your password?
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      inputs: {
        username: '',
      },
    },
    {
      handleInputChange:
        ({ inputs }) =>
        (e) => ({
          inputs: {
            ...inputs,
            [e.target.name]: e.target.value,
          },
        }),
    }
  )
)(ForgotPasswordForm);
