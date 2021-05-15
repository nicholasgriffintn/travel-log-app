import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { configureAmplify } from './config/cognito';

const awsAmplifyConfig = {
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,
  },
};

configureAmplify(awsAmplifyConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
