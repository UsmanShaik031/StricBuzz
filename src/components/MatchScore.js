// src/MatchScore.js
import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

export default function MatchScore() {
  const [matchData, setMatchData] = useState({
    teamA: "",
    teamB: "",
    scoreA: "",
    scoreB: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "matches", "matched"),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
        setMatchData({
  teamA: data.TeamA || "",
  teamB: data.TeamB || "",  // <-- fixed here
  scoreA: data.ScoreA || "",
  scoreB: data.ScoreB || ""
});

        } else {
          setMatchData({ teamA: "", teamB: "", scoreA: "", scoreB: "" });
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching match score:", err);
        setError("Failed to load match data.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 360, mx: "auto", mt: 4 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom align="center">
        Match Score
      </Typography>

      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography variant="subtitle1">{matchData.teamA || "-"}</Typography>
        <Typography variant="subtitle1">vs</Typography>
        <Typography variant="subtitle1">{matchData.teamB || "-"}</Typography>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" color="primary">
          {matchData.scoreA || "-"}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          |
        </Typography>
        <Typography variant="body1" color="secondary">
          {matchData.scoreB || "-"}
        </Typography>
      </Box>
    </Paper>
  );
}
