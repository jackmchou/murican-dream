import React from 'react';

export default function PPEFooter(props) {
  return (
    <div className="container-fluid footer bg-primary">
      <div className="row p-5">
        <div className="col-7">
          <h3>Contact US</h3>
        </div>
        <div className="col-5">Connect</div>
      </div>
      <div className="row">
        <div className="col-12 justify-content-center">
          <button className="btn btn-light">BACK TO TOP ^</button>
        </div>
      </div>
    </div>
  );
}
