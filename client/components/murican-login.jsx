import React from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import auth from '../lib/auth';

export default function MuricanLogin(props) {
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/productlist' } };
  const login = () => {
    auth.authenticate(() => {
      history.replace(from);
    });
  };

  return (
    <div className="modal-footer bg-danger">
      <p>You must log in to view Murican Dream</p>
      <button className="btn btn-primary" onClick={login}>Log in</button>
      <Link to="/">
        <button type="button" className="btn btn-secondary"
          data-dismiss="modal" aria-label="Close">Nah</button>
      </Link>
    </div>
  );
}
