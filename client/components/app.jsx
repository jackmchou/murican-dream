import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header';
import VersionModal from './version-modal';
import DemoDisclaimer from './demo-disclaimer';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cartsummary';
import CheckoutForm from './checkout-form';
import OrderConfirm from './orderconfirm';
import MuricanRoute from './murican-route';
import PPEDemoDisclaimer from '../componentsppe/ppedemo-disclaimer';
import PPEProductList from '../componentsppe/ppeproduct-list';
import PPEProductDetails from '../componentsppe/ppeproduct-details';
import PPECartSummary from '../componentsppe/ppecartsummary';
import PPECheckOut from '../componentsppe/ppecheckout';
import PPEOrderConfirm from '../componentsppe/ppeorderconfirm';
import PPELayOut from '../componentsppe/ppelayout';
import PPEAbout from '../componentsppe/ppeabout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      cart: [],
      orderConfirmed: false,
      ppeTermsAccepted: Boolean(sessionStorage.getItem('ppeTermsAccepted')),
      ppeCart: [],
      ppeOrderConfirmed: false
    };
    this.getCartItems = this.getCartItems.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.deleteCartItem = this.deleteCartItem.bind(this);
    this.getPPECartItems = this.getPPECartItems.bind(this);
    this.addPPEToCart = this.addPPEToCart.bind(this);
    this.deletePPECartItem = this.deletePPECartItem.bind(this);
    this.updatePPEQuantity = this.updatePPEQuantity.bind(this);
    this.placePPEOrder = this.placePPEOrder.bind(this);
    this.ppeAcceptTerms = this.ppeAcceptTerms.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
    this.getPPECartItems();
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

  addPPEToCart(ppeProduct) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ppeProduct)
    };
    fetch('/api/ppeCart', req)
      .then(res => res.json())
      .then(ppeProduct => {
        const [...ppeCart] = this.state.ppeCart;
        const inCart = ppeCart.some(cartItem => cartItem.productId === ppeProduct.productId);
        if (!inCart) this.setState({ ppeCart: ppeCart.concat(ppeProduct) });
        else {
          const index = ppeCart.findIndex(cartItem => cartItem.productId === ppeProduct.productId);
          ppeCart[index] = ppeProduct;
          this.setState({ ppeCart });
        }
      })
      .catch(err => console.error(err));
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cart => this.setState({ cart }))
      .catch(err => console.error(err));
  }

  getPPECartItems() {
    fetch('/api/ppecart')
      .then(res => res.json())
      .then(ppeCart => this.setState({ ppeCart }))
      .catch(err => console.error(err));
  }

  deleteCartItem(cartItemId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/cart/${cartItemId}`, req)
      .then(res => res.json())
      .then(deletedItem => {
        const [...cart] = this.state.cart.filter(deleted => deletedItem.cartItemId !== deleted.cartItemId);
        this.setState({ cart });
      })
      .catch(err => console.error(err));
  }

  deletePPECartItem(ppeCartItemId) {
    const req = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`/api/ppecart/${ppeCartItemId}`, req)
      .then(res => res.json())
      .then(deletedItem => {
        const [...ppeCart] = this.state.ppeCart.filter(deleted => deletedItem.ppeCartItemId !== deleted.ppeCartItemId);
        this.setState({ ppeCart });
      })
      .catch(err => console.error(err));
  }

  updatePPEQuantity(productId, quantity) {
    fetch('/api/ppecart/', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    })
      .then(res => res.json())
      .then(data => {
        const [...ppeCart] = this.state.ppeCart;
        const index = ppeCart.findIndex(cartItem => cartItem.productId === data.productId);
        ppeCart[index].quantity = data.quantity;
        this.setState({ ppeCart });
      })
      .catch(err => {
        console.error(err);
      });
  }

  placeOrder(orderObj) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderObj)
    };
    fetch('/api/orders', req)
      .then(res => res.json())
      .then(order => this.setState({ cart: [], orderConfirmed: true }))
      .catch(err => console.error(err));
  }

  placePPEOrder(orderObj) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderObj)
    };
    fetch('/api/ppeorders', req)
      .then(res => res.json())
      .then(ppeorder => this.setState({ ppeCart: [], ppeOrderConfirmed: true }))
      .catch(err => console.error(err));
  }

  ppeAcceptTerms() {
    sessionStorage.setItem('ppeTermsAccepted', true);
    this.setState({ ppeTermsAccepted: Boolean(sessionStorage.ppeTermsAccepted) });
  }

  render() {
    const { cart, ppeCart, ppeTermsAccepted, orderConfirmed, ppeOrderConfirmed } = this.state;
    return (
      <Router>
        <Switch>
          <MuricanRoute path="/productdetails/:id">
            <Header cartItemCount={cart.length} />
            <ProductDetails addToCart={this.addToCart} />
          </MuricanRoute>
          <MuricanRoute path="/cartsummary">
            <Header cartItemCount={cart.length} />
            <CartSummary cart={cart} deleteCartItem={this.deleteCartItem} />
          </MuricanRoute>
          <MuricanRoute path="/checkout">
            <Header cartItemCount={cart.length} />
            {orderConfirmed ? <OrderConfirm />
              : <CheckoutForm onSubmit={this.placeOrder} cart={cart} />}
          </MuricanRoute>
          <Route path="/muricanlogin">
            <DemoDisclaimer />
          </Route>
          <MuricanRoute path="/productlist">
            <Header cartItemCount={cart.length} />
            <ProductList />
          </MuricanRoute>
          <Route path="/ppeproductdetails/:id">
            <PPELayOut ppeCartItemCount={ppeCart.length}>
              <PPEProductDetails addPPEToCart={this.addPPEToCart} />
            </PPELayOut>
          </Route>
          <Route path="/ppecartsummary">
            <PPELayOut ppeCartItemCount={ppeCart.length}>
              <PPECartSummary ppeCart={ppeCart} updatePPEQuantity={this.updatePPEQuantity} deletePPECartItem={this.deletePPECartItem} />
            </PPELayOut>
          </Route>
          <Route path="/ppecheckout">
            <PPELayOut ppeCartItemCount={ppeCart.length}>
              {ppeOrderConfirmed ? <PPEOrderConfirm />
                : <PPECheckOut onSubmit={this.placePPEOrder} ppeCart={ppeCart} />}
            </PPELayOut>
          </Route>
          <Route path="/ppeproductlist">
            {!ppeTermsAccepted ? <PPEDemoDisclaimer ppeAcceptTerms={this.ppeAcceptTerms} />
              : <PPELayOut ppeCartItemCount={ppeCart.length}
                ppeAcceptTerms={this.ppeAcceptTerms}>
                <PPEProductList addPPEToCart={this.addPPEToCart} />
              </PPELayOut>}
          </Route>
          <Route path="/ppeabout">
            <PPELayOut ppeCartItemCount={ppeCart.length}>
              <PPEAbout />
            </PPELayOut>
          </Route>
          <Route path="/">
            <VersionModal />
          </Route>
        </Switch>
      </Router>
    );
  }
}
