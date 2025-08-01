import { Routes, Route, Navigate } from 'react-router-dom';
import MapView from './components/MapView';
import Login from './components/Login';
import { useContext } from 'react';
import { Auth } from './contexts/AuthContext';

export default function App() {
  const { user } = useContext(Auth);
  return (
    <Routes>
      <Route path="/" element={<MapView />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
}
