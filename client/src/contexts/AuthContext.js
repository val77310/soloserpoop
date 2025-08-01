import { createContext, useState, useEffect } from 'react';
export const Auth = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('poopUser')) || null
  );

  useEffect(() => {
    localStorage.setItem('poopUser', JSON.stringify(user));
  }, [user]);

  return <Auth.Provider value={{ user, setUser }}>{children}</Auth.Provider>;
}
