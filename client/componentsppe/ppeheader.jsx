import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PPEHeader(props) {
  return (
    <header className="container-fluid bg-primary pt-3 px-4 text-white">
      <div className="row">
        <div className="col-md-7 col-sm-12 text-center text-md-left">
          <NavLink to="/ppeabout">
            <i className="fas fa-head-side-mask fa-2x text-dark interactable-text mr-2"></i>
            <span className="text-dark h3 interactable-text">PPE Agora</span>
          </NavLink>
        </div>
        <div className="col-md-5 col-sm-12 pt-2 d-flex justify-content-end h5">
          <NavLink to="/ppeabout">
            <span className="text-dark pr-2 interactable-text">About</span>
          </NavLink>
          <NavLink to="/ppeproductlist">
            <span className="text-dark pr-2 interactable-text">Products</span>
          </NavLink>
          <span className="text-dark pr-2 interactable-text"
            onClick={() => scroll({ top: 5000, left: 0, behavior: 'smooth' })}>Contact</span>
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
    </header>
  );
}
