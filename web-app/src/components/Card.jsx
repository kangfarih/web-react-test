export default function Card(param) {
  // let keys = [];
  // for (var k in param.data) keys.push(k);
  let dat = param.data;
  return (
    <article className="card">
      {/* <div style={{ fontSize: dat.size + "px" }}>{dat.face}</div> */}
      <div style={{ fontSize: 2 + "rem" }}>{dat.face}</div>
      <div>price: ${dat.price / 100}</div>
      <div>size: {dat.size}</div>
      {/* <div>id: {dat.id}</div> */}
      <div>{FormatDate(dat.date)}</div>
    </article>
  );
}

function FormatDate(date) {
  var seconds = Math.floor((new Date(Date.now()) - new Date(date)) / 1000);

  let interval = 604800; //60sec * 60minutes * 24hours * 7days || 1 week
  if (seconds > interval) {
    let dateString = new Date(date).toDateString();
    return dateString;
  }
  interval = seconds / 86400; //60sec * 60minutes * 24hours || 1 days
  if (interval > 1 && interval < 2) {
    return " Yesterday";
  }
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600; // 1 hour
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60; // 1 minutes
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
