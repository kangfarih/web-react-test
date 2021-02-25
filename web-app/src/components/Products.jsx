import Card from "./Card";
import { BaseUrlApi, AdsTrigger } from "../pages/MainPage";

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
        let withAds = (key + 1) % AdsTrigger === 0;
        if (withAds) {
          let idx = Math.floor(key/AdsTrigger);
          return (
            <Card key={dat.id} data={dat} openmodal={openmodal} ads={param.ads[idx]} />
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
