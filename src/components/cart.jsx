import React from "react";
import { toast } from "react-toastify";
import { useCart } from "../contexts/use-cart";
import { saveProductHistory } from "../services/historyService";

export default function Cart({ products, setIsOpen }) {
  const {
    addItem,
    removeItem,
    cartGroupedByItems,
    totalPrice,
    emptyCart,
  } = useCart();

  const handleSave = async (data) => {
    // console.log(data);

    const products = data.map((p) => {
      return {
        _id: p._id,
        name: p.name,
        price: p.price,
        barcode: p.barcode,
        image: p.image,
        quantity: p.quantity,
      };
    });

    try {
      await saveProductHistory({ products, totalPrice });
      toast.info("Saving Transaction");
      setIsOpen(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
    }
  };

  return (
    <div className="cart">
      {/* show cart items here */}
      {/* <div className="total">${totalPrice}</div> */}
      <div style={{ maxHeight: 400, overflow: "auto" }}>
        {cartGroupedByItems.map((product, index) => (
          <div className="cart-item" key={index}>
            <img src={product.image} alt={product.name} width="100" />

            <div className="content">
              <h3>{product.name}</h3>

              <div className="cart-buttons">
                <button onClick={() => removeItem(product._id)}>-</button>
                <button>{product.quantity}</button>
                <button onClick={() => addItem(product._id, products)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="total">
        {cartGroupedByItems.length !== 0 && (
          <>
            <button
              className="save"
              onClick={() => handleSave(cartGroupedByItems)}
            >
              Save
            </button>
            <button className="save clear" onClick={() => emptyCart()}>
              Clear
            </button>
          </>
        )}
        Rs.{totalPrice}
      </div>
    </div>
  );
}
