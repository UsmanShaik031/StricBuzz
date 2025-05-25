import React, { useState } from 'react';
import './UpdateMatchScore.css'; // Import CSS for styling
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Divider,
} from '@mui/material';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function UpdateMatchScore() {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  const uploadScore = async () => {
    if (!teamA || !teamB || !scoreA || !scoreB) {
      setUploadStatus('Error: Please fill all fields.');
      return;
    }

    try {
      await setDoc(doc(db, 'matches', 'matched'), {
        TeamA: teamA,
        TeamB: teamB,
        ScoreA: scoreA,
        ScoreB: scoreB,
      });
      setUploadStatus('Score uploaded successfully!');
      setTeamA('');
      setTeamB('');
      setScoreA('');
      setScoreB('');
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('Error: Upload failed.');
    }
  };

  return (
    <Box className="update-match-score-container">
      <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 }, borderRadius: 3, backgroundColor: '#fff' }}>
        <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
          Update Match Score
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <div className="input-row">
          {/* Scores */}
           <TextField
            label="Team A"
            fullWidth
            value={teamA}
            onChange={(e) => setTeamA(e.target.value)}
            placeholder="e.g. Team Alpha"
          />
          <TextField
            label="Score A"
            fullWidth
            value={scoreA}
            onChange={(e) => setScoreA(e.target.value)}
            placeholder="e.g. 120/3"
          />
          
        </div>

        <div className="input-row">
          {/* Teams */}
        
          <TextField
            label="Team B"
            fullWidth
            value={teamB}
            onChange={(e) => setTeamB(e.target.value)}
            placeholder="e.g. Team Bravo"
          />
        </div>
 <TextField
            label="Score B"
            fullWidth
            value={scoreB}
            onChange={(e) => setScoreB(e.target.value)}
            placeholder="e.g. 115/7"
          />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 4, fontWeight: 'bold' }}
          onClick={uploadScore}
        >
          Upload Score
        </Button>

        {uploadStatus && (
          <Alert
            severity={uploadStatus.includes('Error') ? 'error' : 'success'}
            sx={{ mt: 3 }}
          >
            {uploadStatus}
          </Alert>
        )}
      </Paper>
    </Box>
  );
}
