import { Fragment } from "react";
import { CardDate } from "../utilities/DateFormator";

export default function Card(param) {
  let dat = param.data;
  let ads = param.ads;
  let openmodal = () => {
    param.openmodal(dat);
  };
  return (
    <Fragment>
      <article id={dat.id} className="card" onClick={openmodal}>
        <div className="face-box">
          <span
            className="face"
            id={`span-${dat.id}`}
            style={{ fontSize: dat.size + "px" }}
          >
            {dat.face}
          </span>
        </div>
        <div className="detail-box">
          {/* <div className="id">{dat.id}</div> */}
          <div className="size">{dat.size}px</div>
          <div className="price">${(dat.price / 100).toFixed(2)}</div>
          <div className="date">{CardDate(dat.date)}</div>
          {/* <div className="button">
            <button>
              <FontAwesomeIcon icon={faCartPlus} />
            </button>
          </div> */}
        </div>
      </article>

      {ads ? (
        <article className="card">
          <div className="face-box">
            <img className="ad" src={ads} />
          </div>
          <div className="detail-box">
            {/* <div className="id">{dat.id}</div> */}
            <div className="size">Our Sponsor</div>
            {/* <div className="price">$0.01</div> */}
            <div className="date">Ads</div>
          </div>
        </article>
      ) : null}
    </Fragment>
  );
}

export function CardLoading(param) {
  return (
    <Fragment>
      <article id="" className="card">
        <div className="card-load face-box">
        </div>
        <div className="detail-box">
          <div className="card-load size"></div>
          <div className="card-load price"></div>
          <div className="card-load date"></div>
        </div>
      </article>
    </Fragment>
  );
}
