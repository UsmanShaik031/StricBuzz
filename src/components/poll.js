import React, { useEffect, useState, useCallback } from 'react';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
} from '@mui/material';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import BoltRoundedIcon from '@mui/icons-material/BoltRounded';
import Navbar from './Navbar';
import Footer from './Footer';

const Poll = () => {
  const [votes, setVotes] = useState({ yes: 0, no: 0 });
  const [voted, setVoted] = useState(() => localStorage.getItem('voted'));
  const [teamVotes, setTeamVotes] = useState({ fire: 0, storm: 0 });
  const [votedTeam, setVotedTeam] = useState(() => localStorage.getItem('teamVoted'));
  const [loading, setLoading] = useState(true);

  const pollDocRef = doc(db, 'matches/matched/cricketToday', 'UndDKhRt8WUAzLCv7IzY');
  const teamDocRef = doc(db, 'matches/matched/teamPrediction', 'FireVsStorm');

  // ✅ Memoize reset functions
  const handleClearPoll = useCallback(async (autoReset = false) => {
    try {
      await updateDoc(pollDocRef, { yes: 0, no: 0 });
      setVotes({ yes: 0, no: 0 });

      if (!autoReset) {
        setVoted(null);
        localStorage.removeItem('voted');
      }
    } catch (error) {
      console.error('Error clearing cricket poll:', error);
    }
  }, [pollDocRef]);

  const handleClearTeamPoll = useCallback(async (autoReset = false) => {
    try {
      await updateDoc(teamDocRef, { fire: 0, storm: 0 });
      setTeamVotes({ fire: 0, storm: 0 });

      if (!autoReset) {
        setVotedTeam(null);
        localStorage.removeItem('teamVoted');
      }
    } catch (error) {
      console.error('Error clearing team prediction:', error);
    }
  }, [teamDocRef]);

  // ✅ Reset daily
  useEffect(() => {
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const lastReset = localStorage.getItem('lastPollReset');

    if (!lastReset || lastReset !== todayStr) {
      handleClearPoll(true);
      handleClearTeamPoll(true);
      localStorage.setItem('lastPollReset', todayStr);
    }
  }, [handleClearPoll, handleClearTeamPoll]);

  // ✅ Fetch Firestore data
  useEffect(() => {
    const unsubPoll = onSnapshot(pollDocRef, (snap) => {
      if (snap.exists()) {
        setVotes(snap.data());
        setLoading(false);
      }
    });

    const unsubTeam = onSnapshot(teamDocRef, (snap) => {
      if (snap.exists()) {
        setTeamVotes(snap.data());
      }
    });

    return () => {
      unsubPoll();
      unsubTeam();
    };
  }, [pollDocRef, teamDocRef]);

  // Voting functions (unchanged)
  const handleVote = async (type) => {
    if (voted === type) return;

    const updates = {};
    if (voted) updates[voted] = Math.max((votes[voted] || 1) - 1, 0);
    updates[type] = (votes[type] || 0) + 1;

    try {
      await updateDoc(pollDocRef, updates);
      setVoted(type);
      localStorage.setItem('voted', type);
    } catch (error) {
      console.error('Error updating vote:', error);
    }
  };

  const handleTeamVote = async (team) => {
    if (votedTeam === team) return;

    const updates = {};
    if (votedTeam) updates[votedTeam] = Math.max((teamVotes[votedTeam] || 1) - 1, 0);
    updates[team] = (teamVotes[team] || 0) + 1;

    try {
      await updateDoc(teamDocRef, updates);
      setVotedTeam(team);
      localStorage.setItem('teamVoted', team);
    } catch (error) {
      console.error('Error updating team vote:', error);
    }
  };

  if (loading) return <Typography textAlign="center">Loading poll...</Typography>;

  return (
 <div>
  <Navbar/>
     <Box
      sx={{
        mt:'80px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        mb:2
      }}
    >
      <Card
  sx={{
    maxWidth: 420,
    width: '100%',
    p: 3,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative', // required for absolute image
  }}
>
<Box
  display="flex"
  alignItems="center"
  justifyContent="space-between"
  sx={{
    width: '100%',
    mb: 2,
     // light yellow highlight
    px: 2,
    py: 1,
    borderRadius: 2,
    position: 'relative',
  }}
>
  <Typography variant="h6" component="div" fontWeight="bold" color="text.primary" mt={0.5} ml={6} style={{mt:12}}>
    <strong>I can see you</strong>
  </Typography>

  <Box
    component="img"
    src="/assets/eyes.gif"
    alt="Top Right GIF"
    ml={-7}
    sx={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      marginLeft:'-60px',
      marginRight:'50px',
      // marginTop:'5px'
    }}
  />
</Box>



        <CardContent sx={{ width: '100%' }}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {/* Cricket Poll */}
            <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
              🏏 Cricket Poll
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Do you want to play cricket today?
            </Typography>

            <Stack spacing={2} width="100%" alignItems="center">
              <Button
                
                variant={voted === 'yes' ? 'contained' : 'outlined'}
                color="success"
                onClick={() => handleVote('yes')}
                startIcon={<ThumbUpAltRoundedIcon />}
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.3, borderRadius: 10, width:'180px' }}
              >
                Yes
              </Button>
              <Typography variant="body2" color="green">
                {votes.yes} {votes.yes === 1 ? 'person has' : 'people have'} voted Yes
              </Typography>

              <Button
                
                variant={voted === 'no' ? 'contained' : 'outlined'}
                color="error"
                onClick={() => handleVote('no')}
                startIcon={<ThumbDownAltRoundedIcon />}
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.3, borderRadius: 10, width:'180px'  }}
              >
                No
              </Button>
              <Typography variant="body2" color="error">
                {votes.no} {votes.no === 1 ? 'person has' : 'people have'} voted No
              </Typography>
            </Stack>

            <Box mt={3}>
              <IconButton
                color="warning"
                onClick={() => handleClearPoll(false)}
                title="Clear Poll"
                sx={{ border: '1px solid #ffa726', borderRadius: 2, p: 1.2 }}
              >
                <RestartAltRoundedIcon />
              </IconButton>
            </Box>

            {/* Team Prediction Poll */}
            <Typography variant="h6" fontWeight="bold" color="secondary" mt={5}>
              🔮 Predict the Winner
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Who will win today?
            </Typography>

            <Stack spacing={2} width="100%" alignItems="center">
              <Button
               
                variant={votedTeam === 'fire' ? 'contained' : 'outlined'}
                color="warning"
                onClick={() => handleTeamVote('fire')}
                startIcon={<WhatshotRoundedIcon />}
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.3, borderRadius: 10 , width:'180px' }}
              >
                Fire
              </Button>
              <Typography variant="body2" color="orange">
                {teamVotes.fire} {teamVotes.fire === 1 ? 'vote' : 'votes'} for Fire
              </Typography>

              <Button
                fullWidth
                variant={votedTeam === 'storm' ? 'contained' : 'outlined'}
                color="info"
                onClick={() => handleTeamVote('storm')}
                startIcon={<BoltRoundedIcon />}
                sx={{ textTransform: 'none', fontWeight: 600, py: 1.3, borderRadius: 10 , width:'180px' }}
              >
                Storm
              </Button>
              <Typography variant="body2" color="blue">
                {teamVotes.storm} {teamVotes.storm === 1 ? 'vote' : 'votes'} for Storm
              </Typography>
            </Stack>

            <Box mt={3}>
              <IconButton
                color="secondary"
                onClick={() => handleClearTeamPoll(false)}
                title="Clear Prediction"
                sx={{ border: '1px solid #7e57c2', borderRadius: 2, p: 1.2 }}
              >
                <RestartAltRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
    <Footer/>
 </div>
  );
};

export default Poll;
