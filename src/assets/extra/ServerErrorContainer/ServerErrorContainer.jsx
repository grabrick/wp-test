import React from 'react';
import './ServerErrorContainer.scss'
import ErrorNotification from './ErrorNotification/ErrorNotification';
import { useServerError } from '../ServerErrorProvider/ServerErrorProvider';

const ServerErrorContainer = () => {
    const { errors, removeError } = useServerError();
    
    return (
      <div className="server-error-container">
        {errors.slice(0, 1).map((error, index) => (
          <ErrorNotification key={index} error={error} onClose={() => removeError(index)} />
        ))}
      </div>
    );
  };
  
  export default ServerErrorContainer;