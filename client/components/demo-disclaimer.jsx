import React from 'react';
import MuricanLogin from './murican-login';

export default function DemoDisclaimer(props) {
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-white">
          <div className="modal-header bg-danger d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to Murican Dream</h5>
          </div>
          <div className="modal-body bg-primary">
            This website is a content management application created for the purpose of <b>DEMOSTRATION & ENTERTAINMENT ONLY</b>.
            By entering the passphrase and choosing the login button below you acknowledge:
            <ol>
              <li>The merchandise shown here is <b>NOT</b> available for purchase</li>
              <li>You will <b>NOT</b> provide genuine personal information</li>
              <li>You are aware no purchase will be processed</li>
              <li>You are a self-aware adult capable of a sense of humor and taking responsibility of your feelings</li>
            </ol>
            <label htmlFor="passphrase">Passphrase</label>
            <input type="text" className="form-control"/>
          </div>
          <div>
            <MuricanLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
