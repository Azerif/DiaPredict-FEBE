import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom icon lokasi user
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/5216/5216405.png",
  iconSize: [40, 50],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});

// Custom icon faskes (rumah sakit)
const faskesIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/10714/10714002.png",
  iconSize: [28, 35],
  iconAnchor: [17, 45],
  popupAnchor: [0, -40],
});

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

export default function FaskesTerdekat() {
  const [userPosition, setUserPosition] = useState(null);
  const [faskesList, setFaskesList] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung browser ini");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        alert("Gagal mendapatkan lokasi: " + err.message);
      }
    );
  }, []);

  useEffect(() => {
    if (!userPosition) return;

    const [lat, lng] = userPosition;
    const query = `
      [out:json];
      (
        node["amenity"~"hospital|clinic"](around:1000,${lat},${lng});
        way["amenity"~"hospital|clinic"](around:1000,${lat},${lng});
        relation["amenity"~"hospital|clinic"](around:1000,${lat},${lng});
      );
      out center;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
      headers: {
        "Content-Type": "text/plain",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const list = data.elements.map((el) => {
          let lat, lng;
          if (el.type === "node") {
            lat = el.lat;
            lng = el.lon;
          } else if (el.type === "way" || el.type === "relation") {
            lat = el.center.lat;
            lng = el.center.lon;
          }
          return {
            id: el.id,
            name: el.tags?.name || "Faskes tanpa nama",
            lat,
            lng,
          };
        });
        setFaskesList(list);
      })
      .catch(() => alert("Gagal mengambil data faskes"));
  }, [userPosition]);

  if (!userPosition) return <p>Loading lokasi Anda...</p>;

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <MapContainer
        center={userPosition}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <ResizeMap />
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Marker lokasi user */}
        <Marker position={userPosition} icon={userIcon}>
          <Popup>Lokasi Anda</Popup>
        </Marker>
        {/* Marker faskes */}
        {faskesList.map((faskes) => (
          <Marker
            key={faskes.id}
            position={[faskes.lat, faskes.lng]}
            icon={faskesIcon}
          >
            <Popup>{faskes.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
