import React, { Component } from 'react';
import PPEConfirmDelete from '../componentsppe/ppeconfirm-delete';

export default class PPECartSummaryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, quantity: this.props.item.quantity };
    this.showModal = this.showModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const quant = event.target;
    const patt = /(?!^0)(^[0-9]*)/;
    if (patt.test(quant.value)) this.setState({ quantity: quant.value });
  }

  handleBlur(event) {
    if (!this.state.quantity) {
      return this.setState({ quantity: 1 },
        () => this.props.updatePPEQuantity(this.props.item.productId, Number(this.state.quantity)));
    }
    this.props.updatePPEQuantity(this.props.item.productId, Number(this.state.quantity));
  }

  showModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const cartItem = this.props.item;
    return (
      <div className="card bg-light text-dark m-3">
        <div className="row no-gutters">
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
                <button className="btn">
                  <i className="fas fa-chevron-down text-danger"></i>
                </button>
                <input type="text" className="text-center mx-2"
                  value={this.state.quantity} onChange={this.handleChange}
                  minLength="1" maxLength="2" size="3" required />
                <button className="btn">
                  <i className="fas fa-chevron-up text-success"></i>
                </button>
              </form>
              <button className="btn btn-danger" onClick={this.showModal}>Remove from Cart</button>
            </div>
          </span>
        </div>
        <PPEConfirmDelete showModal={this.showModal} show={this.state.show}
          deletePPECartItem={this.props.deletePPECartItem}
          cartItem={cartItem} />
      </div>
    );
  }
}
