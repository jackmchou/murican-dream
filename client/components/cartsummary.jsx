import React from 'react';
import CartSummaryItem from './cartsummaryitem';

export default function CartSummary(props) {
  const itemsArr = props.cart;
  return (
    <div className="p-5">
      <p className="m-3" onClick={() => props.setView('catalog', {})}> &lt; Back to Catalog</p>
      <h1>My Cart</h1>
      {
        itemsArr.length === 0
          ? <h1>No items in cart</h1>
          : itemsArr.map(item => {
            return <CartSummaryItem
              key={item.productId}
              item={item}
              deleteCartItems={props.deleteCartItems} />;
          })
      }
      <div>
        <h3 className="d-inline">Subtotal: ${(itemsArr.reduce((cur, acc) => cur + acc.price, 0) * 0.01).toFixed(2)}</h3>
        <button className="btn btn-primary float-right"
          onClick={() => props.setView('checkout', {})}>
          Check Out</button>
      </div>
    </div>
  );
}
