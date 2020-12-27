import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth';

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const { user } = useContext(AuthContext);

  // modify corresponding values
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // when form is submitted dont refresh
  const onSubmit = (event) => {
    event.preventDefault();
    if (user) {
      callback();
    } else {
      console.error('There is no user');
    }
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export default useForm;
