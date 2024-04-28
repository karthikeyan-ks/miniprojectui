import React from "react";
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
    display: "flex", // Display profile card horizontally
    alignItems: "center", // Align items vertically in the center
    padding: theme.spacing(2),
    cursor: "pointer",
  },
  profileCardContent: {
    marginLeft: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

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
                  <ProfileCard name="Activity 1" />
                  <ProfileCard name="Activity 2" />
                  <ProfileCard name="Activity 3" />
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} lg={7} xl={8}>
          <Paper className={classes.scrollableContainer} variant="outlined">
            {/* Your content goes here */}
          </Paper>
          <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
            <TextField
              fullWidth
              placeholder="Type message"
              variant="outlined"
              size="large"
            />
            <IconButton>
              <AttachmentIcon />
            </IconButton>
            <IconButton>
              <MoodIcon />
            </IconButton>
            <IconButton>
              <SendIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}

function ProfileCard({ name }) {
  const classes = useStyles();

  return (
    <ButtonBase
      className={classes.profileCard}
      onClick={() => console.log(name)}
    >
      <Card>
        <CardContent className={classes.profileCardContent}>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          {/* Add more details if needed */}
        </CardContent>
      </Card>
    </ButtonBase>
  );
}
