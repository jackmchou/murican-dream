import React from 'react';
import MuricanLogin from './murican-login';
import Title from './title';

export default function DemoDisclaimer(props) {
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <Title />
      <div className="modal-dialog modal-dialog-centered animate__animated animate__backInRight" role="document">
        <div className="modal-content text-white">
          <div className="modal-header bg-primary d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to Murican Dream</h5>
          </div>
          <div className="modal-body bg-danger">
            This website is a content management application created for the purpose of <b>DEMOSTRATION & ENTERTAINMENT ONLY</b>.
            By entering the passphrase and choosing the login button below you acknowledge:
            <ol>
              <li>The merchandise shown here is <b>NOT</b> available for purchase</li>
              <li>You will <b>NOT</b> provide genuine personal information</li>
              <li>You are aware no purchase will be processed</li>
              <li>You are a self-aware adult capable of a sense of humor and taking responsibility of your feelings</li>
            </ol>
          </div>
          <MuricanLogin />
        </div>
      </div>
    </div>
  );
}
