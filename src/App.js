import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import SchoolInfo from './components/SchoolInfo';
import ClassRoutine from './components/ClassRoutine';
import SchoolLocation from './components/SchoolLocation';
import Gallery from './components/Gallery';
import NoticeBoard from './components/NoticeBoard';
import Chatroom from './components/Chatroom';
import Login from './components/Login';
import Buttons from './components/Buttons';
import About from './components/About';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <LoadingScreen />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SchoolInfo />
                <Buttons />
                <SchoolLocation />
              </>
            }
          />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/notice" element={<NoticeBoard />} />
          <Route path="/about" element={<About />} />
          <Route path="/routine" element={<ClassRoutine />} />
          <Route 
            path="/chat" 
            element={user ? <Chatroom user={user} /> : <Login onLogin={setUser} />}
          /> {/* Conditionally render Chatroom or Login */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;