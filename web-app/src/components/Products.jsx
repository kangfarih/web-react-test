import React, { useState } from "react";
import Card from "./Card";
import { BaseUrlApi } from "../pages/MainPage";

export default function Product(param) {
  const [adsList, setAdsList] = useState([]);

  var loadingProduct = <div></div>;
  var endCatalogue = <div></div>;
  var openmodal = param.toggleModal;

  var addAds = function () {
    let urlads = `${BaseUrlApi}ads/?r=${Math.floor(Math.random() * 1000)}`;
    setAdsList(adsList.push[urlads]);
  };
  

  // ANCHOR END CATALOGUE
  if (param.isEndCatalogue) {
    endCatalogue = (
      <div className="end-catalogue">
        <strong>End of Catalogue</strong>
      </div>
    );
  }

  // ANCHOR ON LOADING
  if (param.isLoading) {
    loadingProduct = (
      <div className="loading">
        <strong>Loading</strong>
      </div>
    );
  }

  return (
    <article className="products">
      {param.data.map((dat, key) => {
        let withAds = (key + 1) % 20 === 0;
        if (withAds) {
          return (
            <Card key={dat.id} data={dat} openmodal={openmodal} ads={true} />
          );
        } else {
          return <Card key={dat.id} data={dat} openmodal={openmodal} />;
        }
      })}
      {loadingProduct}
      {endCatalogue}
    </article>
  );
}
