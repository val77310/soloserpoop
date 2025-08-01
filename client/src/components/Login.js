import { useState, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(Auth);
  const nav = useNavigate();

  async function send(path) {
    const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/auth/${path}`, { username, password });
    setUser({ username: data.username, token: data.token });
    nav('/');
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Poop Map Login / Register</h2>
      <input placeholder="username" value={username} onChange={e => setUsername(e.target.value)} /><br />
      <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={() => send('login')}>Log In</button>
      <button onClick={() => send('register')}>Sign Up</button>
    </div>
  );
}
