import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    
  }, [])

  return (
    <AuthContext.Provider value={{ setUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };