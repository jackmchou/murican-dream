import React from 'react';

export default function PPEFooter(props) {
  return (
    <div className="container-fluid footer bg-lightblue">
      <div className="row py-5">
        <div className="col-7 pl-5 bg-primary">
          <h4>Contact US</h4>
        </div>
        <div className="col-5 pr-5 border-left border-dark bg-primary">
          <h4 className="mb-3 text-lg-center">Connect #PPEAGORA</h4>
          <div className="d-flex justify-content-around">
            <a className="badge badge-primary" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram fa-3x"></i></a>
            <a className="badge badge-primary" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-square fa-3x"></i></a>
            <a className="badge badge-primary" href="https://line.me/en/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-line fa-3x"></i></a>
            <a className="badge badge-primary" href="https://www.wechat.com/en/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-weixin fa-3x"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-light"
            onClick={() => scroll({ top: 0, left: 0, behavior: 'smooth' })}>BACK TO TOP ^</button>
        </div>
      </div>
    </div>
  );
}
