import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../contexts/AuthContext';
import AddPoopForm from './AddPoopForm';

export default function MapView() {
  const { user } = useContext(Auth);
  const [poops, setPoops] = useState([]);
  const [newPos, setNewPos] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/poops`).then(r => setPoops(r.data));
  }, []);

  function ClickHandler() {
    useMapEvents({
      click(e) {
        if (user) setNewPos(e.latlng);
      }
    });
    return null;
  }

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {poops.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <strong>{p.username}</strong><br />
            {p.description || 'No description'}<br />
            {new Date(p.created_at).toLocaleString()}
          </Popup>
        </Marker>
      ))}
      {newPos && <AddPoopForm position={newPos} onDone={() => setNewPos(null)} />}
      <ClickHandler />
    </MapContainer>
  );
}
