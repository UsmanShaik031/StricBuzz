// 👇 same imports
import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LiveCommentary() {
  const [comment, setComment] = useState("");
  const [commentary, setCommentary] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const [heads, setHeads] = useState(() => Number(localStorage.getItem("heads")) || 0);
  const [tails, setTails] = useState(() => Number(localStorage.getItem("tails")) || 0);
  const coinRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    window.location.reload();
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await addDoc(collection(db, "matches", "matched", "commentary"), {
        text: comment.trim(),
        timestamp: serverTimestamp(),
        senderEmail: user?.email || "Anonymous",
      });
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "matches", "matched", "commentary", id));
    } catch (error) {
      console.error("Error deleting comment:", error);
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
    <div style={{
      maxWidth: "100%",
      width: "100%",
      mt: 7,
      p: 2,
      mb: 6,
      bgcolor: "transparent",
      borderRadius: 2,
      border: "none",
      height: "120vh",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>
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

      <Box sx={{
        maxWidth: "100%",
        width: "100%",
        height: "160vh",
        mt: 10,
        p: 2,
        mb: 6,
        bgcolor: "transparent",
        borderRadius: 2,
        border: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>
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

        {/* Commentary list */}
        <Box
          ref={scrollContainerRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 1,
            mb: 2,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
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
                    <Typography variant="body2" sx={{ fontSize: 14, mb: 0.5, color: "#333" }}>
                      {item.text}
                    </Typography>

                    {/* Sender Email */}
                    {item.senderEmail && (
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: 11,
                          fontStyle: "italic",
                          color: "#1976d2",
                          mb: 0.2,
                        }}
                      >
                        Sent by: {item.senderEmail}
                      </Typography>
                    )}

                    {/* Time + Date + Day in a single row */}
                    {item.timestamp?.toDate && (() => {
                      const dateObj = item.timestamp.toDate();
                      const timeStr = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                      const dateStr = dateObj.toLocaleDateString();
                      const dayStr = dateObj.toLocaleDateString(undefined, { weekday: "long" });

                      return (
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 0.2 }}>
                          <Typography variant="caption" sx={{ color: "#888", fontSize: 11 }}>
                            {timeStr}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888", fontSize: 11 }}>
                            {dateStr}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#888", fontSize: 11 }}>
                            {dayStr}
                          </Typography>
                        </Box>
                      );
                    })()}

                    {/* Delete button aligned right */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(item.id)}
                        sx={{ mt: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider sx={{ my: 0.5 }} />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Input box */}
        <Box sx={{ display: "flex", gap: 1, mt: 1, mb: -2, ml: 1.2 }}>
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
                e.preventDefault();
                handleSubmit();
              }
            }}
            sx={{
              borderRadius: 2,
              backgroundColor: "#fff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              "& .MuiOutlinedInput-root": { borderRadius: 2 },
            }}
          />

          <IconButton color="primary" onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
        </Box>
      </Box>

      <Footer />
    </div>
  );
}
