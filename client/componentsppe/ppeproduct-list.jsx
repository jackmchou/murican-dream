import React from 'react';
import { withRouter } from 'react-router-dom';
import PPEProductListItem from '../componentsppe/ppeproductlist-item';

class PPEProductList extends React.Component {
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
    fetch('/api/ppeproducts')
      .then(res => res.json())
      .then(products => this.setState({ products }));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-5 pt-5">
          {
            this.state.products.map(product => {
              return (<PPEProductListItem
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

export default withRouter(PPEProductList);
