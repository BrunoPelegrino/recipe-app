import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [, setEmailToLS] = useLocalStorage('user');
  const [, setMealTokenToLS] = useLocalStorage('mealsToken');
  const [, setDrinkTokenLS] = useLocalStorage('cocktailsToken');
  const passwordMinLength = 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailToLS({ email });
    setMealTokenToLS(1);
    setDrinkTokenLS(1);
    history.push('/foods');
  };
  return (
    <div
      className="flex
      align-center
      "
    >
      <form
        className="flex flex-col align-center justify-center space-y-4"
        onSubmit={ handleSubmit }
      >
        <input
          className="input input-bordered input-warning w-full max-w-xs"
          type="email"
          data-testid="email-input"
          value={ email }
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <input
          className="input input-bordered input-warning w-full max-w-xs"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <button
          className="btn btn-primary"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !(email.match(/\S+@\S+\.\S+/i)
            && password.length > passwordMinLength) }
        >
          Login

        </button>
      </form>
    </div>
  );
};

export default LoginForm;
