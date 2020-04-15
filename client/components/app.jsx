import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartsummary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: { name: 'catalog', params: {} },
      cart: []
    };
    this.setView = this.setView.bind(this);
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

  setView(name, params) {
    this.setState({ view: { name, params } });
  }

  render() {
    // let views;
    // switch (this.state.view.name) {
    //   case 'details':
    //     views = <ProductDetails setView={this.setView}
    //       viewParams={this.state.view.params}
    //       addToCart={this.addToCart} />;
    //     break;
    //   case 'cart':
    //     views = <CartSummary cart={this.state.cart} setView={this.setView} deleteCartItems={this.deleteCartItems} />;
    //     break;
    //   case 'checkout':
    //     views = <CheckoutForm onSubmit={this.placeOrder}
    //       setView={this.setView}
    //       cart={this.state.cart} />;
    //     break;
    //   default:
    //     views = <ProductList setView={this.setView} />;
    //     break;
    // }
    return (
      <Router>
        <Switch>
          <Route path="/productdetails">
            <ProductDetails setView={this.setView}
              viewParams={this.state.view.params}
              addToCart={this.addToCart} />;
          </Route>
          <Route path="/cartsummary">
            <Header cartItemCount={this.state.cart.length} />
            <CartSummary cart={this.state.cart} deleteCartItems={this.deleteCartItems} />
          </Route>
          <Route path="/checkout">
            <Header cartItemCount={this.state.cart.length} />
            <CheckoutForm onSubmit={this.placeOrder} cart={this.state.cart} />
          </Route>
          <Route path="/">
            <Header cartItemCount={this.state.cart.length} />
            <ProductList />
          </Route>
        </Switch>
      </Router>
      // <div>
      //   <Header cartItemCount={this.state.cart.length} setView={this.setView} />
      //   <div className="container-lg">{views}</div>
      // </div>
    );
  }
}
