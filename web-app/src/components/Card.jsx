import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

import { CardDate } from "../utilities/DateFormator";
import { BaseUrlApi } from "../pages/MainPage";

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
          <span className="face" id={`span-${dat.id}`}>{dat.face}</span>
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
