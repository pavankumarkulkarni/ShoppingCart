import React from "react";
import Product from "../Product/Product";

export default function Products({ products }) {
  const product = products.map((product) => (
    <Product
      key={product._id}
      image={product.image}
      title={product.title}
      price={product.price}
      id={product._id}
    />
  ));
  return <div>{product}</div>;
}
