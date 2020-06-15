import React from 'react';
import { Link } from 'react-router-dom';

export default class PPECheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.fields = ['name', 'addressOne', 'city', 'state', 'zipCode', 'creditCard', 'cardMonth', 'cardYear', 'cardCVV'];
    this.state = {
      name: '',
      creditCard: '',
      addressOne: '',
      addressTwo: '',
      city: '',
      state: '--',
      zipCode: '',
      cardMonth: 'MM',
      cardYear: 'YYYY',
      cardCVV: '',
      toggleButton: false,
      error: Array.from(this.fields),
      showErrors: []
    };
    this.stateAbbr = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN',
      'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA',
      'WA', 'WV', 'WI', 'WY'];
    this.months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.years = [];
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const input = event.target;
    const regexTests = {
      name: /^(?! )[A-Za-z ]*$/,
      addressOne: /^(?! )[\w.,# ]*$/,
      addressTwo: /^(?! )[\w.,# ]*$/,
      city: /^(?! )[A-Za-z ]*$/,
      state: /^[A-Z]/,
      zipCode: /^[\d]*$/,
      creditCard: /^[\d]*$/,
      cardMonth: /^[\d]*$/,
      cardYear: /^[\d]*$/,
      cardCVV: /^[\d]*$/
    };
    if (regexTests[input.id].test(input.value)) {
      this.setState({ [input.id]: input.value },
        () => this.passValidation(input));
    }
  }

  handleInputBlur(event) {
    const input = event.currentTarget;
    const { showErrors } = this.state;
    this.setState({
      showErrors: !showErrors.includes(input.id) ? [...showErrors, input.id] : [...showErrors],
      [input.id]: this.state[input.id].trim()
    }, () => this.passValidation(input));
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      name, addressOne, addressTwo, city, state, zipCode,
      creditCard, cardMonth, cardYear, cardCVV
    } = this.state;
    this.props.onSubmit({ name, addressOne, addressTwo, city, state, zipCode, creditCard, cardMonth, cardYear, cardCVV });
  }

  passValidation(input) {
    const { error } = this.state;
    const dropDownDefaults = { state: '--', cardMonth: 'MM', cardYear: 'YYYY' };
    if (this.state[input.id].trim().length >= input.minLength) {
      this.setState({ error: error.filter(elem => elem !== input.id) });
    } else if (dropDownDefaults[input.id] && dropDownDefaults[input.id] !== this.state[input.id]) {
      this.setState({ error: error.filter(elem => elem !== input.id) });
    } else if (!error.includes(input.id)) this.setState({ error: [...error, input.id] });
  }

  validClassToggle(input) {
    const { error, showErrors } = this.state;
    if (['state', 'cardMonth', 'cardYear'].includes(input)) return error.includes(input) && showErrors.includes(input) ? 'custom-select is-invalid' : 'custom-select';
    return error.includes(input) && showErrors.includes(input) ? 'form-control is-invalid' : 'form-control';
  }

  generateOptionVal(optionVal) {
    return optionVal.map(val => <option key={val} value={val}>{val}</option>);
  }

  generateYears() {
    const years = [];
    for (let i = 0; i < 10; i++) years.push('' + ((new Date().getFullYear()) + i));
    return this.generateOptionVal(years);
  }

  render() {
    const { name, addressOne, addressTwo, city, state, zipCode, creditCard, cardMonth, cardYear, cardCVV, error } = this.state;
    const errorCheck = error.length > 0;
    return (
      <form className="p-5 bg-lightblue need-validation" noValidate onSubmit={this.handleSubmit}>
        <div className="container bg-dark p-3 text-white">
          <h1>Order Form</h1>
          <p>Order Total: ${(this.props.ppeCart.reduce((cur, acc) => cur + acc.price * acc.quantity, 0) * 0.01).toFixed(2)}</p>
          <div className="form-group position-relative mb-5">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" className={this.validClassToggle('name')} placeholder="Name"
              minLength="5" maxLength="65" title="Minimum 5 characters, max 65" required
              value={name} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
            <small className="invalid-tooltip animate__animated animate__fadeIn">Minimum of 5 characters please</small>
          </div>
          <div className="form-row">
            <div className="form-group col-12 col-lg-7 col-md-8 mb-5 position-relative">
              <label htmlFor="addressOne">Address Line 1</label>
              <input type="text" id="addressOne" className={this.validClassToggle('addressOne')} placeholder="123 Main St"
                minLength="4" maxLength="62" title="Between 4 and 62 characters of any kind" required
                value={addressOne} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
              <small className="invalid-tooltip animate__animated animate__fadeIn">Minimum of 4 characters please</small>
            </div>
            <div className="form-group col-12 col-lg-5 col-md-4 mb-5">
              <label htmlFor="addressTwo">Address Line 2 (optional)</label>
              <input type="text" id="addressTwo" className={this.validClassToggle('addressTwo')} placeholder="Apt/Unit/#"
                minLength="0" maxLength="42" title="Between 0 and 42 characters of any kind, optional"
                value={addressTwo} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-sm-12 col-lg-7 col-md-7 mb-5 position-relative">
              <label htmlFor="city">City</label>
              <input type="text" id="city" className={this.validClassToggle('city')} placeholder="City"
                minLength="3" maxLength="50" title="Minimum of 3 characters" required
                value={city} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
              <small className="invalid-tooltip animate__animated animate__fadeIn">Minimum of 3 characters please.</small>
            </div>
            <div className="form-group col-sm-12 col-lg-2 col-md-2 mb-5">
              <label htmlFor="state">State</label>
              <select id="state" form="checkout" className={this.validClassToggle('state')} data-minlength="2" required
                value={state} onChange={this.handleInputChange} onBlur={this.handleInputBlur} >
                <option hidden disabled>--</option>
                {this.generateOptionVal(this.stateAbbr)}
              </select>
              <small className="invalid-tooltip animate__animated animate__fadeIn">Please select a state.</small>
            </div>
            <div className="form-group col-12 col-lg-3 col-md-3 mb-5 position-relative">
              <label htmlFor="zipCode">Zip Code</label>
              <input type="text" id="zipCode" className={this.validClassToggle('zipCode')}
                minLength="5" maxLength="5" placeholder="Zip Code" required
                value={zipCode} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
              <small className="invalid-tooltip animate__animated animate__fadeIn">Valid ZIP please.</small>
            </div>
          </div>
          <div className="mb-3">
            <h5>Payment</h5>
          </div>
          <div className="form-row">
            <div className="form-group col-12 col-lg-6 col-md-6 mb-5">
              <label htmlFor="creditCard">Credit Card</label>
              <input type="text" id="creditCard" className={this.validClassToggle('creditCard')}
                placeholder="Credit Card #" maxLength="16" minLength="16" title="16 Digits only" required
                value={creditCard} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
              <small className="invalid-tooltip animate__animated animate__fadeIn">Valid 16 digit card number please.</small>
            </div>
            <div className="form-group col-12 col-lg-2 col-md-2 mb-5">
              <label htmlFor="cardMonth">Month</label>
              <select id="cardMonth" form="checkout" className={this.validClassToggle('cardMonth')} required
                value={cardMonth} onChange={this.handleInputChange} onBlur={this.handleInputBlur}>
                <option hidden disabled>MM</option>
                {this.generateOptionVal(this.months)}
              </select>
              <small className="invalid-tooltip animate__animated animate__fadeIn">Please select a month.</small>
            </div>
            <div className="form-group col-12 col-lg-2 col-md-2 mb-5">
              <label htmlFor="cardYear">Year</label>
              <select id="cardYear" form="checkout" className={this.validClassToggle('cardYear')} required
                value={cardYear} onChange={this.handleInputChange} onBlur={this.handleInputBlur} >
                <option hidden disabled>YYYY</option>
                {this.generateYears()}
              </select>
              <small className="invalid-tooltip animate__animated animate__fadeIn">Please select a year.</small>
            </div>
            <div className="form-group col-12 col-lg-2 col-md-2 mb-5">
              <label htmlFor="cardCVV">CVV</label>
              <input type="text" id="cardCVV" placeholder="CVV" className={this.validClassToggle('cardCVV')}
                minLength="3" maxLength="4" title="3 to 4 digits only" required
                value={cardCVV} onChange={this.handleInputChange} onBlur={this.handleInputBlur} />
              <small className="invalid-tooltip animate__animated animate__fadeIn">Please enter CVV #</small>
            </div>
          </div>
          <div className="p-2 d-flex justify-content-between">
            <Link to="/ppeproductlist" className="mr-2"><button className="btn btn-outline-info">Continue Shopping</button></Link>
            <button type="submit" className="btn btn-success" disabled={errorCheck}>{errorCheck ? 'Form Incomplete' : 'Submit'}</button>
          </div>
          <small id="infoHelp" className="form-text text-muted text-center">
            This is a demo, please do not use any personal identifiable information, no product will be purchased or shipped</small>
        </div>
      </form>
    );
  }
}
