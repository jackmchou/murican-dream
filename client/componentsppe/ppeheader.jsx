import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PPEHeader(props) {
  return (
    <div className="container-fluid p-3 px-4 text-white">
      <div className="row">
        <div className="col-md-7 col-sm-12">
          <i className="fas fa-head-side-mask fa-2x text-dark interactable-text mr-2"></i>
          <NavLink to="/ppeproductlist">
            <span className="text-dark h3 interactable-text">PPE Agora</span>
          </NavLink>
        </div>
        <div className="col-md-5 col-sm-12 pt-2 d-flex justify-content-end h5">
          <NavLink to="/ppeabout">
            <span className="text-dark pr-2 interactable-text">About</span>
          </NavLink>
          <NavLink to="/ppeproducts">
            <span className="text-dark pr-2 interactable-text">Products</span>
          </NavLink>
          <NavLink to="/ppecontact">
            <span className="text-dark pr-2 interactable-text">Contact</span>
          </NavLink>
          <NavLink to="/ppecartsummary">
            <span className="text-dark h5 float-right interactable-text">
              {props.ppeCartItemCount > 1
                ? props.ppeCartItemCount + ' items '
                : props.ppeCartItemCount + ' item '}
              <i className="fas fa-shopping-bag interactable-text" />
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
