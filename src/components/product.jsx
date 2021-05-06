import React from "react";
import { useCart } from "../contexts/use-cart";

export default function Product({ product, products }) {
  const { addItem, removeItem, countItemsInCart } = useCart();

  return (
    <div className="product">
      {/* image */}
      <img src={product.image} alt={product.name} />

      {/* product name */}
      <h3>{product.name}</h3>

      {/* buttons */}
      <div className="product-buttons">
        {/* remove */}
        {countItemsInCart(product._id) > 0 ? (
          <button className="remove" onClick={() => removeItem(product._id)}>
            Remove
          </button>
        ) : (
          <div />
        )}

        {/* add */}
        {/* <button className="add" onClick={() => addItem(product._id,products)}> */}
        <button className="add" onClick={() => addItem(product._id, products)}>
          Add to Cart ({countItemsInCart(product._id)})
        </button>
      </div>
    </div>
  );
}
