import React from 'react';
import { Link } from 'react-router-dom';

import CartSummaryItem from './cartsummaryitem';

export default function CartSummary(props) {
  const itemsArr = props.cart;
  const emptyCart = itemsArr.length === 0;
  return (
    <div className="p-5 mt-5">
      <Link to="/productlist">
        <button className="m-2 btn btn-outline-info">Back to Catalog</button>
      </Link>
      <div className="bg-dark p-4">
        <h1 className="text-white">My Cart</h1>
        {
          emptyCart ? <h1>No items in cart</h1>
            : itemsArr.map(item => {
              return <CartSummaryItem
                key={item.productId}
                item={item}
                deleteCartItem={props.deleteCartItem} />;
            })
        }
        <div>
          <h3 className="text-white d-inline">Subtotal: ${(itemsArr.reduce((cur, acc) => cur + acc.price, 0) * 0.01).toFixed(2)}</h3>
          <Link to="/checkout">
            <button className="btn btn-primary float-right" disabled={emptyCart}>Check Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
