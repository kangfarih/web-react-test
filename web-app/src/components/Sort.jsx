const _OPTION = {
  DEFAULT: "default",
  PRICE: "price",
  SIZE: "size",
  ID: "id",
};

export default function SortOption(param) {
  let list_option = [];
  for (var k in _OPTION) list_option.push(k);
  return (
    <select onChange={param.onChangeFunc}>
      {list_option.map((odat, key) => {
        return (
          <option key={key} value={_OPTION[odat]}>
            {odat}
          </option>
        );
      })}
    </select>
  );
};
