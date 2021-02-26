import Card, { CardLoading } from "./Card";
import { BaseUrlApi, AdsTrigger } from "../pages/MainPage";
import { Fragment, Suspense } from "react";

export default function Product(param) {
  var endCatalogue = <div></div>;
  var openmodal = param.toggleModal;
  var loadingCard = [];

  for (let i = 0; i < 12; i++) {
    loadingCard.push(<CardLoading key={"loading" + i} />);
  }

  // ANCHOR END CATALOGUE
  if (param.isEndCatalogue) {
    endCatalogue = (
      <div className="end-catalogue">
        <span>End of Catalogue</span>
      </div>
    );
  }

  return (
    <Fragment>
      <article className="products">
        {param.data.map((dat, key) => {
          let withAds = (key + 1) % AdsTrigger === 0;
          if (withAds) {
            let idx = Math.floor(key / AdsTrigger);
            return (
              <Card
                key={key}
                data={dat}
                openmodal={openmodal}
                ads={param.ads[idx]}
              />
            );
          } else {
            return <Card key={dat.id} data={dat} openmodal={openmodal} />;
          }
        })}
        {param.isLoading
          ? loadingCard.map((dat, key) => {
              return dat;
            })
          : null}
        <AdsLoading data={param} loadCard={loadingCard[0]} />
      </article>
      <article className="loading-box">
        {/* <LoadingProduct
          isLoading={param.isLoading}
          type={param.data.length == 0 ? "empty" : ""}
        /> */}
        {endCatalogue}
      </article>
    </Fragment>
  );
}

// ANCHOR ADS LOADING SKELETON
function AdsLoading(param) {
  let dat = param.data.data;
  let loadCard = param.loadCard;
  let prevAds = Math.floor(dat.length / AdsTrigger);
  let withAds = prevAds != Math.floor((dat.length + 12) / AdsTrigger);
  console.log(`dat:${dat.length} : ${prevAds} ${Math.floor((dat.length + 12) / AdsTrigger)}`);

  if (withAds && param.data.isLoading) {
    return loadCard;
  } else {
    return null;
  }
}

// ANCHOR ON LOADING
function LoadingProduct(param) {
  return (
    <div
      className={`loading ${param.isLoading ? "show" : ""} ${
        param.type == "empty" ? "full" : ""
      }`}
    >
      <div className="loadingText">
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </div>
    </div>
  );
}
