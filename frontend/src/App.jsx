import React from 'react';
import MapComponent from './MapComponent.jsx';

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h1 style={{ textAlign: "center" }}>💩 Self-Hosted Poop Map</h1>
      <MapComponent />
    </div>
  );
}