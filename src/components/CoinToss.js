import React, { useRef, useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db, auth } from './firebase';
import HistoryIcon from '@mui/icons-material/History';
import { getDocs, deleteDoc, doc } from 'firebase/firestore';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';

const CoinToss = () => {
  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const [history, setHistory] = useState([]);
  const [openDialog, setOpenDialog] = useState(false); // 👈 For Dialog

  const coinRef = useRef(null);
  const flipBtnRef = useRef(null);
  const flipSoundRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('heads', heads);
    localStorage.setItem('tails', tails);
  }, [heads, tails]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'TossCoin'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const tosses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHistory(tosses);
      },
      (error) => {
        console.error("❌ Error fetching toss history:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const logTossResult = async (result) => {
    const user = auth.currentUser;
    if (!user) {
      console.warn("⚠️ User not logged in. Skipping Firestore log.");
      return;
    }
    try {
      await addDoc(collection(db, 'TossCoin'), {
        uid: user.uid,
        result,
        timestamp: Timestamp.now(),
      });
      console.log("✅ Successfully logged to Firestore");
    } catch (error) {
      console.error("❌ Error writing to Firestore:", error);
    }
  };

  const handleFlip = () => {
    if (!coinRef.current || !flipBtnRef.current || !flipSoundRef.current) return;

    const isHeads = Math.random() < 0.5;
    const result = isHeads ? 'Heads' : 'Tails';
    console.log("🪙 Toss result:", result);

    coinRef.current.style.animation = 'none';
    flipSoundRef.current.currentTime = 0;
    flipSoundRef.current.play();

    flipBtnRef.current.disabled = true;

    setTimeout(() => {
      coinRef.current.style.animation = isHeads ? 'spin-heads 3s forwards' : 'spin-tails 3s forwards';

      setTimeout(() => {
        if (isHeads) {
          setHeads(h => h + 1);
        } else {
          setTails(t => t + 1);
        }

        logTossResult(result);
        flipBtnRef.current.disabled = false;
      }, 3000);
    }, 100);
  };

const resetGame = async () => {
  setHeads(0);
  setTails(0);
  localStorage.removeItem('heads');
  localStorage.removeItem('tails');

  try {
    const snapshot = await getDocs(collection(db, 'TossCoin'));
    const deletePromises = snapshot.docs.map((docSnap) =>
      deleteDoc(doc(db, 'TossCoin', docSnap.id))
    );
    await Promise.all(deletePromises);
    setHistory([]); // clear state history
    console.log("✅ Toss history cleared from Firestore.");
  } catch (error) {
    console.error("❌ Failed to clear toss history:", error);
  }
};


  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="stats">
        <p>Heads: {heads}</p>
        <p>Tails: {tails}</p>
      </div>

      <div className="coin" ref={coinRef}>
        <div className="heads">
          <img src="https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/c82f3949ec4ba9503c875fc0fa7faa4a71053db7/Day%20%2307%20-%20Flip%20a%20Coin%20Game/heads.svg" alt="Heads" />
        </div>
        <div className="tails">
          <img src="https://raw.githubusercontent.com/AsmrProg-YT/100-days-of-javascript/c82f3949ec4ba9503c875fc0fa7faa4a71053db7/Day%20%2307%20-%20Flip%20a%20Coin%20Game/tails.svg" alt="Tails" />
        </div>
      </div>

      <div className="coin-buttons" style={{ marginTop: '20px' }}>
        <button
          onClick={handleFlip}
          style={{ backgroundColor: '#d32f2f', color: 'white', marginRight: '8px' }}
          ref={flipBtnRef}
        >
          Flip Coin
        </button>
        <button
          onClick={resetGame}
          style={{
            backgroundColor: 'white',
            border: '1px solid #1f8944',
            color: '#419c3e',
            marginRight: '-4px',marginLeft:15
          }}
        >
          Reset
        </button>
 <button
  onClick={() => setOpenDialog(true)}
  style={{
    width: '50px', // Optional: adjust width since icon takes less space
    height: '50px',
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    border: '1px solid rgb(0, 0, 0)',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    cursor: 'pointer',
    marginLeft:150,
    marginTop:24
  }}
>
  <HistoryIcon fontSize="medium" />
</button>

        <audio ref={flipSoundRef}>
          <source src="/assets/coin-flip-88793.mp3" type="audio/mpeg" />
        </audio>
      </div>

      {/* 🧾 History Dialog */}
    <Dialog
  open={openDialog}
  onClose={() => setOpenDialog(false)}
  fullWidth
  maxWidth="xs"
  PaperProps={{
    sx: {
      borderRadius: 4, // Rounded corners
      paddingBottom: 1,
      height: '650px', // 🔵 Custom height
      width: '380px',  // 🔵 Custom width (can override maxWidth)
    }
  }}
>

  <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
Say No to Cheating
  </DialogTitle>

  <DialogContent dividers>
    {history.length === 0 ? (
      <p style={{ textAlign: 'center' }}>No tosses recorded yet.</p>
    ) : (
      <List>
        {history.map((toss, index) => {
          const date = new Date(toss.timestamp.seconds * 1000);
          const formattedDate = date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          });

          return (
            <React.Fragment key={toss.id}>
              <ListItem>
                <ListItemText
                  primary={`Toss ${history.length - index} - ${toss.result}`}
                  secondary={formattedDate}
                />
              </ListItem>
              {index !== history.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    )}
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center', pb: 1 }}>
    <Button
      onClick={() => setOpenDialog(false)}
      variant="outlined"
      color="primary"
      sx={{   width: '120px',
      backgroundColor: "white",
      color: "black",
      textTransform: "none",
      fontWeight: 600,
      borderRadius: 5,
      borderColor:'black',
      px: 3,
      py: 1,
      boxShadow: 3, }}
    >
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default CoinToss;
