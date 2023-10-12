import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { Session } from '../App';

export function GoogleSignIn() {
  const session = useContext(Session);

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  return (
    <div>
      <br />
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
}
