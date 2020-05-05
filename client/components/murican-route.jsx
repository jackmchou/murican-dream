import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../lib/auth';

export default function MuricanRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) =>
      auth.isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/muricanlogin',
            state: { from: location }
          }}
        />
      )
    }
    />
  );
}
