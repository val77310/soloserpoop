import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function AddMarker({ onAdd }) {
  useMapEvents({
    click(e) {
      const message = prompt("Message pour ce poop ?");
      if (message !== null) onAdd(e.latlng, message);
    }
  });
  return null;
}

export default function MapComponent() {
  const [poops, setPoops] = useState([]);

  const loadPoops = async () => {
    const res = await axios.get('/poops', { baseURL: 'http://localhost:3000' });
    setPoops(res.data);
  };

  const addPoop = async (latlng, message) => {
    await axios.post('/poops', { lat: latlng.lat, lng: latlng.lng, message }, { baseURL: 'http://localhost:3000' });
    loadPoops();
  };

  useEffect(() => { loadPoops(); }, []);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: "90%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <AddMarker onAdd={addPoop} />
      {poops.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>{p.message || "💩 Poop !"}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}