import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function ListingMap({
  lat,
  long,
  height = "380px",
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border"
      style={{ height }}
    >
      <MapContainer
        center={[lat, long]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, long]}>
          <Popup>Exact location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
