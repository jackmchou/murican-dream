import React from 'react';
import { Link } from 'react-router-dom';
import CartNaviModal from './modal';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoading: true,
      show: false
    };
    this.addItem = this.addItem.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.setParams}`)
      .then(res => res.json())
      .then(product => this.setState({ product }))
      .catch(err => console.error(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  addItem() {
    this.props.addToCart(this.state.product);
    this.showModal();
  }

  showModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { product } = this.state;
    return (
      <div className="row no-gutters p-5">
        {
          this.state.isLoading ? <h1>Loading...</h1>
            : <div className="card p-3">
              <Link to="/">
                <p className="text-dark w-25 m-2 interactable-element"> &lt; Back to Catalog</p>
              </Link>
              <div className="row">
                <div className="col-md-5">
                  <img src={product.image} className="card-img img-fluid mb-3" alt={product.name} />
                </div>
                <div className="card-body col-md-7">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-subtitle text-muted font-weight-bolder">$ {(product.price * 0.01).toFixed(2)}</p>
                  <p className="card-text">{product.shortDescription}</p>
                  <button className="btn btn-primary" onClick={this.addItem}>Add to Cart</button>
                </div>
              </div>
              <p className="card-text">{product.longDescription}</p>
            </div>
        }
        <CartNaviModal showModal={this.showModal} show={this.state.show} />
      </div>
    );
  }
}
