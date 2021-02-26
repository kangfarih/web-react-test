import React from "react";
import Products from "../components/Products";
import SortOption from "../components/Sort";
import ModalCard from "../components/ModalCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFilter } from "@fortawesome/free-solid-svg-icons";
import IdleTimer from "react-idle-timer";
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

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataProduct: [],
      DataCache: [],
      DataAds: [],
      _page: 1,
      _sort: "",
      _isLoading: false,
      _endCatalogue: false,
      _showModal: false,
      _modalData: {},
    };

    this.onchangeSort = this.onchangeSort.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.AddAds = this.AddAds.bind(this);

    this.idleTimer = null;
    this.handleOnAction = this.handleOnAction.bind(this);
    this.handleOnActive = this.handleOnActive.bind(this);
    this.handleOnIdle = this.handleOnIdle.bind(this);
  }

  // ANCHOR COMPONENT DIDMOUNT
  componentDidMount() {
    this.GetProducts(_TYPE.GET);
    this.scroll();
  }

  componentWillUnmount() {
    clearInterval(checkUpdate);
  }

  // ANCHOR DATA PRODUCT STATE CONTROL
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

  SetDataCache = function (data) {
    let products = [];
    products.push(...data);
    this.setState({ DataCache: products });
  };

  // ANCHOR DATA PRODUCT FUNCTION
  /**
   * Get Data Product from backend
   *
   * @param {Enumerator} type - _TYPE.GET to Replace Product || _TYPE.PUSH to Add Next Products to current product data
   */
  GetProducts = function (type = _TYPE.GET) {
    console.log(`Fetch from ${BaseUrlApi}products?_page=${this.state._page}
    &_limit=${LimitFetch}&_sort=${this.state._sort} : ${type}`);
    if (type != _TYPE.CACHE) {
      this.setState({ _isLoading: true });
    }
    if (type === _TYPE.GET) {
      this.setState({ DataAds: [], DataCache: [], DataProduct: [] });
    }
    fetch(
      `${BaseUrlApi}products?_page=${this.state._page}&_limit=${LimitFetch}&_sort=${this.state._sort}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.length < 1) {
            this.setState({ _endCatalogue: true, _isLoading: false });
            return;
          }
          switch (type) {
            case _TYPE.CACHE:
              this.SetDataCache(result);
              break;
            case _TYPE.PUSH:
              this.PushDataProduct(result);
              break;
            case _TYPE.GET:
            default:
              this.SetDataProduct(result);
              break;
          }
          this.AddAds();
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
    console.log("Get Next Product");
    if (this.state._isLoading || this.state._endCatalogue) {
      return;
    }
    this.setState(
      (state) => {
        return { _page: state._page + 1 };
      },
      () => {
        if (this.state.DataCache.length > 0) {
          this.LoadFromCache();
        } else {
          this.GetProducts(_TYPE.PUSH);
        }
      }
    );
  };

  /**
   * Get Cache data when idle
   */
  GetDataCache = function () {
    if (this.state.DataCache.length > 0) {
      return;
    }
    console.log("Get Data Cache");
    this.setState(
      (state) => {
        return { _page: state._page + 1 };
      },
      () => {
        this.GetProducts(_TYPE.CACHE);
      }
    );
  };

  LoadFromCache = function () {
    if (this.state.DataCache.length == 0) {
      return;
    }
    let _prod = this.state.DataProduct;
    let _cach = this.state.DataCache;
    _prod = _prod.concat(_cach);

    this.setState({
      DataCache: [],
      DataProduct: _prod,
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
    // console.log(e.target.value);
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
    // Set Interval for checking Bottom of window
    // checkUpdate = setInterval(() => {
    //   if (this.state._isLoading || this.state._endCatalogue) {
    //     return;
    //   }
    //   this.checkForUpdate();
    // }, 1000);
  };

  checkForUpdate = function () {
    // console.log("Check Update from Scroll");
    let bottomOfWindow =
      document.documentElement.scrollTop +
        window.innerHeight -
        document.documentElement.offsetHeight >
        -5 &&
      document.documentElement.scrollTop +
        window.innerHeight -
        document.documentElement.offsetHeight <
        5;

    if (bottomOfWindow && !this.onloading) {
      this.GetNextProducts();
    }
  };

  handleOnAction(event) {
    // console.log("user did something", event);
  }

  handleOnActive(event) {
    // console.log("user is active", event);
    // console.log("time remaining", this.idleTimer.getRemainingTime());
  }

  handleOnIdle(event) {
    // console.log("user is idle", event);
    // console.log("last active", this.idleTimer.getLastActiveTime());
    this.GetDataCache();
  }

  // ANCHOR RENDER ( )
  render() {
    return (
      <div className="Main">
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          timeout={1000 * IdleTimeout}
          onActive={this.handleOnActive}
          onIdle={this.handleOnIdle}
          onAction={this.handleOnAction}
          debounce={250}
        />
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
