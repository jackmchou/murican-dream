import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(props) {
  return (
    <div className="container-lg p-3 px-5 text-white bg-dark">
      <NavLink to="/">
        <span className="text-white">Murican Dream</span>
      </NavLink>
      <NavLink to="/cartsummary">
        <span className="text-white float-right">
          {props.cartItemCount > 1
            ? props.cartItemCount + ' items '
            : props.cartItemCount + ' item '}
          <i className="fas fa-shopping-cart" />
        </span>
      </NavLink>
    </div>
  );
}
