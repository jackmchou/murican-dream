import React from 'react';
import { Link } from 'react-router-dom';

import PPECartSummaryItem from '../componentsppe/ppecartsummaryitem';

export default function PPECartSummary(props) {
  const itemsArr = props.ppeCart;
  const emptyCart = itemsArr.length === 0;
  return (
    <div className="p-5 bg-lightblue">
      <div className="bg-dark text-white p-4">
        <Link to="/ppeproductlist">
          <button className="m-2 btn btn-outline-info">Back to Catalog</button>
        </Link>
        <h1>My Cart</h1>
        {
          emptyCart ? <h1>No items in cart</h1>
            : itemsArr.map(item => {
              return <PPECartSummaryItem
                key={item.productId}
                item={item}
                deletePPECartItem={props.deletePPECartItem} />;
            })
        }
        <div>
          <h3 className="d-inline">Subtotal: ${(itemsArr.reduce((cur, acc) => cur + acc.price, 0) * 0.01).toFixed(2)}</h3>
          <Link to="/ppecheckout">
            <button className="btn btn-primary float-right" disabled={emptyCart}>Check Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
