import React, { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import auth from '../lib/auth';

export default function MuricanLogin(props) {
  const history = useHistory();
  const location = useLocation();
  const [passphrase, setPass] = useState();
  const { from } = location.state || { from: { pathname: '/productlist' } };
  const login = event => {
    event.preventDefault();
    auth.authenticate(() => {
      history.replace(from);
    }, { passphrase });
  };

  return (
    <div className="modal-footer justify-content-center text-dark">
      <form>
        <div className="form-group">
          <label htmlFor="passphrase">Passphrase</label>
          <input onChange={event => setPass(event.target.value)} className="form-control" type="text" name="passphrase" />
        </div>
        <p>You must enter the passphrase to view Murican Dream</p>
        <button className="btn btn-primary mr-2" onClick={login}>Log in</button>
        <Link to="/">
          <button type="button" className="btn btn-secondary"
            data-dismiss="modal" aria-label="Close">Nah</button>
        </Link>
      </form>
    </div>
  );
}
