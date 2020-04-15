import React from 'react';
import { Link } from 'react-router-dom';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.setParams}`)
      .then(res => res.json())
      .then(product => this.setState({ product }))
      .catch(err => console.error(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { product } = this.state;
    const { addToCart } = this.props;
    return (
      <div className="row no-gutters p-5">
        {
          this.state.isLoading ? <h1>Loading...</h1>
            : <div className="card p-3">
              <Link to="/">
                <p className="text-dark m-2"> &lt; Back to Catalog</p>
              </Link>
              <div className="row">
                <div className="col-md-5">
                  <img src={product.image} className="card-img img-fluid mb-3" alt={product.name} />
                </div>
                <div className="card-body col-md-7">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-subtitle text-muted font-weight-bolder">$ {(product.price * 0.01).toFixed(2)}</p>
                  <p className="card-text">{product.shortDescription}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
              <p className="card-text">{product.longDescription}</p>
            </div>
        }
      </div>
    );
  }
}
