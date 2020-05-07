import React from 'react';
import { useHistory } from 'react-router-dom';

import auth from '../lib/auth';

export default function AuthButton() {
  const history = useHistory();
  return auth.isAuthenticated ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          auth.signout(() => history.push('/muricanlogin'));
        }}
      >
        Get me outta here
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}
