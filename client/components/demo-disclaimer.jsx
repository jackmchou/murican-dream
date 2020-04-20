import React from 'react';

export default function DemoDisclaimer(props) {
  return (
    <div className="modal d-block bg-danger" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content text-primary">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to Murican Dream</h5>
          </div>
          <div className="modal-body">
            This website is a content management application created for the purpose of <b>DEMOSTRATION ONLY</b>.
            By choosing the accept button below you acknowledge that the merchandise shown here is <b>NOT</b> available for purchase,
            that you will <b>NOT</b> provide genuine personal information,
            and that you are aware no purchase will be processed.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary"
              onClick={() => props.acceptTerms()} data-dismiss="modal">Accept</button>
            <a href="https://jackmchou.com"><button type="button" className="btn btn-secondary"
              data-dismiss="modal" aria-label="Close">Nah</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}
