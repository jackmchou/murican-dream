import React from 'react';
import { Link } from 'react-router-dom';

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
            By choosing the accept button below you acknowledge:
            <ol>
              <li>The merchandise shown here is <b>NOT</b> available for purchase</li>
              <li>You will <b>NOT</b> provide genuine personal information</li>
              <li>You are aware no purchase will be processed</li>
            </ol>
          </div>
          <div className="modal-footer bg-danger">
            <button type="button" className="btn btn-primary"
              onClick={() => props.acceptTerms()} data-dismiss="modal">Accept</button>
            <Link to="/">
              <button type="button" className="btn btn-secondary"
                data-dismiss="modal" aria-label="Close">Nah</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
