import { Routes, Route, Navigate } from 'react-router-dom'; // ❌ remove BrowserRouter
import { AuthProvider, useAuth } from './components/AuthContext';

import Home from './Home';
import LiveCommentary from './components/LiveCommentary';
import ProfileUpload from './components/ProfileUpload';
import MatchScore from './components/MatchScore';
import UpdateMatchScore from './components/UpdateMatchScore';
import Scoreboard from './components/Scoreboard';
import Squads from './components/Squads';
import PointsTable from './components/PointsTable';
import UserLogin from './components/UserLogin';
import LoadingScreen from './components/LoadingScreen';
import Snaps from './components/Snaps';
import Poll from './components/poll';
import Game from './components/Game';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  return user ? children : <Navigate to="/userlogin" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/home" />} />
    <Route path="/userlogin" element={<UserLogin />} />

    <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/poll" element={<ProtectedRoute><Poll /></ProtectedRoute>} />
    <Route path="/game" element={<ProtectedRoute><Game /></ProtectedRoute>} />
    <Route path="/snaps" element={<ProtectedRoute><Snaps /></ProtectedRoute>} />
    <Route path="/commentary" element={<ProtectedRoute><LiveCommentary /></ProtectedRoute>} />
    <Route path="/profile-upload" element={<ProtectedRoute><ProfileUpload /></ProtectedRoute>} />
    <Route path="/matchscore" element={<ProtectedRoute><MatchScore /></ProtectedRoute>} />
    <Route path="/updatematchscore" element={<ProtectedRoute><UpdateMatchScore /></ProtectedRoute>} />
    <Route path="/scoreboard" element={<ProtectedRoute><Scoreboard /></ProtectedRoute>} />
    <Route path="/squads" element={<ProtectedRoute><Squads /></ProtectedRoute>} />
    <Route path="/pointstable" element={<ProtectedRoute><PointsTable /></ProtectedRoute>} />
  </Routes>
);

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
