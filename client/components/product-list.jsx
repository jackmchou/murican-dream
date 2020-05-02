import React from 'react';
import { withRouter } from 'react-router-dom';
import ProductListItem from './product-list-item';

class ProductList extends React.Component {
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
      <div className="container-fluid">
        <div className="row m-5 p-5">
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
      </div>
    );
  }
}

export default withRouter(ProductList);
