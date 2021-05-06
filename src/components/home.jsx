import React, { useEffect, useState } from "react";

import SearchBox from "../common/searchBox";
import Spinner from "../common/spinner";
import Product from "./product";

import { getProducts } from "../services/productService";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: products } = await getProducts();
      setLoading(false);
      setProducts(products);
    }
    fetchData();
  }, []);

  const canShow = (product, query) => {
    return (
      query === "" ||
      product?.barcode?.startsWith(query) ||
      product?.name?.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  return (
    // <CartProvider>
    <div className="app">
      {/* <Header/> */}
      <SearchBox
        value={searchQuery}
        onChange={(query) => setSearchQuery(query)}
      />
      <main>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner />
          </div>
        )}
        <div className="products-list">
          {/* show products here */}
          {products
            .filter((product) => {
              if (canShow(product, searchQuery)) return product;
            })
            .map((product, index) => (
              <Product key={index} product={product} products={products} />
            ))}
        </div>
      </main>
    </div>
    // </CartProvider>
  );
}

export default Home;
