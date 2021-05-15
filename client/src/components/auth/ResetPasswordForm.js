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
        <h2>Set your new password</h2>
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
            <input
              required
              id="username"
              name="username"
              label="Username"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_form_input">
            <input
              required
              id="code"
              name="code"
              label="Code"
              value={inputs.code}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_form_input">
            <input
              required
              id="new-password"
              name="newPassword"
              label="New Password"
              type="password"
              value={inputs.newPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_card_actions">
            <button className="btn btn-primary btn-full" type="submit">
              Reset
            </button>
          </div>
          <div className="auth_card_actions">
            <button
              className="btn btn-secondary btn-full"
              type="button"
              onClick={() => setAuthStatus('signIn')}
            >
              Remembered your password?
            </button>
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
