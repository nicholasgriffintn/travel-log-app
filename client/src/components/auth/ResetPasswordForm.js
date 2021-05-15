import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAuthStatus, resetPassword } from '../../store/actions/session';
import ErrorMessage from './ErrorMessage';

const mapStateToProps = (state) => ({
  error: state.session.error,
});

const mapDispatchToProps = (dispatch) => ({
  setAuthStatus: bindActionCreators(setAuthStatus, dispatch),
  resetPassword: bindActionCreators(resetPassword, dispatch),
});

const ResetPasswordForm = ({
  setAuthStatus,
  error,
  inputs,
  handleInputChange,
  resetPassword,
}) => (
  <div className="auth_main">
    <div className="auth_card">
      <div className="auth_title">
        <Heading fontSize={[6]} color="primary">
          Reset your password
        </Heading>
        <p>Fill in the form below to reset your password</p>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className="auth_form"
        onSubmit={(e) => {
          e.preventDefault();
          resetPassword(inputs.username, inputs.code, inputs.newPassword);
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
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_form_input">
            <Label htmlFor="codde">Reset Code</Label>
            <input
              required
              id="code"
              name="code"
              label="Code"
              placeholder="Enter the code that we sent to your email"
              value={inputs.code}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_form_input">
            <Label htmlFor="newPassword">New Password</Label>
            <input
              required
              id="new-password"
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              value={inputs.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_card_actions">
            <Button className="btn btn-primary btn-full" type="submit">
              Reset
            </Button>
          </div>
          <div className="auth_card_actions">
            <Button
              className="btn btn-secondary btn-full"
              type="button"
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
        code: '',
        newPassword: '',
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
)(ResetPasswordForm);
