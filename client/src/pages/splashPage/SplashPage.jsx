import React, { useState } from 'react';

import LoginDrawer from './LoginDrawer';
import SignUpDrawer from './SignUpDrawer';

import { Button } from '@material-ui/core';
import logo from '../../assets/imgs/cartLogo/Logo.svg';
import './splashPage.css';
import '../../components/buttons/button.css';

const SplashPage = () => {
  const [signUpDrawer, setSignUpDrawer] = useState(false);
  const [loginDrawer, setLoginDrawer] = useState(false);

  const toggleDrawer = (open) => (event) => {
    setSignUpDrawer(open);
    setLoginDrawer(open);
  };

  function handleGuestLogin(e) {
    e.preventDefault();
    axios({
      method: 'POST',
      url: `/users/login`,
      data: {
        email: 'Guest@guestaccount.com',
        password: '123apple'
      }
    })
      .then(({ data }) => {
        //setUser(data.user)
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setLoginEmail('');
        setPass('');
        setUser({ firstName: data.user.firstName, email: data.user.email });
        toggleDrawer(false);
        history.push('/home');
      })
      .catch((e) => console.log(e.message.toString(), 'Crendentials error'));
  }

  return (
    <div className="splash-container">
      <div className="splash-top">
        <h2>On-the-Go</h2>
        <h3>Shopping</h3>
        <p>Skip the checkout lines</p>
      </div>

      <img src={logo} alt="On-the-shop shopping cart logo" />

      <div className="splash-bottom">
        <Button
          variant="contained"
          className="button-lg-green"
          onClick={() => setLoginDrawer(true)}
        >
          Login
        </Button>
        <Button
          variant="contained"
          className="button-lg-hollow"
          onClick={() => setSignUpDrawer(true)}
        >
          Signup
        </Button>

        <Button className="elusive-button" onClick={handleGuestLogin()}>
          Continue as guest
        </Button>

        <LoginDrawer toggleDrawer={toggleDrawer} loginDrawer={loginDrawer} />

        <SignUpDrawer
          toggleDrawer={toggleDrawer}
          signUpDrawer={signUpDrawer}
          setSignUpDrawer={setSignUpDrawer}
        />
      </div>
    </div>
  );
};

export default SplashPage;
