import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthButton from './authbutton';

export default function Header(props) {
  return (
    <div className="container-fluid p-3 px-5 bg-secondary text-white fixed-top">
      <NavLink to="/productlist">
        <span className="text-dark h4 interactable-element">Murican Dream</span>
      </NavLink>
      <NavLink to="/cartsummary">
        <span className="text-dark h4 float-right">
          {props.cartItemCount > 1
            ? props.cartItemCount + ' items '
            : props.cartItemCount + ' item '}
          <i className="fas fa-shopping-cart interactable-element" />
        </span>
      </NavLink>
      <AuthButton />
    </div>
  );
}
