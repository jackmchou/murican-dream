import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PPEHeader(props) {
  return (
    <div className="container-fluid p-3 px-5 bg-primary text-white fixed-top">
      <NavLink to="/ppeproductlist">
        <span className="text-dark text-center h4 interactable-element">PPE Agora</span>
      </NavLink>
      <NavLink to="/ppecartsummary">
        <span className="text-dark h4 float-right">
          {props.ppeCartItemCount > 1
            ? props.ppeCartItemCount + ' items '
            : props.ppeCartItemCount + ' item '}
          <i className="fas fa-shopping-bag interactable-element" />
        </span>
      </NavLink>
    </div>
  );
}
