import { Icon } from "leaflet";

const IconLocation = (url) => {
  return new Icon({
    iconUrl: url,
    iconSize: [35, 35]
  });
}

export default IconLocation



// export const IconLocation = new Icon({
//   iconUrl: "./icons/marker_alert.svg",
//   iconSize: [35, 35]
// });