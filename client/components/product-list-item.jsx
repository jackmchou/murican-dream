import React from 'react';

export default function ProductListItem(props) {
  const product = props.products;
  return (
    <div className="col-md-4 mb-3" onClick={() => props.setView('details', product.productId)}>
      <div className="card h-100">
        <img src={product.image} className="card-img-top h-50" alt={product.name} />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-subtitle text-muted">$ {(product.price * 0.01).toFixed(2)}</p>
          <p className="card-text">{product.shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
