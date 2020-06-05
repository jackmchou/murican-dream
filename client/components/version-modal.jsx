import React from 'react';
import { Link } from 'react-router-dom';
import Title from './title';

export default function VersionModal(props) {
  return (
    <div className="modal overlay d-block" id="versionModal" tabIndex="-1" role="dialog"
      aria-labelledby="versionModalTitle" aria-hidden="true">
      <Title/>
      <div className="modal-dialog modal-dialog-centered animate__animated animate__fadeIn" role="document">
        <div className="modal-content text-white">
          <div className="modal-header bg-dark d-inline">
            <h5 className="modal-title text-center" id="versionModalTitle">Storefronts</h5>
          </div>
          <div className="modal-body bg-secondary ">
            Welcome to my e-commerce site demo, please choose a storefront.
            PPE Agora is open to the public.
            Murican Dream is invite only and requires a passphrase from the host.
          </div>
          <div className="modal-footer bg-dark justify-content-center">
            <Link to="/ppeproductlist">
              <button type="button" className="btn btn-primary mr-3"
                data-dismiss="modal">PPE Agora</button>
            </Link>
            <Link to="/productlist">
              <button type="button" className="btn btn-danger ml-3"
                data-dismiss="modal" aria-label="Close">Murican Dream</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
