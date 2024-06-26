import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardActions, Typography, IconButton, List, ListItem, Popper, Box, Fade } from "@mui/material";
import { MoreVert, Restore, Delete } from "@mui/icons-material";
import "./Pending.css";
import FloatingActionBar from "./components/FloatingActionBar";
import BasicModal from "./components/Modal";
const navigateTo = (History) => {
    // Handle navigation using React Router
    console.log("Navigating to:", History);
};

function Pending() {
    const data = [
        {
            name: "Activity 1",
            description: "Contains the description about the activity 1",
            id: 1
        },
        {
            name: "Activity 2",
            description: "Contains the description about the activity 2",
            id: 2
        },
        {
            name: "Activity 3",
            description: "Contains the description about the activity 3",
            id: 3
        }
    ];

    const [datalist, setDataList] = useState(data);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperStr, setPopperStr] = useState();

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        if (event.currentTarget.id === "1") {
            setPopperStr("Reset the activity to inert state");
        } else if (event.currentTarget.id === "2") {
            setPopperStr("Delete the activity");
        } else if (event.currentTarget.id === "3") {
            setPopperStr("More options");
        }
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
    };

    const navigateToHistory = () => {
        // Navigation logic to the 'History' page
        console.log("Navigating to History page...");
    };

    useEffect(() => {
        const dataView1 = datalist.map(item =>
            <Card key={item.id} sx={{ mb: 2, width: "90%", padding: "0px", margin: "5px" }} className="card">
                <CardHeader
                    sx={{ width: "fit-content", height: "100%", width: "100%", margin: "1px", display: "flex", justifyContent: "space-between" }}
                    title={item.name}
                    action={
                        <IconButton id="3" aria-label="more actions" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <MoreVert />
                        </IconButton>
                    }
                />
                <CardContent>
                    <Typography variant="body2" sx={{ letterSpacing: "0.1rem", fontSize: "15px" }} fontFamily={'Roboto'} color="primary.black">
                        {item.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <List sx={{ display: "flex", flexDirection: "row" }}>
                        <ListItem>
                            <IconButton id="1" aria-label="restore" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Restore />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <IconButton id="2" aria-label="delete" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Delete />
                            </IconButton>
                        </ListItem>
                    </List>
                </CardActions>
                <Popper
                    sx={{ zIndex: 1000 }}
                    color="white"
                    id={item.id}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box sx={{ zIndex: 1000, border: 1, p: 1, bgcolor: 'primary.black', color: 'primary.white' }}>
                                {popperStr}
                            </Box>
                        </Fade>
                    )}
                </Popper>
            </Card>
        );
        setList(dataView1);
    }, [datalist, anchorEl, popperStr]);

    const [list, setList] = useState([]);

    return (
        <div className="container-fluid">
            <Link to={"https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"} />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap" />
            <h5>Issued activity</h5>
            {list}
            <FloatingActionBar navigateTo={navigateTo} />
            <BasicModal />
        </div>
    );
}

export default Pending;
