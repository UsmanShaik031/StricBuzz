
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import LiveCommentary from './components/LiveCommentary';
import ProfileUpload from './components/ProfileUpload';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Scoreboard from './components/Scoreboard';
import Squads from './components/Squads';
import PointsTable from './components/PointsTable';

const App = () => {
  return (
    <>
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
