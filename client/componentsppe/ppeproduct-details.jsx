import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
    this.setState({ show: !this.state.show });
  }

  showModal() {
    const modalClassMod = this.state.show ? 'modal overlay d-block' : 'modal overlay';
    return (
      <div className={modalClassMod} id="demoDisclaimerModal" tabIndex="-1" role="dialog"
        aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered animate__animated animate__bounceIn" role="document">
          <div className="modal-content">
            <div className="modal-header d-inline">
              <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Item Added!</h5>
            </div>
            <div className="modal-body">
              Would you like to continue shopping? or view shopping cart?
            </div>
            <div className="modal-footer">
              <Link to="/ppeproductlist">
                <button type="button" className="btn btn-info">Continue Shopping</button>
              </Link>
              <Link to="/ppecartsummary">
                <button type="button" className="btn btn-success">View Cart</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { ppeProduct } = this.state;
    return (
      <section className="row no-gutters p-5 bg-lightblue">
        {this.showModal()}
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
      </section>
    );
  }
}
export default withRouter(PPEProductDetails);
