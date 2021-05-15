import React from 'react';
import { connect } from 'react-redux';
import { compose, withStateHandlers } from 'recompose';
import { setNewPassword } from '../../store/actions/session';
import { bindActionCreators } from 'redux';
import ErrorMessage from './ErrorMessage';

const SetNewPasswordForm = ({
  setNewPassword,
  handleInputChange,
  inputs,
  error,
}) => (
  <div className="auth_main">
    <div className="auth_card">
      <div className="auth_title">
        <Heading fontSize={[6]} color="primary">
          Set your password
        </Heading>
        <p>Complete your account</p>
      </div>
      <ErrorMessage errorMessage={error} />
      <form
        className="auth_form"
        onSubmit={(e) => {
          e.preventDefault();
          setNewPassword(inputs.password);
        }}
      >
        <div className="auth_form_wrap">
          <div className="auth_form_input">
            <Label htmlFor="password">Password</Label>
            <input
              required
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your new password"
              value={inputs.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth_card_actions">
            <Button className="btn btn-primary btn-full" type="submit">
              Change Password
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  error: state.session.error,
});

const mapDispatchToProps = (dispatch) => ({
  setNewPassword: bindActionCreators(setNewPassword, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    {
      inputs: {
        password: '',
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
)(SetNewPasswordForm);
