import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./existing.css";
import './App.css';
import FloatingActionBar from "./components/FloatingActionBar";
import ProgressBar from "./components/ProgressBar";
import { Icon, List, ListItem, Popper, Box, Fade, IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { ChangeCircle, Delete, Restore } from "@mui/icons-material";
import BasicModal from "./components/Modal";

function Existing({ progress }) {
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
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperStr,setPopperstr]=useState()
    const [openModal,setOpenModal]=useState()
    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget); // Update anchorEl for potential menu positioning
        setOpen(true); // Open the menu on mouse enter
        console.log("mouseEnter", open,event.currentTarget.id)
        if(event.currentTarget.id==1){
            setPopperstr("Reset the activity to inert state")
        }else if(event.currentTarget.id==2){
            //setPopperstr("Reset the activity to inert state")
        }else if(event.currentTarget.id==3){
            console.log(3)
            setPopperstr("delete the activity")
        }
    };

    const handleMouseLeave = () => {
        setAnchorEl(null); // Clear anchorEl upon mouse leave (if needed for positioning)
        setOpen(false); // Close the menu on mouse leave
        console.log("mouseLeaves", open)
    };
    const handleCardClick=()=>{
        setOpenModal(!openModal)
        console.log(openModal)
    }
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;
    useEffect(() => {
        const dataView1 = datalist.map(item =>
            <Card key={item.id} className="card" onClick={handleCardClick}>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Footer>
                        <List sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "10%" }}>
                            
                            <ListItem>
                                <IconButton id="3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <Icon>
                                        <Delete />
                                    </Icon>
                                </IconButton>

                            </ListItem>
                        </List>
                    </Card.Footer>
                </Card.Body>
                <Popper sx={{zIndex:"100"}} id={id} open={open} anchorEl={anchorEl}  transition>
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Box sx={{ zIndex: "1000", border: 1, p: 1, bgcolor: 'primary.dark' }}>
                                {popperStr}
                            </Box>
                        </Fade>
                    )}
                </Popper>
            </Card>
        );
        setList(dataView1);
    }, [datalist, open,openModal]);

    const [list, setList] = useState([]);
    useEffect(() => {
        progress(0)
    }, [])
    return (
        <div className="container-fluid">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap" />
            <h5 >Existing activity</h5>
            {list}
            <FloatingActionBar />
            <BasicModal openModal={openModal}/>
        </div>
    );
}

export default Existing;
