import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Header(props) {
  return (
    <div className="container-lg p-3 px-5 text-white bg-dark">
      <span>Murican Dream</span>
      <Link to="/cartsummary">
        <span className="float-right">
          {props.cartItemCount > 1
            ? props.cartItemCount + ' items '
            : props.cartItemCount + ' item '}
          <i className="fas fa-shopping-cart" />
        </span>
      </Link>
    </div>
  );
}

export default withRouter(Header);
