import React, { useState, useEffect } from 'react';
import "../ErrorNotification/ErrorNotification.scss"

function ErrorNotification({ error, onClose }) {
  const [visible, setVisible] = useState(true);
  console.log([error].join().length);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(!visible);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return visible ? <div className="error-notification">Произошла ошибка: {error}</div> : null;
}

export default ErrorNotification;