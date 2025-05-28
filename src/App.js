import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';  // your custom Navbar
import Home from './Home';
import LiveCommentary from './components/LiveCommentary';
import ProfileUpload from './components/ProfileUpload';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Scoreboard from './components/Scoreboard';
import Squads from './components/Squads';
import PointsTable from './components/PointsTable';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const coinRef = useRef(null);

  // optional logout handler
  const handleLogout = () => {
    // handle logout, e.g., redirect or clear auth state
    console.log('Logged out');
  };

  return (
    <>
      {/* Navbar always visible */}
      {/* <Navbar
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        heads={heads}
        tails={tails}
        setHeads={setHeads}
        setTails={setTails}
        coinRef={coinRef}
        onLogout={handleLogout}
      /> */}

      {/* Routes show content based on URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commentary" element={<LiveCommentary />} />
        <Route path="/profile-upload" element={<ProfileUpload />} />
        <Route path="/matchscore" element={<MatchScore />} />
        <Route path="/updatematchscore" element={<UpdateMatchScore />} />
        <Route path="/Scoreboard" element={<Scoreboard/>} />
        <Route path="/squads" element={<Squads/>} />
        <Route path="/pointstable" element={<PointsTable/>} />
      </Routes>
    </>
  );
};

export default App;
