import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardActions, Typography, Menu, MenuItem } from "@mui/material";
import "./existing.css";
import './App.css';
import FloatingActionBar from "./components/FloatingActionBar";
import ProgressBar from "./components/ProgressBar";
import { Icon, List, ListItem, Popper, Box, Fade, IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { ChangeCircle, Delete, MenuBook, MoreVert, Restore } from "@mui/icons-material";
import BasicModal from "./components/Modal";
import { Link } from "react-router-dom";
const navigateTo = (History) => {
    // Handle navigation using React Router
    console.log("Navigating to:", History);
};

function Existing() {
    const data = [
        {
            name: "Activity 1",
            description: "contains the description about the activty 1",
            id: 1
        },
        {
            name: "Activity 2",
            description: "contains the description about the activty 2",
            id: 2
        },
        {
            name: "Activity 3",
            description: "contains the description about the activty 3",
            id: 3
        }
    ];

    const [datalist, setDataList] = useState(data);
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperStr, setPopperstr] = useState()
    const [openModal, setOpenModal] = useState()
    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget); // Update anchorEl for potential menu positioning
        setOpen(true); // Open the menu on mouse enter
        console.log("mouseEnter", open, event.currentTarget.id)
        if (event.currentTarget.id == 1) {
            setPopperstr("Reset the activity to inert state")
        } else if (event.currentTarget.id == 2) {
            //setPopperstr("Reset the activity to inert state")
            setPopperstr("delete the activity")
        } else if (event.currentTarget.id == 3) {
            setPopperstr("more options")
            console.log(3)

        }
    };

    const handleMouseLeave = () => {
        setAnchorEl(null); // Clear anchorEl upon mouse leave (if needed for positioning)
        setOpen(false); // Close the menu on mouse leave
        console.log("mouseLeaves", open)
    };
    const handleCardClick = () => {
        setOpenModal(!openModal)
        console.log(openModal)
    }
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    useEffect(() => {
        const dataView1 = datalist.map(item =>
            <Card key={item.id} onClick={handleCardClick} sx={{ mb: 2, width: "90%", padding: "0px", margin: "5px" }} className="card">
                <CardHeader
                    sx={{ width: "fit-content", height: "100%", width: "100%", margin: "1px", display: "flex", justifyContent: "space-between" }}
                    title={item.name}
                    action={
                        (<IconButton id="3" aria-label="more actions" onClick={handleCardClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <MoreVert />
                        </IconButton>)
                    }
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" sx={{ letterSpacing: "0.1rem", fontSize: "15px" }} fontFamily={'Roboto'} color="primary.black">
                        {item.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-start' }}>
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
    }, [datalist, open, openModal]);

    const [list, setList] = useState([]);

    return (
        <div className="container-fluid">
            <Link to={"https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"} />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap" />
            <h5 >Issued activity</h5>
            {list}
            <FloatingActionBar navigateTo={navigateTo} />
            <BasicModal openModal={openModal} />
        </div>
    );
}

export default Existing;
