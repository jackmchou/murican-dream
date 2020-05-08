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
      <section className="container-fluid">
        <div className="row mb-5 d-flex flex-column align-items-center justify-content-center ppemain-img">
          <div className="display-3">Website Demo</div>
          <div className="h1 mb-5">Subtitles and text descriptions</div>
          <button className="mt-5 px-5 py-3 btn btn-warning"
            onClick={() => scroll({ top: 1000, left: 0, behavior: 'smooth' })}>Explore</button>
        </div>
        <section className="container-lg">
          <h1 className="text-center mb-5">Our Products</h1>
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
        </section>
        <section className="container-fluid overflow-hidden">
          <div className="row justify-content-end d-none d-sm-flex">
            <div className="col-10 bg-lightblue h-100-px"></div>
          </div>
          <div className="row">
            <div className="col-sm-11 col-12 bg-dark py-5">
              <div className="row py-sm-5">
                <div className="col-lg-2 col-sm-1"></div>
                <div className="col-lg-6 col-sm-8 col-12 text-white text-emphasis">
                  <h1>Our Story</h1>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique expedita doloribus
                    voluptatum architecto, dignissimos dolorem sint cumque atque nostrum quaerat sunt porro
                    quae quis est, reprehenderit mollitia eaque minus veritatis! Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Facere iure, ipsa corrupti maiores reiciendis numquam hic
                    similique, quidem recusandae cumque blanditiis magnam aperiam neque! Molestiae et provident
                    pariatur tenetur eum.</p>
                </div>
                <div className="col-lg-4 col-3 d-none d-sm-flex"></div>
              </div>
            </div>
            <div className="col-1 bg-lightblue"></div>
          </div>
          <div className="row ppe-about pt-5 mb-5 text-center">
            <div className="col-md-4 col-sm-12"><i className="fas fa-pump-medical fa-10x pb-3"></i>
              <h5>Feature Text</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus fugit consequatur
                eius alias veniam, ut temporibus explicabo nesciunt necessitatibus sunt quisquam! Obcaecati ex sequi
                quidem, perferendis unde consequuntur voluptatem!</p>
            </div>
            <div className="col-md-4 col-sm-12"><i className="fas fa-virus-slash fa-10x pb-3"></i>
              <h5>Feature Text</h5>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde hic cupiditate aut recusandae
                laborum id quae saepe vitae illo soluta. Amet perferendis sunt eos impedit dolores illo praesentium
                tempore reprehenderit.</p>
            </div>
            <div className="col-md-4 col-sm-12"><i className="fas fa-shield-virus fa-10x pb-3"></i>
              <h5>Feature Text</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt obcaecati laborum repellat alias.
                Ipsa, obcaecati. Ut molestias adipisci vero natus, quibusdam nihil consequatur, obcaecati ipsa repellendus
                non earum? Molestiae, veritatis.</p>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

export default withRouter(PPEProductList);
