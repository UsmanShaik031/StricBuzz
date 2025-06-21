import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit
} from "firebase/firestore";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from "@mui/material";

export default function MatchScore() {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "matches"),
      orderBy("timestamp", "desc"),
      limit(1) // get the latest match only
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setMatchData({
            teamA: data.TeamA || "Team A",
            teamB: data.TeamB || "Team B",
            scoreA: data.ScoreA || "0",
            scoreB: data.ScoreB || "0"
          });
        } else {
          setMatchData(null);
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
      <Box display="flex" justifyContent="center" mt={0}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !matchData) {
    return (
      <Typography variant="body1" color="error" align="center" mt={6}>
        {error || "No match data available."}
      </Typography>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        p: 6,
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        ml: "2",
        borderRadius: "none",
        backgroundColor: "transparent",
        boxShadow: "none",
        textAlign: "center"
      }}
    >
      {/* Title with animation */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ mb: 1, marginLeft: "7%" }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          style={{ color: "#a3172e", ml: "6" }}
        >
          ʟɪᴠᴇ sᴄᴏʀᴇ
        </Typography>

        <Box
          component="img"
          src="/assets/Ripple@1x-1.0s-200px-200px.svg"
          alt="Live animation"
          sx={{
            width: 50,
            height: 50,
            animation: "pulse 1.8s infinite ease-in-out"
          }}
        />
      </Stack>

      <TableContainer component={Box}>
        <Table size="medium" aria-label="match score table">
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Team
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" fontWeight="bold">
                  Score
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Typography variant="subtitle1">{matchData.teamA}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" color="primary">
                  {matchData.scoreA}
                </Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center">
                <Typography variant="subtitle1">{matchData.teamB}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" color="primary">
                  {matchData.scoreB}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
