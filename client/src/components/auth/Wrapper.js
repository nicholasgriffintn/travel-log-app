import { Hub } from 'aws-amplify';
import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { bindActionCreators } from 'redux';
import {
  fetchCurrentUser,
  setAuthError,
  cleanAuthState,
} from '../../store/actions/session';
import Auth from './Auth';

const mapStateToProps = (state) => ({
  authState: state.session,
});

const mapDispatchProps = (dispatch) => ({
  authCurrentUser: bindActionCreators(fetchCurrentUser, dispatch),
  setAuthError: bindActionCreators(setAuthError, dispatch),
  cleanAuthState: bindActionCreators(cleanAuthState, dispatch),
});

const NotAuth = (logoText, AuthComponent) =>
  AuthComponent ? AuthComponent : <Auth logoText={logoText || 'Login'} />;

const AmplifyReduxAuth = ({ authState, AuthComponent, children, logoText }) => (
  <>
    {authState.loggedIn || authState.checkingAuth
      ? children
      : NotAuth(logoText, AuthComponent)}
  </>
);

export default compose(
  connect(mapStateToProps, mapDispatchProps),
  lifecycle({
    componentDidMount() {
      // Check if currently logged in by touching current user.
      this.props.authCurrentUser();

      /**
       * Hub capsule is a message bus used by AWS amplify.
       * The hub is used here to listen to the authentication events from Amplify.
       * @see https://aws-amplify.github.io/docs/js/hub
       */
      Hub.listen('auth', (capsule) => {
        switch (capsule.payload.event) {
          case 'signIn':
            this.props.authCurrentUser();
            break;
          case 'signOut':
            this.props.cleanAuthState();
            break;
          case 'signIn_failure':
            break;
          case 'configured':
            this.props.authCurrentUser();
            break;
          default:
            console.warn(`Unexpected auth event [${capsule.payload.event}].`);
        }
      });
    },
  })
)(AmplifyReduxAuth);
