import React from 'react';

export default function CartSummaryItem(props) {
  const cartItem = props.item;
  return (
    <div className="card m-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={cartItem.image} className="card-img" alt={cartItem.name} />
        </div>
        <span className="col-md-8 text-vertical">
          <div className="card-body">
            <h5 className="card-title">{cartItem.name}</h5>
            <p className="card-subtitle text-muted">$ {(cartItem.price * 0.01).toFixed(2)}</p>
            <p className="card-text">{cartItem.shortDescription}</p>
            <button className="btn btn-danger" onClick={() => props.deleteCartItems(cartItem.cartItemId)}>Remove from Cart</button>
          </div>
        </span>
      </div>
    </div>
  );
}
