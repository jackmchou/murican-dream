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
        <div className="row d-flex flex-column align-items-center justify-content-center ppemain-img">
          <div className="display-3">Website Presentation</div>
          <div className="h1 mb-5">Subtitles and text descriptions</div>
          <button className="mt-5 px-5 py-3 btn btn-warning" onClick={() => scroll({ top: 900, left: 0, behavior: 'smooth' })}>Explore</button>
        </div>
        <div className="row">
          <a href="#about">About</a>
        </div>
        <div className="row mt-5">
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
