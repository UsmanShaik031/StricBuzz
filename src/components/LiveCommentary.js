import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function LiveCommentary() {
  const [comment, setComment] = useState("");
  const [commentary, setCommentary] = useState([]);
 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [heads, setHeads] = useState(() => Number(localStorage.getItem('heads')) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem('tails')) || 0);
  const coinRef = useRef(null);
const handleLogout = () => {
  localStorage.removeItem('authenticated'); // Remove persisted auth
  window.location.reload(); // Reload to reflect the logout state (optional)
};

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    try {
      await addDoc(collection(db, "matches", "matched", "commentary"), {
        text: comment.trim(),
        timestamp: serverTimestamp(),
      });
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(db, "matches", "matched", "commentary"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommentary(comments);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [commentary]);

  return (
<div style={{    maxWidth: '100%',
    width: '100%',
    mt: 7,
    p: 2,
    mb: 6,
    bgcolor: 'transparent',
    borderRadius: 2,
    border: 'none',
    height: '120vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',}}>
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
    <Box
  
      sx={{
         maxWidth: '100%',
    width: '100%',
    height:'160vh',
    mt: 10,
    p: 2,
    mb: 6,
    bgcolor: 'transparent',
    borderRadius: 2,
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
      }}
    >
    
      {/* Title with inline GIF */}
      <Typography
        variant="h6"
        textAlign="center"
        mb={5}
        mt={-2}
        sx={{
          fontWeight: "bold",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        Live comments
        <img
          src="/assets/commentary.gif"
          alt="Live commentary gif"
          style={{ width: 40, height: 45, objectFit: "contain" }}
        />
      </Typography>

      {/* Scrollable commentary list with hidden scrollbar */}
      <Box
        ref={scrollContainerRef}
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1,
          mb: 2,

          // Hide scrollbar but keep scrolling
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari, Edge
          },
        }}
      >
        {commentary.length === 0 ? (
          <Typography textAlign="center" color="textSecondary">
            No commentary yet.
          </Typography>
        ) : (
          <List disablePadding>
            {commentary.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem sx={{ display: "block", px: 0 }}>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: 14, mb:-1.3, color: "#333" }}
                  >
                    {item.text}
                  </Typography>
                  {item.timestamp?.toDate && (() => {
                    const dateObj = item.timestamp.toDate();
                    const timeStr = dateObj.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    const dateStr = dateObj.toLocaleDateString();
                    const dayStr = dateObj.toLocaleDateString(undefined, { weekday: 'long' });
                    return (
                      <>
                        <Typography variant="caption" sx={{ color: "#888", fontSize: 11 }}>
                          {timeStr}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#888", fontSize: 11, ml: 1 }}>
                          {dateStr}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#888", fontSize: 11, ml: 1 }}>
                          {dayStr}
                        </Typography>
                      </>
                    );
                  })()}
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>

      {/* Input box */}
      <Box sx={{ display: "flex", gap: 1,mt:1, mb:-
      2, ml:1.2 }}>
        <TextField
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          placeholder="Enter commentary..."
          variant="outlined"
          size="medium"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // prevent newline on Enter, submit instead
              handleSubmit();
            }
          }}
          sx={{
            borderRadius: 2,
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <IconButton color="primary" onClick={handleSubmit}>
          <SendIcon />
        </IconButton>
      </Box>
        {/* Footer */}
       
    </Box>
    <Footer />
</div>
  );
}
