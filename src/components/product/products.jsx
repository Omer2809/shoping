import React, { Component } from "react";
import { toast } from "react-toastify";

// import { GlobalContainer, Header, SearchBox } from "../common/Details";
import {
  Pagination,
  getCurrentPage,
  getPagedData,
} from "../../common/pagination";
import ProductsTable from "./productsTable";
import { getProducts, deleteProduct } from "../../services/productService";
import "../../styles/styledTable.css";
import Spinner from "../../common/spinner";
import Header from "../../common/header";
import GlobalContainer from "../../common/globalContainer";
import SearchBox from "../../common/searchBox";

class Products extends Component {
  state = {
    products: [],
    currentPage: 1,
    pageSize: 4,
    numberOfPageButtons: 8,
    searchQuery: "",
    sortColumn: { path: "createdAt", order: "desc" },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: products } = await getProducts();
    this.setState({ products, loading: false });
  }

  handleDelete = async (product) => {
    const originalProducts = this.state.products;
    const products = originalProducts.filter((m) => m._id !== product._id);

    const currentPage = getCurrentPage(
      products,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ products, currentPage });

    try {
      await deleteProduct(product._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This product has already been deleted.");

      this.setState({ products: originalProducts });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      numberOfPageButtons,
      sortColumn,
      searchQuery,
      loading,
    } = this.state;
    const { totalCount, data: products } = getPagedData(
      this.state,
      this.state.products
    );

    return (
      <>
        <GlobalContainer>
          <div className="col">
            <Header
              name={"Product"}
              totalCount={totalCount}
              url={"/products/new"}
            />
            <SearchBox
              value={searchQuery}
              onChange={this.handleSearch}
              placeholder={"Search Name..."}
            />

            <ProductsTable
              products={products}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            {loading && <Spinner />}
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              numberOfButtons={numberOfPageButtons}
              onPageChange={this.handlePageChange}
            />
          </div>
        </GlobalContainer>
      </>
    );
  }
}

export default Products;
