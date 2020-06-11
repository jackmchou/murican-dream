import React from 'react';
import { Link } from 'react-router-dom';

export default class PPECheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'addressOne', 'city', 'state', 'zipCode', 'cardNumber', 'cardMonth', 'cardYear', 'cardCVV'];
    this.state = {
      name: '',
      creditCard: '',
      addressOne: '',
      addressTwo: '',
      city: '',
      state: '--',
      zipCode: '',
      cardMonth: '--',
      cardYear: '--',
      cardCVV: '',
      toggleButton: false,
      error: Array.from(this.fields),
      showErrors: []
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
  }

  handleClick(event) {
    if (this.state.toggleButton) {
      return this.setState({
        errors:
        {
          name: 'Please enter a valid full name. i.e James Smith',
          creditCard: 'Please enter a valid VISA card',
          addressOne: 'Shipping Address is between 21 and 156 characters'
        }
      });
    }
  }

  handleInputChange(event) {
    const input = event.target;
    const regexTests = {
      name: /^(?! )[A-Za-z ]*$/,
      addressOne: /^(?! )[\w.,# ]*$/,
      addressTwo: /^(?! )[\w.,# ]*$/,
      city: /^(?! )[\w]*$/,
      zipCode: /^[\d]*$/,
      cardNumber: /^[\d]*$/,
      cardCVV: /^[\d]*$/
    };
    if (regexTests[input.id].test(input.value)) {
      this.setState({ [input.id]: input.value },
        () => this.passValidation(input));
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const orderObj = {
      name: this.state.name,
      addressOne: this.state.addressOne,
      addressTwo: this.state.addressTwo,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      creditCard: this.state.creditCard,
      cardMonth: this.state.cardMonth,
      cardYear: this.state.cardYear,
      cardCVV: this.state.cardCVV
    };
    this.props.onSubmit(orderObj);
  }

  handleInputBlur(event) {
    const input = event.currentTarget;
    this.setState({
      showErrors: !this.state.showErrors.includes(input.id)
        ? [...this.state.showErrors, input.id] : [...this.state.showErrors],
      [input.id]: this.state[input.id].trim()
    }, () => this.passValidation(input));
  }

  passValidation(input) {
    if (this.state[input.id].trim().length >= input.minLength) {
      this.setState({ error: this.state.error.filter(elem => elem !== input.id) });
    } else if (!this.state.error.includes(input.id)) this.setState({ error: [...this.state.error, input.id] });
  }

  render() {
    const submitButton = Object.values(this.state.error).every(idx => idx === '') ? 'Submit'
      : 'Please complete form';
    const { name, addressOne, addressTwo, city, state, zipCode, creditCard, cardMonth, cardYear, cardCVV } = this.state;
    const emptyFields = !(name && creditCard && addressOne && addressTwo && city && state && zipCode && cardMonth && cardYear && cardCVV);
    return (
      <form className="p-5 bg-lightblue" onSubmit={this.handleSubmit}>
        <div className="container bg-dark p-3 text-white">
          <h1>Order Form</h1>
          <p>Order Total: ${(this.props.ppeCart.reduce((cur, acc) => cur + acc.price * acc.quantity, 0) * 0.01).toFixed(2)}</p>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <small className="text-danger float-right">{this.state.error.name}</small>
            <input type="text" id="name" className="form-control" placeholder="Name" minLength="5"
              maxLength="65" pattern="[A-Za-z]{5,65}" title="Minimum 5 characters, max 65" required
              value={this.state.name} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="form-row d-flex flex-column flex-lg-row">
            <div className="form-group col-12 col-lg-6 mb-5">
              <label htmlFor="name">Address Line 1</label>
              <small className="text-danger float-right">{this.state.error.addressOne}</small>
              <input type="text" id="addressOne" className='form-control' placeholder="Address Line 1"
                minLength="4" maxLength="62" title="Between 4 and 62 characters of any kind" required
                onChange={this.handleInputChange} onBlur={this.handleInputBlur} value={this.state.addressOne} />
              <small id="infoHelp" className="form-text text-muted text-center">
                Please DO NOT use personal information</small>
              <small className="invalid-feedback position-absolute">Minimum of 4 characters required.</small>
            </div>
            <div className="form-group col-12 col-lg-6 mb-5">
              <label htmlFor="name">Address Line 2 (optional)</label>
              <input type="text" id="addressTwo" className='form-control' placeholder="Apt/Unit/#"
                minLength="0" maxLength="42" title="Between 0 and 42 characters of any kind, optional"
                onChange={this.handleInputChange} onBlur={this.handleInputBlur} value={this.state.addressTwo} />
            </div>
          </div>
          <div className="form-row d-flex flex-column flex-lg-row">
            <div className="form-group col-12 col-lg-7 mb-5">
              <label htmlFor="city">City</label>
              <input type="text" id="city" placeholder="City" minLength="3" maxLength="50"
                title="Minimum of 3 characters" required onChange={this.handleInputChange} value={this.state.city} />
              <small className="invalid-feedback position-absolute">Minimum of 3 characters required.</small>
            </div>
            <div className="form-group col-12 col-lg-2 mb-5">
              <label htmlFor="state">State</label>
              <select id="state" name="state" form="checkout" value={this.state.state} required>
                <option hidden disabled>--</option>
              </select>
              <small className="invalid-feedback position-absolute">Please select a state.</small>
            </div>
            <div className="form-group col-12 col-lg-3 mb-5">
              <label htmlFor="zipCode">ZIP Code</label>
              <input type="text" id="zipCode" placeholder="Zip Code" minLength="5" maxLength="5"
                pattern="(^\d{5}$)|(^\d{5}-\d{4}$)" required value={this.state.zipCode}
                onChange={this.handleInputChange} />
              <small className="invalid-feedback position-absolute">Please enter a valid 5 digit ZIP code.</small>
            </div>
          </div>
          <div className="mb-3">
            <h5>Payment</h5>
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card</label>
            <small className="text-danger float-right">{this.state.error.creditCard}</small>
            <input onChange={this.handleInputChange} onBlur={this.handleInputBlur} value={this.state.creditCard} type="text" id="creditCard"
              className="form-control" placeholder="Credit Card #" pattern="\d{16}"
              maxLength="16" minLength="16" title="16 Digits only" required />
            <small id="infoHelp" className="form-text text-muted text-center">
              Please DO NOT use personal information</small>
          </div>
          <div className="form-group col-12 col-lg-2 mb-5">
            <label htmlFor="cardMonth">Month</label>
            <select id="cardMonth" name="cardMonth" form="checkout"
              required>
              <option hidden disabled>--</option>
            </select>
            <small className="invalid-feedback position-absolute fade-in">Please select a month.</small>
          </div>
          <div className="form-group col-12 col-lg-2 mb-5">
            <label htmlFor="cardYear">Year</label>
            <select id="cardYear" name="cardYear" form="checkout"
              required>
              <option hidden disabled>--</option>
            </select>
            <small className="invalid-feedback position-absolute fade-in">Please select a year.</small>
          </div>
          <div className="form-group col-12 col-lg-2 mb-5">
            <label htmlFor="cardCVV">CVV</label>
            <input type="text" id="cardCVV" onChange={this.handleInputChange} placeholder="CVV"
              minLength="3" maxLength="4" pattern="\d{3,4}" title="Digits only" required />
            <small className="invalid-feedback position-absolute fade-in">Please enter a 3-4 digit CVV.</small>
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
