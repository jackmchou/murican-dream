import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import auth from '../lib/auth';
import LinkButton from '../components/linkbutton';

export default function MuricanLogin(props) {
  const history = useHistory();
  const location = useLocation();
  const [passphrase, setPass] = useState();
  // const [errorFeedBack, setFeedBack] = useState();
  const { from } = location.state || { from: { pathname: '/productlist' } };
  const login = event => {
    event.preventDefault();
    auth.authenticate(() => {
      history.replace(from);
    }, { passphrase });
    // if (!auth.isAuthenticated) {
    //   setFeedBack('Incorrect passphrase')
    // }
  };
  const handleChange = event => {
    setPass(event.target.value);
  };
  return (
    <div className="modal-footer justify-content-center text-dark">
      <form onSubmit={login}>
        <div className="form-group">
          <label htmlFor="passphrase">Passphrase</label>
          {/* <small className="text-danger float-right">{errorFeedBack}</small> */}
          <input onChange={handleChange} className="form-control" type="text" name="passphrase" title="Passphrase please" />
        </div>
        <p>You must enter the passphrase to view Murican Dream</p>
        <button type="submit" className="btn btn-primary mr-2">Log in</button>
        <LinkButton to="/" type="button" className="btn btn-secondary">Nah</LinkButton>
      </form>
    </div>
  );
}
