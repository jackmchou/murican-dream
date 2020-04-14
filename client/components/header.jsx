import React from 'react';

export default function Header(props) {
  return (
    <div className="container-lg p-3 px-5 text-white bg-dark">
      <span>Murican Dream</span>
      <span className="float-right">
        {props.cartItemCount > 1
          ? props.cartItemCount + ' items '
          : props.cartItemCount + ' item '}
        <i className="fas fa-shopping-cart"
          onClick={() => props.setView('cart', {})} /></span>
    </div>
  );
}
