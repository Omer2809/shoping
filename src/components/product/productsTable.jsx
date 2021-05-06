import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import Table from "../../common/tableFolder/table";
// import noImage from "../../images/noimage.png";

class ProductsTable extends Component {
  columns = [
    {
      key: "img",
      content: (product) => (
        // <ModalButton onClick={() => this.props.onModalShow(product)}>
        <img
          className="imaage"
          src={product.image}
          alt={product.name}
          style={imageStyling}
        />
        // </ModalButton>
      ),
    },
    { path: "name", label: "Name" },

    {
      label: "Price",
      key: "price",
      content: (p) => <>Rs. {p.price}</>,
    },
    { path: "barcode", label: "Barcode" },
    {
      key: "edit",
      content: (product) => (
        <Link to={`/products/${product._id}`} style={{ color: "green" }}>
          <FaEdit />
        </Link>
      ),
    },
    {
      key: "delete",
      content: (product) => (
        <button
          onClick={() => {
            if (window.confirm("Are you sure to delete this record?")) {
              this.props.onDelete(product);
            }
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={products}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

const imageStyling = {
  width: 80,
  height: 100,
  // margin: 10,
  borderRadius: 3,
  border: 3,
  borderColor: "#fff",
  borderStyle: "solid",
};

export default ProductsTable;
