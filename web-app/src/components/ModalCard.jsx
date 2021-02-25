import {CardDate} from "../utilities/DateFormator";

export default function ModalCard(param) {
  let dat = param.data;
  let show = param.show;
  let closemodal = ()=>{
    param.toggleModal({}, false);
  }
  return (
    <div className={`modal-card${show?" show":""}`}>
      <div className="background" onClick={closemodal}></div>
      <div className="box">
        <div className="face-box" style={{ fontSize: dat.size + "px" }}>
          <span>{dat.face}</span>
        </div>
        <div className="detail-box">
          <div className="id">{dat.id}</div>
          <div className="size">{dat.size}px</div>
          <div className="price">${(dat.price / 100).toFixed(2)}</div>
          <div className="date">{CardDate(dat.date)}</div>
        </div>
      </div>
    </div>
  );
}
