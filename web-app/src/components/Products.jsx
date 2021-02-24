import Card from "./Card";

export default function Product(param) {
  var loadingProduct = <div></div>;
  var endCatalogue = <div></div>;

  if (param.isEndCatalogue) {
    endCatalogue = (
      <div className="end-catalogue">
        <strong>End of Catalogue</strong>
      </div>
    );
  }

  if (param.isLoading) {
    loadingProduct = (
      <div className="loading">
        <strong>Loading</strong>
      </div>
    );
  }
  return (
    <article className="products">
      <h5>ASCII FACE CATALOGUE</h5>
      {param.data.map((dat, key) => {
        return <Card key={key} data={dat} />;
      })}
      {loadingProduct}
      {endCatalogue}
    </article>
  );
}
