import React from "react";
import Products from "../components/Products";
import SortOption from "../components/Sort";
import ModalCard from "../components/ModalCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFilter } from "@fortawesome/free-solid-svg-icons";

export const BaseUrlApi = "http://localhost:3000/api/";
export const AdsTrigger = 20;
const _TYPE = {
  GET: "get",
  PUSH: "push",
  CACHE: "cache",
};
export const LimitFetch = 12;
export const IdleTimeout = 5;

var checkUpdate;
var _page = 0;

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataProduct: [],
      DataCache: [],
      DataAds: [],
      _page: 0,
      _sort: "",
      _showLoading: false,
      _onFetch: false,
      _endCatalogue: false,
      _showModal: false,
      _modalData: {},
    };

    this.onchangeSort = this.onchangeSort.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.AddAds = this.AddAds.bind(this);
  }

  // ANCHOR COMPONENT DIDMOUNT
  componentDidMount() {
    this.GetDataCache(true);
    this.scroll();
    checkUpdate = setInterval(() => {
      this.checkForUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(checkUpdate);
  }

  // ANCHOR DATA PRODUCT FUNCTION
  /**
   * Get Data Product from backend
   *
   * @param {Enumerator} type - _TYPE.GET to Replace Product || _TYPE.PUSH to Add Next Products to current product data
   */
  GetProducts = function (type = _TYPE.CACHE, sortVal, _page) {
    console.log(
      `Fetch from ${BaseUrlApi}products?_page=${this.state._page}&_limit=${LimitFetch}&_sort=${this.state._sort} : ${type}`
    );
    _page = this.state._page;
    fetch(
      `${BaseUrlApi}products?_page=${this.state._page}&_limit=${LimitFetch}&_sort=${this.state._sort}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (sortVal != this.state._sort) {
            return;
          }
          if (result.length < 1) {
            this.setState({ _endCatalogue: true, _showLoading: false });
            return;
          }
          result.map((dat, idx) => {
            dat._page = _page;
            dat._sort = sortVal;
          });

          switch (type) {
            case _TYPE.CACHE:
              this.SetDataCache(result);
              break;
            case _TYPE.PUSH:
              break;
            case _TYPE.GET:
              break;
            default:
              this.SetDataCache(result);
              break;
          }
        },
        (error) => {
          console.error(error);
          this.setState({ _onFetch: false });
        }
      );
  };

  // ANCHOR DATA STATE CONTROL
  /**
   * Get Cache data when idle
   * @param {} showLoader - showing loader or not
   */
  GetDataCache = function (showLoader = false) {
    if (this.state._onFetch) {
      return;
    }
    if (this.state.DataCache.length > 0 || this.state._endCatalogue) {
      return;
    }
    this.setState(
      (state) => {
        return {
          _page: state._page + 1,
          _onFetch: true,
          _showLoading: showLoader,
        };
      },
      () => {
        this.GetProducts(_TYPE.CACHE, this.state._sort);
      }
    );
  };

  /**
   * Set Data to DataChace state
   * @param {*} data - Data Product
   */
  SetDataCache = function (data) {
    let products = this.state.DataCache;
    products.push(...data);
    this.setState({ DataCache: products, _onFetch: false }, () => {
      if (this.state._showLoading) {
        this.LoadFromCache();
      }
    });
  };

  LoadFromCache = function () {
    if (this.state.DataCache.length == 0) {
      if (this.state._onFetch) {
        this.setState({ _showLoading: true });
      } else {
        this.GetDataCache(true);
      }
      return;
    }
    this.setState({ _showLoading: true }, () => {
      let _prod = this.state.DataProduct;
      let _cach = this.state.DataCache;
      _prod = _prod.concat(_cach);

      this.setState(
        {
          DataCache: [],
          DataProduct: _prod,
          _showLoading: false,
        },
        () => {
          this.AddAds();
          this.GetDataCache();
        }
      );
    });
  };

  // ANCHOR ADS GENERATOR
  /**
   *  Add New Ads to list
   */
  AddAds = function () {
    var dataProdLength = this.state.DataProduct.length;
    var adsTrig = AdsTrigger;
    let adsSum = Math.floor(dataProdLength / adsTrig);
    var adsList = this.state.DataAds;
    while (adsList.length < adsSum) {
      let urlads = `${BaseUrlApi}ads/?r=`;

      /** Make ads randomize and don't repeat same ads in a row
       *  Check If ads have same last numbe or not
       *  (last unit of randomize number decide whether ads is same or not)
       */

      var randomUnit = Math.floor(Math.random() * 1000);
      var prevAds = adsList.length > 0 ? adsList[adsList.length - 1] : null;
      if (prevAds) {
        var pLsUnit = prevAds.substr(prevAds.length - 1);
        var rLsUnit = randomUnit
          .toString()
          .substr(randomUnit.toString().length - 1);
        while (pLsUnit == rLsUnit) {
          randomUnit = Math.floor(Math.random() * 1000);
          rLsUnit = randomUnit
            .toString()
            .substr(randomUnit.toString().length - 1);
        }
      }
      urlads = urlads + randomUnit;
      adsList.push(urlads);
      this.setState({ DataAds: adsList });
    }
  };

  // ANCHOR EVENT HANDLER
  /**
   * Event Handler for Changing Sort Select Option
   */
  onchangeSort = function (e) {
    e.preventDefault();
    var sortVal = e.target.value;
    this.setState(
      {
        _onFetch:false,
        _sort: sortVal,
        _page: 0,
        DataCache: [],
        DataProduct: [],
        DataAds: [],
      },
      () => {
        this.GetDataCache(true);
      }
    );
  };

  /**
   * @param {Object} data - Object Data Product
   * @param {boolean} display - True / False
   */
  toggleModal = function (data, display = true) {
    this.setState({
      _showModal: display,
      _modalData: data,
    });
  };

  // ANCHOR SCROLL DETECTING
  /**
   * Detecting for Scrolling Down to the bottom of page
   */
  scroll = function () {
    window.onscroll = () => {
      this.checkForUpdate();
    };
  };

  isAtBottomWindow = function () {
    return (
      document.documentElement.scrollTop +
        window.innerHeight -
        document.documentElement.offsetHeight >
        -5 &&
      document.documentElement.scrollTop +
        window.innerHeight -
        document.documentElement.offsetHeight <
        5
    );
  };

  checkForUpdate = function () {
    if (this.isAtBottomWindow()) {
      this.LoadFromCache();
    }
  };

  // ANCHOR RENDER ( )
  render() {
    return (
      <div className="Main">
        <article className="carousel">
          <h2>ASCII FACE CATALOGUE</h2>
        </article>
        <article className="utilities">
          <section className="category">
            <span className="icon">
              <FontAwesomeIcon icon={faBook} />
            </span>
            <select name="" id="" disabled>
              <option value="Category">Category</option>
            </select>
          </section>
          <section className="filter">
            <span className="icon">
              <FontAwesomeIcon icon={faFilter} />
            </span>
            <select name="" id="" disabled>
              <option value="Filter">Filter</option>
            </select>
          </section>
          <SortOption onChangeFunc={this.onchangeSort} />
        </article>
        <Products
          ads={this.state.DataAds}
          data={this.state.DataProduct}
          isLoading={this.state._showLoading}
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
