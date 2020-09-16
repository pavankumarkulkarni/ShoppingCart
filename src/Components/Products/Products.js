import React from "react";
import Product from "../Product/Product";

export default function Products({ products, addToCart }) {
  const product = products.map((product) => (
    <Product key={product._id} product={product} addToCart={addToCart} />
  ));
  return <div>{product}</div>;
}
