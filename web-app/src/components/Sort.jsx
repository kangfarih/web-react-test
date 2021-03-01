import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
const _OPTION = {
  DEFAULT: "",
  PRICE: "price",
  SIZE: "size",
  ID: "id",
};

export default function SortOption(param) {
  let list_option = [];
  for (var k in _OPTION) list_option.push(k);
  return (
    <section className="sort">
      <span className="icon">
        <FontAwesomeIcon icon={faSort} />
      </span>
      <select className="select" onChange={param.onChangeFunc}>
        {list_option.map((odat, key) => {
          return (
            <option key={key} value={_OPTION[odat]}>
              {odat}
            </option>
          );
        })}
      </select>
    </section>
  );
}
