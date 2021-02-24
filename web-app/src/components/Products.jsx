import Card from "./Card";

export default function Product(param) {
  var loadingProduct = <div></div>;
  
  if (param.isLoading) {
    loadingProduct = (
      <div className="loading">
        <strong>Loading</strong>
      </div>
    );
  }
  return (
    <article>
      <h5>ASCII FACE</h5>
      {param.data.map((dat, key) => {
        return <Card key={key} data={dat} />;
      })}
      {loadingProduct}
    </article>
  );
}
