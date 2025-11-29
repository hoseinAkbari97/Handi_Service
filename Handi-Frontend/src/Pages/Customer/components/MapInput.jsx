import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker({ setMarkerPosition, markerPosition }) {
  useMapEvents({
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return markerPosition ? <Marker position={markerPosition} /> : null;
}

export default function MapInput({ markerPosition, setMarkerPosition }) {
  const center = [35.6892, 51.389];

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "380px",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 1, 
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker
        setMarkerPosition={setMarkerPosition}
        markerPosition={markerPosition}
      />
    </MapContainer>
  );
}