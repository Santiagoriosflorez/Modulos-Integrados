import L from "leaflet";
import marcadorIcon from "./marcador.png";

const Icon = L.icon({
  iconUrl: marcadorIcon,
  iconRetinaUrl: marcadorIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

export default Icon;