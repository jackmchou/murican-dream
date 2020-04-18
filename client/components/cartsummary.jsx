import React from 'react';
import { Link } from 'react-router-dom';

import CartSummaryItem from './cartsummaryitem';

export default function CartSummary(props) {
  const itemsArr = props.cart;
  const emptyCart = itemsArr.length === 0;
  return (
    <div className="p-5">
      <Link to="/">
        <p className="text-dark m-3 w-25 interactable-element"> &lt; Back to Catalog</p>
      </Link>
      <h1>My Cart</h1>
      {
        emptyCart ? <h1>No items in cart</h1>
          : itemsArr.map(item => {
            return <CartSummaryItem
              key={item.productId}
              item={item}
              deleteCartItems={props.deleteCartItems} />;
          })
      }
      <div>
        <h3 className="d-inline">Subtotal: ${(itemsArr.reduce((cur, acc) => cur + acc.price, 0) * 0.01).toFixed(2)}</h3>
        <Link to="/checkout">
          <button className="btn btn-primary float-right" disabled={emptyCart}>Check Out</button>
        </Link>
      </div>
    </div>
  );
}
