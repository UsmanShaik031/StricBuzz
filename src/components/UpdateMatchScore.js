import React, { useState } from 'react';
import './UpdateMatchScore.css';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function UpdateMatchScore() {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state

  const uploadScore = async () => {
    if (!teamA || !teamB || !scoreA || !scoreB) {
      setErrorModal(true);
      return;
    }

    setLoading(true); // Start loading
    setSuccessModal(true); // Optimistically show success modal

    try {
      await setDoc(doc(db, 'matches', 'matched'), {
        TeamA: teamA,
        TeamB: teamB,
        ScoreA: scoreA,
        ScoreB: scoreB,
      });

      setTeamA('');
      setTeamB('');
      setScoreA('');
      setScoreB('');
    } catch (error) {
      console.error('Upload failed:', error);
      setSuccessModal(false); // Hide success if failed
      alert('Upload failed.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Box className="update-match-score-container" sx={{ display: 'flex', justifyContent: 'center', mt: -5, ml: 3 }}>
      <Paper elevation={3} sx={{ p: 4, boxShadow: 'none', width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" textAlign="center" ml={-2} fontWeight="bold" gutterBottom>
          Update Match Score
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <TextField
          label="Team A"
          value={teamA}
          onChange={(e) => setTeamA(e.target.value)}
          sx={{ mb: 2, width: '250px' }}
          inputProps={{ style: { fontSize: 13, padding: '14px 12px' } }}
          InputLabelProps={{ style: { fontSize: 13 } }}
        />

        <TextField
          label="Enter Score"
          value={scoreA}
          onChange={(e) => setScoreA(e.target.value)}
          sx={{ mb: 2, width: '250px' }}
          inputProps={{ style: { fontSize: 13, padding: '14px 12px' } }}
          InputLabelProps={{ style: { fontSize: 13 } }}
        />

        <TextField
          label="Team B"
          value={teamB}
          onChange={(e) => setTeamB(e.target.value)}
          sx={{ mb: 2, width: '250px' }}
          inputProps={{ style: { fontSize: 13, padding: '14px 12px' } }}
          InputLabelProps={{ style: { fontSize: 13 } }}
        />

        <TextField
          label="Enter Score "
          value={scoreB}
          onChange={(e) => setScoreB(e.target.value)}
          sx={{ mb: 3, width: '250px' }}
          inputProps={{ style: { fontSize: 13, padding: '14px 12px' } }}
          InputLabelProps={{ style: { fontSize: 13 } }}
        />

        <Button
          variant="contained"
          onClick={uploadScore}
          disabled={loading}
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            background: 'linear-gradient(135deg, #1976d2, #004ba0)',
            color: 'white',
            borderRadius: '12px',
            width: '65%',
            marginLeft: '14%',
            py: 1.4,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #004ba0, #002b80)',
            },
          }}
        >
          {loading ? <CircularProgress size={22} sx={{ color: 'white' }} /> : 'Upload Score'}
        </Button>
      </Paper>

      {/* Success Modal */}
  <Dialog sx={{ borderRadius:'30px'}} open={successModal} onClose={() => setSuccessModal(false)} PaperProps={{
    sx: {
      borderRadius: '30px',
      overflow: 'hidden', // ensures rounded corners clip inner content
    },
  }}>
  <DialogContent sx={{ textAlign: 'center', px: 5, pt: 4 ,}}>
    <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'green' }} />
    <Typography variant="h6" mt={2} fontWeight="bold">
      Upload Successful
    </Typography>
    <Typography variant="body2" mt={1}>
      The score has been uploaded successfully!
    </Typography>
  </DialogContent>
  <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
    <Button
      onClick={() => setSuccessModal(false)}
      variant="outlined"
      sx={{
        textTransform: 'none',
        borderRadius: '8px',
        fontWeight: 600,
        px: 3,
        mx: 1,
        color:'red',
        borderColor:'red'
      }}
    >
      Close
    </Button>
    <Button
      onClick={() => window.location.href = '/'}
      variant="contained"
      sx={{
        textTransform: 'none',
        background: 'linear-gradient(135deg, #1976d2, #004ba0)',
        color: 'white',
        fontWeight: 600,
        borderRadius: '8px',
        px: 3,
        mx: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        '&:hover': {
          background: 'linear-gradient(135deg, #004ba0, #002b80)',
        },
      }}
    >
      Go Home
    </Button>
  </DialogActions>
</Dialog>


      {/* Error Modal */}
      <Dialog open={errorModal} onClose={() => setErrorModal(false)} PaperProps={{
    sx: {
      borderRadius: '30px',
      overflow: 'hidden', // ensures rounded corners clip inner content
    },
  }}>
        <DialogContent sx={{ textAlign: 'center', px: 5, pt: 4 }}>
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'red' }} />
          <Typography variant="h6" mt={2} fontWeight="bold">
            Missing Fields
          </Typography>
          <Typography variant="body2" mt={1}>
            Please fill the Team Names and Scores.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={() => setErrorModal(false)}>Okay</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
