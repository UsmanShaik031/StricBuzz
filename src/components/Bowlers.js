import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const Bowlers = () => {
  const [bowlers, setBowlers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    overs: "",
    maidens: "",
    runs: "",
    wickets: "",
    note: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const bowlersRef = React.useMemo(() => collection(db, "matches", "matched", "Bowlers"), []);
  const fetchBowlers = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(bowlersRef);
      const fetchedBowlers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBowlers(fetchedBowlers);
    } catch (error) {
      console.error("Error fetching bowlers:", error);
      setSnackbar({ open: true, message: "Failed to fetch bowlers.", severity: "error" });
    } finally {
      setLoading(false);
    }
  }, [bowlersRef]);

  useEffect(() => {
    fetchBowlers();
  }, [fetchBowlers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openDialog = () => {
    setForm({ name: "", overs: "", maidens: "", runs: "", wickets: "", note: "" });
    setEditingIndex(null);
    setDialogOpen(true);
  };

  const closeDialog = () => setDialogOpen(false);

  const isFormValid = () => {
    const { name, overs, maidens, runs, wickets } = form;
    return name.trim() && overs !== "" && maidens !== "" && runs !== "" && wickets !== "";
  };

  const addOrUpdateBowler = async () => {
    if (!isFormValid()) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields (note is optional).",
        severity: "warning",
      });
      return;
    }

    const bowlerData = {
      ...form,
      overs: Number(form.overs),
      maidens: Number(form.maidens),
      runs: Number(form.runs),
      wickets: Number(form.wickets),
    };

    setLoading(true);
    try {
      if (editingIndex !== null) {
        const bowlerToUpdate = bowlers[editingIndex];
        const bowlerDocRef = doc(bowlersRef, bowlerToUpdate.id);
        await updateDoc(bowlerDocRef, bowlerData);

        const updatedBowlers = [...bowlers];
        updatedBowlers[editingIndex] = { ...bowlerToUpdate, ...bowlerData };
        setBowlers(updatedBowlers);
      } else {
        const docRef = await addDoc(bowlersRef, bowlerData);
        setBowlers((prev) => [...prev, { id: docRef.id, ...bowlerData }]);
      }
      setSnackbar({ open: true, message: "Bowler saved successfully!", severity: "success" });
      closeDialog();
      resetForm();
    } catch (error) {
      console.error("Error saving bowler:", error);
      setSnackbar({ open: true, message: "Error saving bowler.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", overs: "", maidens: "", runs: "", wickets: "", note: "" });
    setEditingIndex(null);
  };

  const handleEdit = (index) => {
    const bowler = bowlers[index];
    setForm({
      name: bowler.name || "",
      overs: bowler.overs || "",
      maidens: bowler.maidens || "",
      runs: bowler.runs || "",
      wickets: bowler.wickets || "",
      note: bowler.note || "",
    });
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (deleteIndex === null) return;

    setLoading(true);
    try {
      const bowlerToDelete = bowlers[deleteIndex];
      if (bowlerToDelete.id) {
        await deleteDoc(doc(bowlersRef, bowlerToDelete.id));
        setBowlers((prev) => prev.filter((_, i) => i !== deleteIndex));
        setSnackbar({ open: true, message: "Bowler deleted.", severity: "info" });
      }
    } catch (error) {
      console.error("Failed to delete bowler:", error);
      setSnackbar({ open: true, message: "Error deleting bowler.", severity: "error" });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setDeleteIndex(null);
    }
  };

  return (
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
          sx={{ bgcolor: "#d12828", borderRadius: "12px" }}
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
        <Table size="small" aria-label="bowlers table">
          <TableHead>
            <TableRow>
              <TableCell><b>Bowler</b></TableCell>
              <TableCell align="center"><b>Overs</b></TableCell>
              <TableCell align="center"><b>Maidens</b></TableCell>
              <TableCell align="center"><b>Runs</b></TableCell>
              <TableCell align="center"><b>Wickets</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bowlers.map((bowler, index) => (
              <TableRow key={bowler.id || index}>
                <TableCell>
                  <Typography variant="body2" fontWeight={bowler.note === "bowling" ? "bold" : 400}>
                    {bowler.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {bowler.note}
                  </Typography>
                </TableCell>
                <TableCell align="center">{bowler.overs}</TableCell>
                <TableCell align="center">{bowler.maidens}</TableCell>
                <TableCell align="center">{bowler.runs}</TableCell>
                <TableCell align="center">{bowler.wickets}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleEdit(index)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => confirmDelete(index)} color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingIndex !== null ? "Edit Bowler" : "Add New Bowler"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Overs"
                name="overs"
                value={form.overs}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                inputProps={{ min: 0, step: "0.1" }}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Maidens"
                name="maidens"
                value={form.maidens}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                inputProps={{ min: 0 }}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Runs"
                name="runs"
                value={form.runs}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                inputProps={{ min: 0 }}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Wickets"
                name="wickets"
                value={form.wickets}
                onChange={handleChange}
                type="number"
                fullWidth
                required
                inputProps={{ min: 0 }}
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Note (e.g. bowling)"
                name="note"
                value={form.note}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ bgcolor: '#d12828', borderRadius: '10px', color: 'white' }}
            onClick={closeDialog} variant="outlined" color="error">
            Cancel
          </Button>
          <Button sx={{ bgcolor: 'black', borderRadius: '10px' }} onClick={addOrUpdateBowler} variant="contained" color="primary" disabled={loading}>
            {editingIndex !== null ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
            minWidth: 250,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 'bold',
            fontSize: '1.35rem',
            color: 'error.main',
          }}
        >
          Confirm Delete
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ fontSize: '1rem', mb: 1 }}>
            Are you sure you want to delete this bowler? This action cannot be undone.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
            color="primary"
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleDeleteConfirmed}
            color="error"
            variant="contained"
            disabled={loading}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3,
              fontWeight: 600,
              boxShadow: 2,
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Box textAlign="center" mt={2}>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={openDialog}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Add New Bowler
        </Button>
      </Box>
    </Box>
  );
};

export default Bowlers;
