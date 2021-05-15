import React from 'react';
import { isNil, isEmpty } from 'lodash/fp';

const Message = ({ message }) => (
  <span className="error_message">{message}</span>
);

const ErrorMessage = ({ errorMessage }) => (
  <>
    {!isNil(errorMessage) && !isEmpty(errorMessage) ? (
      <Message message={errorMessage} />
    ) : (
      <></>
    )}
  </>
);

export default ErrorMessage;
