import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Paper,
  ButtonBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoodIcon from "@mui/icons-material/Mood";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(5),
    backgroundColor: "#FFFFFF",
  },
  chatCard: {
    borderRadius: "15px",
  },
  scrollableContainer: {
    maxHeight: "400px",
    overflowY: "auto",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(2),
    cursor: "pointer",
    width: 200,
    height: 100,
    margin: theme.spacing(1),
  },
  profileCardContent: {
    marginLeft: theme.spacing(2),
  },
  messageContainer: {
    padding: theme.spacing(2),
  },
  message: {
    marginBottom: theme.spacing(1),
  },
}));

export default function Review() {
  const classes = useStyles();
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleProfileClick = (name) => {
    setSelectedProfile(name);
  };

  const handleMessageSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <Container className={classes.container} maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item md={6} lg={5} xl={4}>
          <Card className={classes.chatCard}>
            <CardContent>
              <TextField
                fullWidth
                placeholder="Search"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  ),
                }}
              />
              <div className={classes.scrollableContainer}>
                <Typography variant="body1" component="div" className="mb-0">
                  <ProfileCard name="Activity 1" onClick={handleProfileClick} />
                  <ProfileCard name="Activity 2" onClick={handleProfileClick} />
                  <ProfileCard name="Activity 3" onClick={handleProfileClick} />
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} lg={7} xl={8}>
          <Paper className={classes.scrollableContainer} variant="outlined">
            <div className={classes.messageContainer}>
              {messages.map((message, index) => (
                <Typography key={index} className={classes.message}>
                  {message}
                </Typography>
              ))}
            </div>
          </Paper>
          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
            <TextField
              fullWidth
              placeholder="Type message"
              variant="outlined"
              size="large"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <IconButton onClick={handleMessageSend}>
              <SendIcon />
            </IconButton>
            <IconButton>
              <AttachmentIcon />
            </IconButton>
            <IconButton>
              <MoodIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

function ProfileCard({ name, onClick }) {
  const classes = useStyles();

  return (
    <ButtonBase className={classes.profileCard} onClick={() => onClick(name)}>
      <Card>
        <CardContent className={classes.profileCardContent}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
