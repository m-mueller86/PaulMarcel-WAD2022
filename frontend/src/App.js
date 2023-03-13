import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthContext from './components/Auth/AuthContext';

import Login from './pages/Login';
import Main from './pages/Main';

function App() {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/main" exact element={<Main />} replace />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
