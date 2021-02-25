import {CardDate} from "../utilities/DateFormator";

export default function Card(param) {
  let dat = param.data;
  let openmodal =()=>{
    param.openmodal(dat);
  }
  return (
    <article className="card" onClick={openmodal}>
      <div className="face-box" style={{ fontSize: 2 + "rem" }}>
        <span>{dat.face}</span>
      </div>
      <div className="detail-box">
        <div className="id">{dat.id}</div>
        <div className="size">{dat.size}px</div>
        <div className="price">${(dat.price / 100).toFixed(2)}</div>
        <div className="date">{CardDate(dat.date)}</div>
      </div>
    </article>
  );
}
