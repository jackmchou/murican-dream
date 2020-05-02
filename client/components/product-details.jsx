import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CartNaviModal from './cart-navi-modal';

class ProductDetails extends React.Component {
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
    fetch(`/api/products/${this.props.match.params.id}`)
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
      <div className="row no-gutters mt-5 p-5">
        {
          this.state.isLoading ? <h1>Loading...</h1>
            : <div className="card text-white bg-dark p-3">
              <Link to="/productlist">
                <button className="m-2 btn btn-outline-info">Back to Catalog</button>
              </Link>
              <div className="row">
                <div className="col-md-5">
                  <img src={product.image} className="card-img img-fluid mb-3" alt={product.name} />
                </div>
                <div className="card-body col-md-7">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-subtitle text-info font-weight-bolder">$ {(product.price * 0.01).toFixed(2)}</p>
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
export default withRouter(ProductDetails);
