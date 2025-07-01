import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  TextField,
  Avatar,
  Button,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { db } from "./firebase";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { SaveOutlined } from "@mui/icons-material"; // Add at the top
// Player display
const PlayerInfo = ({ name, role, align }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: align === "right" ? "row-reverse" : "row",
      alignItems: "center",
      gap: 1,
      textAlign: align,
    }}
  >
    <Typography variant="body2" fontWeight={600}>
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      ({role})
    </Typography>
  </Box>
);

// Get initial avatar letter
const getInitial = (name) => name?.trim()?.charAt(0)?.toUpperCase() || "?";

// Team Column Component
const SquadColumn = ({
  side,
  players,
  onAdd,
  onRemove,
  teamName,
  onTeamNameChange,
  onSaveTeamName,
}) => {
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [tempTeamName, setTempTeamName] = useState(teamName);

  const isLeft = side === "left";

  useEffect(() => {
    setTempTeamName(teamName);
  }, [teamName]);

  return (
    <Box sx={{ flex: 1, px: 2 }}>
      {/* Team Name Input with Save */}
      <Box
        sx={{
          display: "flex",
          justifyContent: isLeft ? "flex-start" : "flex-end",
          alignItems: "center",
          gap: 1,
          mb: 2,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          value={tempTeamName}
          onChange={(e) => setTempTeamName(e.target.value)}
          sx={{
            width: "20vh",
            borderRadius: "8px",
            "& .MuiInputBase-input": {
              textAlign: isLeft ? "left" : "right",
              fontWeight: 600,
            },
          }}
        />
      <Button
  variant="contained"
  size="small"
  onClick={() => onSaveTeamName(tempTeamName)}
  sx={{
    minWidth: "36px",
    height: "36px",
    padding: 0,
    borderRadius: "8px",
    backgroundColor: "#1976d2",
    color: "#fff",mt:-0.5
  }}
>
  <SaveOutlined fontSize="small" />
</Button>
      </Box>

      {/* Player List */}
      {players.map((pl, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isLeft ? "flex-start" : "flex-end",
              gap: 1.5,
              py: 1,
            }}
          >
            {isLeft ? (
              <>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#3f51b5", color: "#fff" }}>
                  {getInitial(pl.name)}
                </Avatar>
                <PlayerInfo name={pl.name} role={pl.role} align="left" />
                <IconButton size="small" onClick={() => onRemove(index)}>
                  <Delete fontSize="small" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton size="small" onClick={() => onRemove(index)}>
                  <Delete fontSize="small" />
                </IconButton>
                <PlayerInfo name={pl.name} role={pl.role} align="right" />
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#f44336", color: "#fff" }}>
                  {getInitial(pl.name)}
                </Avatar>
              </>
            )}
          </Box>
          {index !== players.length - 1 && <Divider />}
        </Box>
      ))}

      {/* Add Player Form */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 3 }}>
        <Typography variant="subtitle2" fontWeight={600}>
          Add New Player
        </Typography>

        <TextField
          size="small"
          label="Name"
          variant="outlined"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          sx={{ width: "30vh", borderRadius: "10px" }}
        />

        <TextField
          size="small"
          label="Role"
          variant="outlined"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          sx={{ width: "30vh", borderRadius: "10px" }}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => {
            if (newName.trim() && newRole.trim()) {
              onAdd({ name: newName.trim(), role: newRole.trim() });
              setNewName("");
              setNewRole("");
            }
          }}
          sx={{
            width: "160px",
            backgroundColor: "black",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            py: 1,
            boxShadow: 3,
          }}
        >
          Add Player
        </Button>
      </Box>
    </Box>
  );
};

// Main Component
const Squads = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [heads, setHeads] = useState(() => Number(localStorage.getItem("heads")) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem("tails")) || 0);
  const coinRef = useRef(null);

  const [leftPlayers, setLeftPlayers] = useState([]);
  const [rightPlayers, setRightPlayers] = useState([]);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");

  useEffect(() => {
    const docRef = doc(db, "squads", "Squads");

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLeftPlayers(data.left || []);
        setRightPlayers(data.right || []);
        setTeamAName(data.teamAName || "Team A");
        setTeamBName(data.teamBName || "Team B");
      } else {
        console.log("⚠️ Squad document not found.");
      }
    });

    return () => unsubscribe();
  }, []);

  const updateSquad = async (side, newList, customNames = {}) => {
    try {
      const docRef = doc(db, "squads", "Squads");
      const snapshot = await getDoc(docRef);
      const existingData = snapshot.exists()
        ? snapshot.data()
        : { left: [], right: [], teamAName: "Team A", teamBName: "Team B" };

      const updatedData = {
        ...existingData,
        ...customNames,
        [side]: newList,
      };

      await setDoc(docRef, updatedData);
    } catch (error) {
      console.error("❌ Error updating squad:", error.message);
    }
  };

  const handleAdd = (side, player) => {
    const updated = side === "left" ? [...leftPlayers, player] : [...rightPlayers, player];
    updateSquad(side, updated);
  };

  const handleRemove = (side, index) => {
    const updated = [...(side === "left" ? leftPlayers : rightPlayers)];
    updated.splice(index, 1);
    updateSquad(side, updated);
  };

  const handleTeamNameChange = (side, newName) => {
    if (side === "left") {
      setTeamAName(newName);
    } else {
      setTeamBName(newName);
    }
  };

  const handleSaveTeamName = (side, name) => {
    if (side === "left") {
      setTeamAName(name);
      updateSquad("left", leftPlayers, { teamAName: name });
    } else {
      setTeamBName(name);
      updateSquad("right", rightPlayers, { teamBName: name });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    window.location.reload();
  };

  return (
    <Box>
      <Navbar
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        heads={heads}
        tails={tails}
        setHeads={setHeads}
        setTails={setTails}
        coinRef={coinRef}
        onLogout={handleLogout}
      />

      <Box sx={{ mt: 10, px: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={4}>
          Playing XI
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
          <SquadColumn
            side="left"
            players={leftPlayers}
            teamName={teamAName}
            onTeamNameChange={(name) => handleTeamNameChange("left", name)}
            onSaveTeamName={(name) => handleSaveTeamName("left", name)}
            onAdd={(p) => handleAdd("left", p)}
            onRemove={(i) => handleRemove("left", i)}
          />
          <SquadColumn
            side="right"
            players={rightPlayers}
            teamName={teamBName}
            onTeamNameChange={(name) => handleTeamNameChange("right", name)}
            onSaveTeamName={(name) => handleSaveTeamName("right", name)}
            onAdd={(p) => handleAdd("right", p)}
            onRemove={(i) => handleRemove("right", i)}
          />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }} />
      <Footer />
    </Box>
  );
};

export default Squads;
