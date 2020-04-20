import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import DemoDisclaimer from './demo-disclaimer';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartsummary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: false,
      message: null,
      isLoading: true,
      params: {},
      cart: []
    };
    this.setParams = this.setParams.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteCartItems = this.deleteCartItems.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  addToCart(product) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', req)
      .then(res => res.json())
      .then(product => this.setState({ cart: this.state.cart.concat(product) }));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(err => console.error(err));
  }

  deleteCartItems(cartItemId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/cart/${cartItemId}`, req)
      .then(res => res.json())
      .then(deletedItem => {
        const cartItems = this.state.cart.filter(deleted => deletedItem.cartItemId !== deleted.cartItemId);
        this.setState({ cart: cartItems });
      })
      .catch(err => console.error(err));
  }

  placeOrder(orderObj) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderObj)
    };
    fetch('/api/orders', req)
      .then(res => res.json())
      .then(order => this.setState({ cart: [], view: { name: 'catalog', params: {} } }))
      .catch(err => console.error(err));
  }

  setParams(params) {
    this.setState({ params });
  }

  render() {
    const { termsAccepted, cart } = this.state;
    return (
      <Router>
        <Switch>
          <Route path="/productdetails/:id">
            <Header cartItemCount={cart.length} />
            <ProductDetails setParams={this.state.params}
              addToCart={this.addToCart} />;
          </Route>
          <Route path="/cartsummary">
            <Header cartItemCount={cart.length} />
            <CartSummary cart={cart} deleteCartItems={this.deleteCartItems} />
          </Route>
          <Route path="/checkout">
            <Header cartItemCount={cart.length} />
            <CheckoutForm onSubmit={this.placeOrder} cart={cart} />
          </Route>
          <Route path="/">
            <DemoDisclaimer termsAccepted={termsAccepted} />
            <Header cartItemCount={cart.length} />
            <ProductList setParams={this.setParams} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
