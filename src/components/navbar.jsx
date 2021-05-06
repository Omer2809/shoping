import React, { useState, useRef, useEffect } from "react";
import CartIcon from "../supermarket.svg";
import useOnClickOutside from "use-onclickoutside";
import { useCart } from "../contexts/use-cart";
import Cart from "./cart";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productService";

export default function Navbar({ user }) {
  const { cart } = useCart();

  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: products } = await getProducts();
      setProducts(products);
    }
    fetchData();
  }, []);

  // close the modal if we click outside of it
  useOnClickOutside(modalRef, () => setIsOpen(false));

  return (
    <header>
      <div className="container">
        <Link to="/" style={{ fontSize: 20, font: "bold" }}>
          My Shop
        </Link>

        <div style={{ display: "flex", textDecoration: "none" }}>
          <>
            <Link to="/products/new">+ New </Link>
            <Link to="/products">products</Link>
            <Link to="/history">Report </Link>
            <Link to="/register">Add User</Link>
            <Link to="/logout">LogOut</Link>
          </>

          <div className="cart-button">
            <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
              <img src={CartIcon} alt="icon" width="30" />({cart.length})
            </button>

            {/* show a modal */}
            <div
              ref={modalRef}
              className="cart-modal"
              style={{ display: isOpen ? "block" : "none" }}
            >
              <Cart products={products} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
