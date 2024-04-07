import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import the LoginPage component
import Home from './Home';
import Create from './Create'; // Import the Create component
import Existing from './Existing'; // Import the Existing component
import Issued from './Issued';
import Pending from './Pending';
import Review from './Review';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic here
    // For simplicity, let's just set isLoggedIn to true for any input
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Route to show the login page */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route path="/create" element={<Create />} />
        <Route path="/existing" element={<Existing />} />
        <Route path="/issued" element={<Issued />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
