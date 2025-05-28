import React, { useState, useEffect, useRef,useCallback } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Snackbar,
    Alert,
    Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { db } from "./firebase"; // update the path as needed
import Navbar from "./Navbar";
const PointsTable = () => {
    const [teams, setTeams] = useState([]);
    const [form, setForm] = useState({
        name: "",
        matches: "",
        wins: "",
        losses: "",
        tied: "",
        nr: "",
        points: "",
        nrr: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
    });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const coinRef = useRef(null);
const handleLogout = () => {
  localStorage.removeItem('authenticated'); // Remove persisted auth
  window.location.reload(); // Reload to reflect the logout state (optional)
};

    const teamsRef = collection(db, "pointsTable");

 const fetchTeams = useCallback(async () => {
  setLoading(true);
  try {
    const snapshot = await getDocs(teamsRef);
    const teamsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTeams(teamsList);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
  setLoading(false);
}, [teamsRef]); // teamsRef needs to be in dependencies if it's a variable

useEffect(() => {
  fetchTeams();
}, [fetchTeams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const openDialog = () => {
        setForm({
            name: "",
            matches: "",
            wins: "",
            losses: "",
            tied: "",
            nr: "",
            points: "",
            nrr: "",
        });
        setEditingId(null);
        setDialogOpen(true);
    };

    const closeDialog = () => setDialogOpen(false);

    const isFormValid = () => {
        const { name, matches, wins, losses, tied, nr, points, nrr } = form;
        return (
            name.trim() &&
            matches !== "" &&
            wins !== "" &&
            losses !== "" &&
            tied !== "" &&
            nr !== "" &&
            points !== "" &&
            nrr !== ""
        );
    };

    const addOrUpdateTeam = async () => {
        if (!isFormValid()) {
            setSnackbar({
                open: true,
                message: "Please fill all required fields.",
                severity: "warning",
            });
            return;
        }

        const teamData = {
            name: form.name,
            matches: Number(form.matches),
            wins: Number(form.wins),
            losses: Number(form.losses),
            tied: Number(form.tied),
            nr: Number(form.nr),
            points: Number(form.points),
            nrr: parseFloat(form.nrr),
        };

        setLoading(true);
        try {
            if (editingId) {
                await updateDoc(doc(db, "pointsTable", editingId), teamData);
                setSnackbar({ open: true, message: "Team updated.", severity: "success" });
            } else {
                await addDoc(teamsRef, teamData);
                setSnackbar({ open: true, message: "Team added.", severity: "success" });
            }
            closeDialog();
            fetchTeams();
        } catch (error) {
            console.error("Error saving team:", error);
            setSnackbar({ open: true, message: "Error saving team.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (team) => {
        setForm({
            name: team.name || "",
            matches: team.matches || "",
            wins: team.wins || "",
            losses: team.losses || "",
            tied: team.tied || "",
            nr: team.nr || "",
            points: team.points || "",
            nrr: team.nrr || "",
        });
        setEditingId(team.id);
        setDialogOpen(true);
    };

    const confirmDelete = (id) => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        if (!deleteId) return;
        setLoading(true);
        try {
            await deleteDoc(doc(db, "pointsTable", deleteId));
            setSnackbar({ open: true, message: "Team deleted.", severity: "info" });
            fetchTeams();
        } catch (error) {
            console.error("Failed to delete team:", error);
            setSnackbar({ open: true, message: "Error deleting team.", severity: "error" });
        } finally {
            setLoading(false);
            setDeleteDialogOpen(false);
            setDeleteId(null);
        }
    };

    return (

        <div>
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
        <Box sx={{ width: { xs: "100%", sm: "90%", md: 900 }, mx: "auto", mt: 2 }}>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                    sx={{ borderRadius: "12px" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {loading && (
                <Box textAlign="center" my={2}>
                    <CircularProgress />
                </Box>
            )}

         

            <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Team</b></TableCell>
                            <TableCell align="center"><b>Mat</b></TableCell>
                            <TableCell align="center"><b>Won</b></TableCell>
                            <TableCell align="center"><b>Lost</b></TableCell>
                            <TableCell align="center"><b>Tied</b></TableCell>
                            <TableCell align="center"><b>NR</b></TableCell>
                            <TableCell align="center"><b>Pts</b></TableCell>
                            <TableCell align="center"><b>NRR</b></TableCell>
                            <TableCell align="center"><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.map((team) => (
                            <TableRow key={team.id}>
                                <TableCell>{team.name}</TableCell>
                                <TableCell align="center">{team.matches}</TableCell>
                                <TableCell align="center">{team.wins}</TableCell>
                                <TableCell align="center">{team.losses}</TableCell>
                                <TableCell align="center">{team.tied}</TableCell>
                                <TableCell align="center">{team.nr}</TableCell>
                                <TableCell align="center">{team.points}</TableCell>
                                <TableCell align="center">{team.nrr.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <IconButton size="small" onClick={() => handleEdit(team)}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => confirmDelete(team.id)} color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
                <DialogTitle mb={1}>{editingId ? "Edit Team" : "Add New Team"}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {[
                            { label: "Team Name", name: "name" },
                            { label: "Matches", name: "matches", type: "number" },
                            { label: "Wins", name: "wins", type: "number" },
                            { label: "Losses", name: "losses", type: "number" },
                            { label: "Tied", name: "tied", type: "number" },
                            { label: "NR", name: "nr", type: "number" },
                            { label: "Points", name: "points", type: "number" },
                            { label: "NRR", name: "nrr", type: "number", step: "any" },
                        ].map(({ label, name, type = "text", step }) => (
                            <Grid item xs={6} sm={3} key={name}>
                                <TextField
                                    label={label}
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    type={type}
                                    inputProps={step ? { step } : {}}
                                    fullWidth
                                    required
                                    variant="outlined"
                                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} variant="outlined" color="error" sx={{bgcolor:'#d12828', borderRadius:'10px',color:'white'}}>
                        Cancel
                    </Button>
                    <Button sx={{bgcolor:'black', borderRadius:'10px'}}  onClick={addOrUpdateTeam} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}    PaperProps={{
    sx: {
      borderRadius: 3,     // Rounded corners
      p: 1,                // Inner padding
      minWidth: 250,       // Minimum width
    },
  }}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this team?</Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button   color="primary" onClick={() => setDeleteDialogOpen(false)} variant="outlined"   sx={{
        borderRadius: 2,
        textTransform: 'none',
        px: 3,
        fontWeight: 500,
      }}>
                        Cancel
                    </Button>
                    <Button  color="error" onClick={handleDeleteConfirmed}  variant="contained"  sx={{
        borderRadius: 2,
        textTransform: 'none',
        px: 3,
        fontWeight: 600,
        boxShadow: 2,
      }}>
                        Delete
                    </Button>
                    
                </DialogActions>
            </Dialog>
               <Box textAlign="right" mb={1}>
                <Button
                    onClick={openDialog}
                    startIcon={<PersonAddIcon />}
                    variant="contained"
                    sx={{
    mt: 3,
    width: '200px',
    mb: 2,
    ml: 10,
    backgroundColor: "black",
    color: "#fff",
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    px: 3,
    py: 1,
    boxShadow: 3,
    display: "flex",           // Use flex for alignment
    alignItems: "center",      // Vertically align icon and text
    justifyContent: "center",  // Optional: center the whole content
  }}
                >
                    Add Team
                </Button>
            </Box>
        </Box>
      
        </div>
    );
};

export default PointsTable;
