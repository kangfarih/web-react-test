import React from "react";
import Products from "../components/Products";
import SortOption from "../components/Sort";
import ModalCard from "../components/ModalCard";

const BaseUrlApi = "http://localhost:3000/api/";
const _TYPE = {
  GET: "get",
  PUSH: "push",
};

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataProduct: [],
      _page: 1,
      _limit: 12,
      _sort: "",
      _isLoading: false,
      _endCatalogue: false,
      _showModal: false,
      _modalData: {},
    };

    this.clickUpdate = this.clickUpdate.bind(this);
    this.onchangeSort = this.onchangeSort.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.GetProducts(_TYPE.GET);
    this.scroll();
  }

  componentWillUnmount() {}

  // ANCHOR STATE UTILITY
  /**
   * **Replace** DataProduct Array with new data
   * @param {Array} data - Array of product data
   */
  SetDataProduct = function (data) {
    let products = [];
    products.push(...data);
    this.setState({ DataProduct: products });
  };

  /**
   * **Push** DataProduct Array with new data
   * @param {Array} data - Array of product data
   */
  PushDataProduct = function (data) {
    let products = [...this.state.DataProduct];
    products.push(...data);
    this.setState({ DataProduct: products });
  };

  // ANCHOR MAIN PAGE FUNCTION
  /**
   * Get Data Product from backend
   *
   * @param {Enumerator} type - _TYPE.GET to Replace Product || _TYPE.PUSH to Add Next Products to current product data
   */
  GetProducts = function (type = _TYPE.GET) {
    console.log(`Fetch from ${BaseUrlApi}products?_page=${this.state._page}
    &_limit=${this.state._limit}&_sort=${this.state._sort}`);
    this.setState({ _isLoading: true });
    if (type === _TYPE.GET) {
      this.setState({ DataProduct: [] });
    }
    fetch(
      `${BaseUrlApi}products?_page=${this.state._page}&_limit=${this.state._limit}&_sort=${this.state._sort}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length < 1) {
            this.setState({ _endCatalogue: true, _isLoading: false });
            return;
          }
          switch (type) {
            case _TYPE.PUSH:
              this.PushDataProduct(result);
              break;
            case _TYPE.GET:
            default:
              this.SetDataProduct(result);
              break;
          }
          this.setState({ _isLoading: false });
        },
        (error) => {
          console.error(error);
        }
      );
  };

  /**
   * Load Next Data
   */
  GetNextProducts = function () {
    if (this.state._isLoading || this.state._endCatalogue) {
      return;
    }
    this.setState(
      (state) => {
        return { _page: state._page + 1 };
      },
      () => {
        this.GetProducts(_TYPE.PUSH);
      }
    );
  };

  // ANCHOR EVENT HANDLER
  /**
   * Event Handler for button update
   */
  clickUpdate = function (e) {
    e.preventDefault();
    if (this.state._isLoading) {
      return;
    }
    this.GetNextProducts();
  };

  /**
   * Event Handler for Changing Sort Select Option
   */
  onchangeSort = function (e) {
    e.preventDefault();
    console.log(e.target.value);
    this.setState(
      (state) => {
        return { _sort: e.target.value };
      },
      () => {
        this.GetProducts(_TYPE.GET);
      }
    );
  };

  /**
   *
   * @param {Object} data - Object Data Product
   * @param {boolean} display - True / False
   */
  toggleModal = function (data, display = true) {
    this.setState({
      _showModal: display,
      _modalData: data,
    });
  };

  scroll() {
    window.onscroll = () => {
      // console.log('scrolling')
      let bottomOfWindow =
        document.documentElement.scrollTop +
          window.innerHeight -
          document.documentElement.offsetHeight >
          -1 &&
        document.documentElement.scrollTop +
          window.innerHeight -
          document.documentElement.offsetHeight <
          1;

      if (bottomOfWindow && !this.onloading) {
        this.GetNextProducts();
      }
    };
  }

  // ANCHOR RENDER
  render() {
    return (
      <div className="Main">
        <section className="filter">
          <SortOption onChangeFunc={this.onchangeSort} />
        </section>
        <Products
          data={this.state.DataProduct}
          isLoading={this.state._isLoading}
          isEndCatalogue={this.state._endCatalogue}
          toggleModal={this.toggleModal}
        />
        <ModalCard
          show={this.state._showModal}
          toggleModal={this.toggleModal}
          data={this.state.DataProduct.length > 1 ? this.state._modalData : ""}
        />
        {/* <button onClick={this.clickUpdate}>Update</button> */}
      </div>
    );
  }
}

export default MainPage;
