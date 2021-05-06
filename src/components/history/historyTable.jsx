import React, { Component } from "react";
// import Tippy from "@tippy.js/react";
// import "tippy.js/dist/tippy.css";

import auth from "../../services/authService";
import Table from "../../common/tableFolder/table";

class HistoryTable extends Component {
  columns = [
    { path: "createdAt", label: "Added On", date: true },
    {
      path: "products.length",
      label: "Total Items",
    },
    {
      label: "Total Quantity",
      key: "quantity",
      content: (history) => (
        <>
          {history.products.reduce((acc, product) => {
            return acc + parseInt(product.quantity);
          }, 0)}
        </>
      ),
    },
    {
      label: "Total Price",
      key: "total",
      content: (history) => <>Rs. {history.totalPrice}</>,
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (history) => (
      <button
        onClick={() => {
          if (window.confirm("Are you sure to delete this record?")) {
            this.props.onDelete(history);
          }
        }}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user) this.columns.push(this.deleteColumn);
  }

  render() {
    const { history, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={history}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default HistoryTable;
