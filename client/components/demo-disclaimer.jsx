import React from 'react';

export default function DemoDisclaimer(props) {
  return (
    <div className="modal d-block" id="demoDisclaimerModal" tabIndex="-1" role="dialog"
      aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-inline">
            <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Welcome to Murican Dream</h5>
          </div>
          <div className="modal-body">
            Please note that this website is a content management application created for the purpose of <b>DEMOSTRATION</b>.
            By choosing the accept button below you acknowledge that the merchandise shown here is <b>NOT</b> available for purchase,
            that you will <b>NOT</b> provide genuine financial or personal information,
            and that you are aware no purchase will be processed.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary"
              onClick={() => !props.termsAccepted} data-dismiss="modal">Accept</button>
            <a href="https://jackmchou.com"><button type="button" className="btn btn-secondary"
              data-dismiss="modal" aria-label="Close">Cancel</button></a>
          </div>
        </div>
      </div>
    </div>
  );
}
