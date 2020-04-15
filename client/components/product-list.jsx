import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  render() {
    return (
      <div className="row p-5">
        {
          this.state.products.map(product => {
            return (<ProductListItem
              key={product.productId}
              products={product}
              setParams={this.props.setParams}
            />);
          })
        }
      </div>
    );
  }
}
