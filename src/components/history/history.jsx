import React, { Component } from "react";
import { toast } from "react-toastify";

// import { GlobalContainer, Header, SearchBox } from "../common/Details";
import {
  Pagination,
  getCurrentPage,
  getPagedData,
} from "../../common/pagination";
import HistoryTable from "./historyTable";
import {
  deleteHistory,
  getProductHistory,
} from "../../services/historyService";
import "../../styles/styledTable.css";
import Spinner from "../../common/spinner";
import Header from "../../common/header";
import GlobalContainer from "../../common/globalContainer";
import SearchBox from "../../common/searchBox";

class History extends Component {
  state = {
    historys: [],
    currentPage: 1,
    pageSize: 4,
    numberOfPageButtons: 8,
    dateSearchQuery: "",
    sortColumn: { path: "createdAt", order: "desc" },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: historys } = await getProductHistory();
    console.log(historys);
    this.setState({ historys, loading: false });
  }

  handleDelete = async (history) => {
    const originalHistorys = this.state.historys;
    const historys = originalHistorys.filter((m) => m._id !== history._id);

    const currentPage = getCurrentPage(
      historys,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ historys, currentPage });

    try {
      await deleteHistory(history._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This history has already been deleted.");

      this.setState({ historys: originalHistorys });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ dateSearchQuery: query, currentPage: 1 });
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
      dateSearchQuery,
      loading,
    } = this.state;
    const { totalCount, data: historys } = getPagedData(
      this.state,
      this.state.historys
    );

    return (
      <>
        <GlobalContainer>
          <div className="col">
            <Header
              name={"History"}
              totalCount={totalCount}
              // url={"/products/new"}
              donotAdd
            />
            <SearchBox
              value={dateSearchQuery}
              onChange={this.handleSearch}
              placeholder={"Search By Date..."}
            />

            <HistoryTable
              history={historys}
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

export default History;
