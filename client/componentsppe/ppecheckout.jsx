import React from 'react';
import { Link } from 'react-router-dom';

export default class PPECheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      toggleButton: false,
      errors: {
        name: '',
        creditCard: '',
        shippingAddress: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.passValidation = this.passValidation.bind(this);
  }

  handleBlur(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        this.setState({
          errors: {
            name: /[A-Za-z]{5,65}/g.test(value)
              ? '' : 'Please enter a valid full name. i.e James Smith'
          }
        });
        break;
      case 'creditCard':
        this.setState({
          errors: {
            creditCard: /\d{16}/g.test(value)
              ? '' : 'Please enter a valid 16 digit credit card'
          }
        });
        break;
      case 'shippingAddress':
        this.setState({
          errors: {
            shippingAddress: value.length > 21 && value.length < 156
              ? '' : 'Shipping Address is between 21 and 156 characters'
          }
        });
        break;
      default:
        break;
    }
  }

  handleClick(event) {
    if (this.state.toggleButton) {
      return this.setState({
        errors:
        {
          name: 'Please enter a valid full name. i.e James Smith',
          creditCard: 'Please enter a valid VISA card',
          shippingAddress: 'Shipping Address is between 21 and 156 characters'
        }
      });
    }
  }

  handleChange(event) {
    this.passValidation();
    const { name, value } = event.target;
    if (this.passValidation) {
      return this.setState({
        [name]: value,
        // toggleButton: !this.state.toggleButton,
        errors: { name: '', errors: '', shippingAddress: '' }
      });
    }
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

  passValidation() {
    if (Object.values(this.state.errors).every(idx => idx === '')) return true;
  }

  render() {
    const submitButton = Object.values(this.state.errors).every(idx => idx === '') ? 'Submit'
      : 'Please complete form';
    const { name, creditCard, shippingAddress } = this.state;
    const emptyFields = !(name && creditCard && shippingAddress);
    return (
      <form className="p-5 bg-lightblue" onSubmit={this.handleSubmit}>
        <div className="bg-dark p-3 text-white">
          <h1>Order Form</h1><small>Please DO NOT use personal information, this site is a demo</small>
          <p>Order Total: ${(this.props.ppeCart.reduce((cur, acc) => cur + acc.price * acc.quantity, 0) * 0.01).toFixed(2)}</p>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <small className="text-danger float-right"> {this.state.errors.name}</small>
            <input onChange={this.handleChange} onBlur={this.handleBlur} type="text" name="name"
              className="form-control" placeholder="Name" minLength="5" maxLength="65" pattern="[A-Za-z]{5,65}"
              required title="Minimum 5 characters, max 65" />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="form-row d-flex flex-column flex-lg-row">
            <div className="form-group col-12 col-lg-6 mb-5">
              <label htmlFor="name">Address Line 1</label>
              <input type="text" id="addressOne"
                minLength={6} maxLength={42} required />
              <small className="invalid-feedback position-absolute">Minimum of 21 characters required.</small>
            </div>
            <div className="form-group col-12 col-lg-6 mb-5">
              <label htmlFor="name">Address Line 2 (optional)</label>
              <input type="text" id="addressTwo" className='form-control'
                minLength={0} maxLength={42} required />
            </div>
          </div>
          <div className="form-row d-flex flex-column flex-lg-row">
            <div className="form-group col-12 col-lg-7 mb-5">
              <label htmlFor="city">City</label>
              <input type="text" id="city"
                minLength={3} maxLength={50} required />
              <small className="invalid-feedback position-absolute">Minimum of 3 characters required.</small>
            </div>
            <div className="form-group col-12 col-lg-2 mb-5">
              <label htmlFor="state">State</label>
              <select id="state" name="state" form="checkout" required>
                <option hidden disabled>--</option>
              </select>
              <small className="invalid-feedback position-absolute">Please select a state.</small>
            </div>
            <div className="form-group col-12 col-lg-3 mb-5">
              <label htmlFor="zipCode">ZIP Code</label>
              <input type="text" id="zipCode"
                minLength={5} maxLength={5} required />
              <small className="invalid-feedback position-absolute">Please enter a 5 digit ZIP code.</small>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <small className="text-danger float-right">{this.state.errors.creditCard}</small>
            <input onChange={this.handleChange} onBlur={this.handleBlur} type="text" name="creditCard"
              className="form-control" placeholder="Credit Card #" pattern="\d{16}"
              maxLength="16" minLength="16" title="16 Digits only" required />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address</label>
            <small className="text-danger float-right">{this.state.errors.shippingAddress}</small>
            <textarea onChange={this.handleChange} onBlur={this.handleBlur} name="shippingAddress" rows="4"
              className="form-control" placeholder="Shipping Address"
              minLength="21" maxLength="156" title="Between 21 and 156 characters of any kind" required />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="p-2">
            <Link to="/ppeproductlist">
              <button className="btn btn-outline-info">Continue Shopping</button>
            </Link>
            <span className="float-right" onClick={this.handleClick}>
              <button type="submit" className="btn btn-success" disabled={emptyFields}>{submitButton}</button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}
