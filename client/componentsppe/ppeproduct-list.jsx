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
          <div className="display-3">Website Demo</div>
          <div className="h1 mb-5">Subtitles and text descriptions</div>
          <button className="mt-5 px-5 py-3 btn btn-warning"
            onClick={() => scroll({ top: 1000, left: 0, behavior: 'smooth' })}>Explore</button>
        </div>
        <div className="container">
          <div className="row ppe-about pt-5 mb-5 text-center">
            <div className="col-md-4 col-sm-12"><i className="fas fa-pump-medical fa-10x"></i>
              <p>Feature Text</p>
            </div>
            <div className="col-md-4 col-sm-12"><i className="fas fa-virus-slash fa-10x"></i>
              <p>Feature Text</p>

            </div>
            <div className="col-md-4 col-sm-12"><i className="fas fa-shield-virus fa-10x"></i>
              <p>Feature Text</p>
            </div>
          </div>
        </div>
        <div className="container-lg">
          <div className="row">
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
      </div>
    );
  }
}

export default withRouter(PPEProductList);
