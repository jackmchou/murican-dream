import React, { Component } from 'react';
import ConfirmDelete from './confirm-delete';

export default class CartSummaryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const cartItem = this.props.item;
    return (
      <div className="card text-dark m-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={cartItem.image} className="card-img" alt={cartItem.name} />
          </div>
          <span className="col-md-8 text-vertical">
            <div className="card-body">
              <h5 className="card-title">{cartItem.name}</h5>
              <p className="card-subtitle text-muted">$ {(cartItem.price * 0.01).toFixed(2)}</p>
              <p className="card-text">{cartItem.shortDescription}</p>
              <button className="btn btn-danger" onClick={this.showModal}>Remove from Cart</button>
            </div>
          </span>
        </div>
        <ConfirmDelete showModal={this.showModal} show={this.state.show}
          deleteCartItem={this.props.deleteCartItem}
          cartItem={cartItem} />
      </div>
    );
  }
}
