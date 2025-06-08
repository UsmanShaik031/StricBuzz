import React, { useEffect } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const VerifyEmailLink = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn');
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          localStorage.removeItem('emailForSignIn');
          navigate('/');
        })
        .catch((error) => {
          console.error("Error verifying email link:", error);
        });
    }
  }, [auth, navigate]);

  return <div>Verifying...</div>;
};

export default VerifyEmailLink;
