import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { alertError } from "../lib/alerts";

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

// Component to center map on user location updates
function MapUpdater({ position }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, 15);
    }
  }, [position, map]);
  
  return null;
}

function hitungJarak(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function FaskesTerdekat() {
  const [userPosition, setUserPosition] = useState(null);
  const [faskesList, setFaskesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);

  // Geolocation options for higher accuracy
  const geoOptions = {
    enableHighAccuracy: true,
    timeout: 10000,      // 10 seconds
    maximumAge: 0        // Always get fresh location
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Browser Anda tidak mendukung geolocation");
      setIsLoading(false);
      alertError("Geolocation tidak didukung browser ini");
      return;
    }
    
    // Clear any previous errors
    setLocationError(null);
    setIsLoading(true);

    // Try to get location with high accuracy
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const userCoords = [pos.coords.latitude, pos.coords.longitude];
        setUserPosition(userCoords);
        setIsLoading(false);
        console.log("Akurasi lokasi: ±", pos.coords.accuracy, "meter");
      },
      (err) => {
        setLocationError(`Error: ${err.message}`);
        setIsLoading(false);
        
        let errorMsg;
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMsg = "Akses lokasi ditolak. Mohon izinkan akses lokasi di browser Anda";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMsg = "Informasi lokasi tidak tersedia. Coba refresh halaman";
            break;
          case err.TIMEOUT:
            errorMsg = "Waktu permintaan lokasi habis. Coba lagi";
            break;
          default:
            errorMsg = `Gagal mendapatkan lokasi: ${err.message}`;
        }
        alertError(errorMsg);
      },
      geoOptions
    );
    
    // Cleanup: stop watching position when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    if (!userPosition) return;

    setIsLoading(true);
    const [lat, lng] = userPosition;
    
    // Increased search radius to 3000 meters (3km)
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
          const jarak = hitungJarak(lat, lng, userPosition[0], userPosition[1]);
          return {
            id: el.id,
            name: el.tags?.name || "Faskes tanpa nama",
            address: el.tags?.address || el.tags?.["addr:full"] || "-",
            type: el.tags?.amenity === "hospital" ? "Rumah Sakit" : "Klinik",
            lat,
            lng,
            jarak: jarak.toFixed(2), // km
          };
        });

        // Urutkan berdasarkan jarak terdekat
        list.sort((a, b) => a.jarak - b.jarak);
        setFaskesList(list);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faskes data:", error);
        alertError("Gagal mengambil data faskes");
        setIsLoading(false);
      });
  }, [userPosition]);

  // Loading state
  if (isLoading && !userPosition) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600">Mendapatkan lokasi Anda...</p>
        <p className="text-sm text-gray-500 mt-2">Pastikan GPS aktif dan izin lokasi diberikan</p>
      </div>
    );
  }

  // Error state
  if (locationError && !userPosition) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h3 className="text-lg font-medium text-red-800">Gagal mendapatkan lokasi</h3>
        <p className="mt-2 text-sm text-red-700">{locationError}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1">Fasilitas Kesehatan Terdekat</h2>
        <p className="text-sm text-gray-600">
          Menampilkan faskes dalam jarak sekitar 1 km dari lokasi Anda
        </p>
      </div>

      <div 
        style={{ height: "350px", width: "100%" }}
        className="border rounded-lg overflow-hidden shadow-sm mb-4"
      >
        {userPosition && (
          <MapContainer
            center={userPosition}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
          >
            <ResizeMap />
            <MapUpdater position={userPosition} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Marker lokasi user */}
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                <strong>Lokasi Anda</strong>
              </Popup>
            </Marker>
            
            {/* Marker faskes */}
            {faskesList.map((faskes) => (
              <Marker
                key={faskes.id}
                position={[faskes.lat, faskes.lng]}
                icon={faskesIcon}
              >
                <Popup>
                  <div>
                    <strong>{faskes.name}</strong>
                    <p>{faskes.type}</p>
                    <p>Jarak: {faskes.jarak} km</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* List Faskes */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-3">Daftar Faskes Terdekat</h3>
        
        {isLoading && userPosition ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
            <span>Mencari faskes terdekat...</span>
          </div>
        ) : (
          <ul className="space-y-3">
            {faskesList.length === 0 && (
              <li className="p-4 bg-gray-50 rounded-md text-center">
                Tidak ada faskes ditemukan dalam radius 1 km.
              </li>
            )}
            
            {faskesList.map((faskes) => (
              <li 
                key={faskes.id} 
                className="p-3 border rounded-md shadow-sm hover:bg-gray-50 transition-colors"
              >
                <div className="font-semibold text-blue-700">{faskes.name}</div>
                <div className="text-sm mt-1">
                  <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs mr-2">
                    {faskes.type}
                  </span>
                  <span className="text-gray-700">
                    Jarak: {faskes.jarak} km
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
