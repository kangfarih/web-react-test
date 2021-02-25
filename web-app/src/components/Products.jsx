import Card from "./Card";
import { BaseUrlApi, AdsTrigger } from "../pages/MainPage";
import { Fragment } from "react";

export default function Product(param) {
  var loadingProduct = <div></div>;
  var endCatalogue = <div></div>;
  var openmodal = param.toggleModal;

  // ANCHOR END CATALOGUE
  if (param.isEndCatalogue) {
    endCatalogue = (
      <div className="end-catalogue">
        <strong>End of Catalogue</strong>
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
                key={dat.id}
                data={dat}
                openmodal={openmodal}
                ads={param.ads[idx]}
              />
            );
          } else {
            return <Card key={dat.id} data={dat} openmodal={openmodal} />;
          }
        })}
      </article>
      <LoadingProduct
        isLoading={param.isLoading}
        type={param.data.length == 0 ? "empty" : ""}
      />
      {endCatalogue}
    </Fragment>
  );
}

// ANCHOR ON LOADING
function LoadingProduct(param) {
  return (
    <div
      className={`loading ${param.isLoading ? "show" : ""} ${
        param.type == "empty" ? "full" : ""
      }`}
    >
      <strong>Loading</strong>
    </div>
  );
}
