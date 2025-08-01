import { useState, useContext } from 'react';
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import { Auth } from '../contexts/AuthContext';

export default function AddPoopForm({ position, onDone }) {
  const [desc, setDesc] = useState('');
  const { user } = useContext(Auth);

  async function submit() {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/poops`,
      { lat: position.lat, lng: position.lng, description: desc },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    onDone();
    window.location.reload(); // simplest cache-bust
  }

  return (
    <Marker position={position}>
      <Popup>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} />
        <br />
        <button onClick={submit}>💩 Drop it</button>
        <button onClick={onDone}>Cancel</button>
      </Popup>
    </Marker>
  );
}
