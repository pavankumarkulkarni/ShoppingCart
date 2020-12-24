import React from "react";
import Product from "../Product/Product";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";
import NoProductsMessage from "./NoProductsMessage";

export default class Products extends React.Component {
  state = {
    modalProduct: null,
    showModal: false,
  };

  openModal = (product) => {
    this.setState({ modalProduct: product, showModal: true });
  };

  closeModal = () => {
    this.setState({ modalProduct: null, showModal: false });
  };
  addToCartAndClose = (product) => {
    this.closeModal();
    this.props.addToCart(product);
  };
  render() {
    console.log(this.props.products.len);
    const product =
      this.props.products.length > 0 ? (
        this.props.products.map((product) => (
          <Product
            key={product._id}
            product={product}
            addToCart={this.props.addToCart}
            openModal={this.openModal}
          />
        ))
      ) : (
        <NoProductsMessage />
      );

    return (
      <>
        {product}
        {this.state.showModal ? (
          <ProductDetailModal
            product={this.state.modalProduct}
            closeModal={this.closeModal}
            addToCart={this.addToCartAndClose}
          />
        ) : null}
      </>
    );
  }
}
