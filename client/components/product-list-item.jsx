import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function ProductListItem(props) {
  const product = props.products;
  return (
    <div className="col-md-4 mb-3">
      <Link to={`/productdetails/${product.productId}`} className="text-decoration-none">
        <div className="text-dark card h-100" onClick={() => props.setParams(product.productId)}>
          <img src={product.image} className="card-img-top h-50" alt={product.name} />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-subtitle text-muted">$ {(product.price * 0.01).toFixed(2)}</p>
            <p className="card-text">{product.shortDescription}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default withRouter(ProductListItem);
