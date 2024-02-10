import React from "react";
import { Marker } from "react-leaflet";
import Icon from "./icon";

function Markers (props) {
  const {places} = props;
  const markers = places.map((places, i) => (
    <Marker key={i} position={places.geometry} icon={Icon} />
  ));
  return markers;
}

export default Markers;