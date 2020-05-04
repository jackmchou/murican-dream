import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PPECartNaviModal from './ppecart-navi-modal';

class PPEProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ppeProduct: null,
      isLoading: true,
      show: false
    };
    this.addItem = this.addItem.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    fetch(`/api/ppeproducts/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(ppeProduct => this.setState({ ppeProduct }))
      .catch(err => console.error(err))
      .finally(() => this.setState({ isLoading: false }));
  }

  addItem() {
    this.props.addPPEToCart(this.state.ppeProduct);
    this.showModal();
  }

  showModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { ppeProduct } = this.state;
    return (
      <div className="row no-gutters mt-5 p-5">
        {
          this.state.isLoading ? <h1>Loading...</h1>
            : <div className="card text-white bg-dark p-3">
              <Link to="/ppeproductlist">
                <button className="m-2 btn btn-outline-info">Back to Catalog</button>
              </Link>
              <div className="row">
                <div className="col-md-5">
                  <img src={ppeProduct.image} className="card-img img-fluid mb-3" alt={ppeProduct.name} />
                </div>
                <div className="card-body col-md-7">
                  <h4 className="card-title">{ppeProduct.name}</h4>
                  <p className="card-subtitle text-info font-weight-bolder">$ {(ppeProduct.price * 0.01).toFixed(2)}</p>
                  <p className="card-text">{ppeProduct.shortDescription}</p>
                  <button className="btn btn-primary" onClick={this.addItem}>Add to Cart</button>
                </div>
              </div>
              <p className="card-text">{ppeProduct.longDescription}</p>
            </div>
        }
        <PPECartNaviModal showModal={this.showModal} show={this.state.show} />
      </div>
    );
  }
}
export default withRouter(PPEProductDetails);
