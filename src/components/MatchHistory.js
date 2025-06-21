import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Paper,
} from "@mui/material";
import { db } from "./firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
export default function MatchHistory() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
const [matchToDelete, setMatchToDelete] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "matches"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const matchList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setMatches(matchList);
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching match history:", err);
                setError("Failed to load match history.");
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);




    return (
        <>
            <Box display="flex" justifyContent="center" mt={-2} mb={6}>
  <Button
    variant="outlined"
    onClick={() => setOpen(true)}
    sx={{
      width: '400px',
    
      color: 'black',
      borderColor: 'black   ',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      borderRadius: '12px',
      px: 4,
      py: 1.5,
      boxShadow: 3,
      '&:hover': {
        backgroundColor: '#1a1a1a',
        borderColor: '#fff',
        color:'white'
      },
    }}
  >
    Previous Match Scores
  </Button>
</Box>


            <Dialog
  open={open}
  onClose={(event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  }}
  maxWidth="lg"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: "20px",
      height: '85vh',
      marginTop:'-10px'
    },
  }}
>
<DialogTitle
  sx={{
    m: 0,
    px: 4, // horizontal padding to give room for close icon
    py: 2, // vertical padding
    backgroundColor: '#181854',
    color: 'white',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <Typography variant="h6" component="div" sx={{ flex: 1,marginLeft:'-10px' }}>
    Previous Match Scores
  </Typography>



</DialogTitle>


                <DialogContent>
                    {loading ? (
                        <Box display="flex" justifyContent="center" mt={2}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : matches.length === 0 ? (
                        <Typography sx={{mt:'20px'}}>No match history available.</Typography>
                    ) : (
                        <Grid container spacing={3} justifyContent="center">
                            {matches.map((match, index) => {
                                const matchNumber = matches.length - index;
                                console.log("Team A:", match.TeamA);
                                console.log("Team B:", match.TeamB);

                                return (
                                    <Grid item xs={12} sm={10} md={8} lg={6} key={match.id} mt={2}>
                                  <Paper
  elevation={4}
  sx={{
    borderRadius: "24px",
    padding: 3,
    backgroundColor: "#ffffff",
    textAlign: "center",
    width: '270px',
    border: '2px solid black', // ✅ Apply visible border
    // You can also adjust to `1px` or a custom thickness
 ml:-1.5
  }}
>

                                            {/* Match Number */}
                                            <Typography
                                                variant="body2"
                                                fontWeight="bold"
                                                color="black"
                                                mb={1}
                                                fontSize={20}
                                            >
                                                Match {matchNumber}
                                            </Typography>

                                            {/* Match Box */}
                                            <Box
                                                display="flex"
                                                justifyContent="space-around"
                                                alignItems="center"
                                                mt={2}
                                                mb={2}
                                                ml={1}
                                            >
                                                {/* Team A */}
                                                <Box textAlign="center" sx={{ml:-2}}>
                                                    {/* Row: GIF + Team Name */}
                                                    <Box display="flex" justifyContent="center" alignItems="center" mb={0.5}>
                                                        <Box
                                                            component="img"
                                                            src="/assets/storm.gif"
                                                            alt="Team Icon"
                                                            sx={{ width: 24, height: 24, mr: 0.5 }}
                                                        />
                                                        <Typography fontWeight="bold">{match.TeamA}</Typography>
                                                    </Box>

                                                    {/* Score below */}
                                                    <Typography fontSize={17} sx={{ color: "#666", ml:3, mt:1 }}>
                                                        {match.ScoreA}
                                                    </Typography>
                                                </Box>

                                                {/* VS */}
                                  <Box
  sx={{
    width: 80, // ✅ Increased width
    height: 30,
    borderRadius: "80px", // ✅ Rounded capsule shape
    backgroundColor: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    ml: 1,
    mr: -3 ,
    fontSize: 14,
    fontWeight:600  
  }}
>
  VS
</Box>



                                                {/* Team B */}
                                                <Box textAlign="center"  ml={2} mr={-2}>
                                                    {/* Row: GIF + Team Name */}
                                                    <Box display="flex" justifyContent="center" alignItems="center" mb={0.5}>
                                                        <Box
                                                            component="img"
                                                            src="/assets/fire.gif" // replace with actual gif path
                                                            alt="Team Icon"
                                                             sx={{ width: 24, height: 24, mr: -0.050, mt:-0.5 }}
                                                        />
                                                        <Typography fontWeight="bold">{match.TeamB}</Typography>
                                                    </Box>

                                                    {/* Score below */}
                                                    <Typography fontSize={14} sx={{ color: "#666"  ,ml:3, mt:1.2 }}>
                                                        {match.ScoreB}
                                                    </Typography>
                                                </Box>

                                            </Box>

                                            {/* Status */}
                                            <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
                                                <Box
                                                    py={0.5}
                                                    px={2}
                                                    sx={{
                                                        display: "inline-block",
                                                        backgroundColor: "#f44336",
                                                        color: "#fff",
                                                        borderRadius: "20px",
                                                        fontSize: "12px",
                                                        fontWeight: "bold",mb:1,mt:1
                                                    }}
                                                >
                                                    Completed
                                                </Box>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ mt: 1, color: "black", fontSize: "15px" }}
                                                >
                                                    {match.timestamp?.toDate().toLocaleString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })}

                                                </Typography>
                                            </Box>
<Box display="flex" justifyContent="center">
  <IconButton
    aria-label="delete"
  onClick={() => {
  setMatchToDelete(match.id);
  setConfirmDeleteOpen(true);
}}

    sx={{
      color: 'black',
      
      borderRadius: '12px',
      p: 1,
      mt:1,mb:-1
      
    }}
  >
    <DeleteIcon />
  </IconButton>
</Box>

<Dialog
  open={confirmDeleteOpen}
  onClose={() => setConfirmDeleteOpen(false)} PaperProps={{
    sx: {
      borderRadius: '20px', // ✅ Rounded corners
      padding: 2,            // optional: add some inner spacing
      width:'260px'
    },}}
>
  <DialogContent>
    <Typography>Are you sure you want to delete this match?</Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setConfirmDeleteOpen(false)}  sx={{
        borderRadius: 2,
        textTransform: 'none',
        px: 3,
        fontWeight: 500,
        fontSize:16
      }}>
      Cancel
    </Button>
    <Button
      onClick={async () => {
        try {
          await deleteDoc(doc(db, "matches", matchToDelete));
          setConfirmDeleteOpen(false);
        } catch (error) {
          console.error("Error deleting match:", error);
        }
      }}
      color="error"
      variant="contained"
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

                                        </Paper>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    )}
                </DialogContent>
           <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
  <Button
    onClick={() => setOpen(false)}
    variant="outlined"
    sx={{
     
      color: 'black',
     
      backgroundColor: '#fff',
        borderColor: '#000',
       borderRadius: '14px',
      textTransform: 'none',
      fontWeight: 600,
      px: 3,
      py: 1,
      '&:hover': {
       
      borderRadius: '14px',
     
      color: 'white',
      backgroundColor: 'black',
        borderColor: 'white',
      },
      mr:-22,mb:-1
    }}
  >
    Close
  </Button>
</DialogActions>

            </Dialog>
        </>
    );
}
