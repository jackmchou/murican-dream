import React from 'react';
import { Link } from 'react-router-dom';

export default function PPEFooter(props) {
  return (
    <footer className="container-fluid footer bg-lightblue">
      <div className="row py-5">
        <div className="col-7 pl-5 py-5 bg-primary">
          <h4>Contact US</h4>
          <h5>Tel: 123-445-6443</h5>
          <h5>E-mail: customers@ppeagora.com</h5>
        </div>
        <div className="col-5 pr-5 py-5 border-left border-dark bg-primary">
          <h4 className="mb-3 text-center">Connect #PPEAGORA</h4>
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
      <div className="row py-2 bg-light">
        <div className="col-12 d-flex justify-content-center">
          <button className="btn btn-light btn-lg font-weight-bold"
            onClick={() => scroll({ top: 0, left: 0, behavior: 'smooth' })}>BACK TO TOP ^</button>
          <Link to="/">
            <button className="btn btn-danger btn-lg font-weight-bold ml-3">Exit Demo</button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
