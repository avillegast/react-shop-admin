import Alert from '@common/Alert';
import { useState } from 'react';

const useAlert = (options) => {
  const defaultOptions = {
    active: false,
    message: '',
    type: '',
    autoClose: true,
  };

  const [alert, setAlert] = useState({
    ...defaultOptions,
    ...options,
  });
  const toggleAlert = () => {
    setAlert(!Alert.active);
  };

  return {
    alert,
    setAlert,
    toggleAlert,
  };
};

export default useAlert;
