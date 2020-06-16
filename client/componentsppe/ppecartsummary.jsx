import React from 'react';
import PPECartSummaryItem from '../componentsppe/ppecartsummaryitem';
import LinkButton from '../components/linkbutton';

export default function PPECartSummary(props) {
  const itemsArr = props.ppeCart;
  const emptyCart = itemsArr.length === 0;
  return (
    <section className="p-5 bg-lightblue min-100vh">
      <div className="bg-dark text-white p-4">
        <LinkButton to="/ppeproductlist" className="m-2 btn btn-outline-info d-md-inline d-block mx-auto">
          Back to Catalog</LinkButton>
        <h1>My Cart</h1>
        {
          emptyCart ? <h1>No items in cart</h1>
            : itemsArr.map(item => {
              return <PPECartSummaryItem
                key={item.productId}
                item={item}
                deletePPECartItem={props.deletePPECartItem}
                updatePPEQuantity={props.updatePPEQuantity} />;
            })
        }
        <h3 className="d-md-inline">Subtotal: ${(itemsArr.reduce((cur, acc) => cur + acc.price * acc.quantity, 0) * 0.01).toFixed(2)}</h3>
        <LinkButton to="/ppecheckout" disabled={emptyCart}
          className={`btn ${emptyCart ? 'btn-secondary' : 'btn-success'} float-md-right d-md-inline d-block mx-auto`} >Check Out</LinkButton>
      </div>
    </section>
  );
}
