import React from 'react';

export default class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: null,
      shippingAddress: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const tgt = event.target;
    const value = tgt.value;
    const name = tgt.name;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderObj = {
      name: this.state.name,
      creditCard: this.state.creditCard,
      shippingAddress: this.state.shippingAddress
    };
    this.props.onSubmit(orderObj);
  }

  render() {
    return (
      <form className="p-5" onSubmit={this.handleSubmit}>
        <h1>My Cart</h1>
        <p>Order Total: ${(this.props.cart.reduce((cur, acc) => cur + acc.price, 0) * 0.01).toFixed(2)}</p>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input onChange={this.handleChange} type="text" name="name"
            className="form-control" placeholder="Name" />
          <small id="infoHelp" className="form-text text-muted">Please DO NOT use personal information</small>
        </div>
        <div className="form-group">
          <label htmlFor="creditCard">Credit Card</label>
          <input onChange={this.handleChange} type="text" name="creditCard"
            className="form-control" placeholder="Credit Card #" />
          <small id="infoHelp" className="form-text text-muted">Please DO NOT use personal information</small>
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address</label>
          <textarea onChange={this.handleChange} className="form-control"
            name="shippingAddress" rows="4" />
          <small id="infoHelp" className="form-text text-muted">Please DO NOT use personal information</small>
        </div>
        <div className="p-2">
          <span onClick={() => this.props.setView('catalog', {})}> &lt; Continue Shopping</span>
          <button type="submit" className="btn btn-primary float-right">Submit</button>
        </div>
      </form>
    );
  }
}
