import React, { Component } from 'react';

export default class PPECartSummaryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, quantity: this.props.item.quantity };
    this.showModal = this.showModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.toggleQuantity = this.toggleQuantity.bind(this);
  }

  handleChange(event) {
    const quant = event.target;
    const patt = /(?!^0)(^[0-9]*$)/;
    if (patt.test(quant.value)) this.setState({ quantity: quant.value });
  }

  handleBlur() {
    const { productId } = this.props.item;
    const { quantity } = this.state;
    if (!quantity) {
      return this.setState({ quantity: 1 },
        () => this.props.updatePPEQuantity(productId, Number(quantity)));
    }
    this.props.updatePPEQuantity(productId, Number(quantity));
  }

  toggleQuantity(event) {
    event.preventDefault();
    const { id } = event.currentTarget;
    const { quantity } = this.state;
    const { productId } = this.props.item;
    if (id === 'up' && quantity < 99) {
      return this.setState({ quantity: Number(quantity) + 1 },
        () => this.props.updatePPEQuantity(productId, quantity + 1));
    }
    if (id === 'down' && quantity > 1) {
      return this.setState({ quantity: Number(quantity) - 1 },
        () => this.props.updatePPEQuantity(productId, quantity - 1));
    }
  }

  showModal() {
    const modalClassMod = this.state.show ? 'modal overlay d-block' : 'modal overlay';
    return (
      <div className={modalClassMod} id="demoDisclaimerModal" tabIndex="-1" role="dialog"
        aria-labelledby="demoDisclaimerModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered animate__animated animate__bounceIn" role="document">
          <div className="modal-content">
            <div className="modal-header d-inline">
              <h5 className="modal-title text-center" id="demoDisclaimerModalTitle">Please confirm</h5>
            </div>
            <div className="modal-body">
              {`You want to remove ${this.state.quantity} of ${this.props.item.name} from your cart?`}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger"
                onClick={() => this.props.deletePPECartItem(this.props.item.ppeCartItemId)}>Delete</button>
              <button type="button" className="btn btn-secondary"
                onClick={() => this.setState({ show: !this.state.show })}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const cartItem = this.props.item;
    return (
      <div className="card bg-light text-dark m-3">
        <div className="row no-gutters">
          {this.showModal()}
          <div className="col-md-4">
            <img src={cartItem.image} className="card-img" alt={cartItem.name} />
          </div>
          <span className="col-md-8 text-vertical">
            <div className="card-body">
              <h5 className="card-title">{cartItem.name}</h5>
              <p className="card-subtitle text-muted">$ {(cartItem.price * 0.01).toFixed(2)}</p>
              <p className="card-text">{cartItem.shortDescription}</p>
              <form className="form-group d-flex align-items-center mb-3">
                <label htmlFor="quantity" className="mb-0 mr-3">Quantity:</label>
                <button className="btn" id="down" onClick={this.toggleQuantity}>
                  <i className="fas fa-chevron-down text-danger"></i>
                </button>
                <input type="text" className="text-center mx-1"
                  value={this.state.quantity} onChange={this.handleChange} onBlur={this.handleBlur}
                  minLength="1" maxLength="2" size="3" required />
                <button className="btn" id="up" onClick={this.toggleQuantity}>
                  <i className="fas fa-chevron-up text-success"></i>
                </button>
              </form>
              <button className="btn btn-danger" onClick={() => this.setState({ show: !this.state.show })}>Remove from Cart</button>
            </div>
          </span>
        </div>
      </div>
    );
  }
}
