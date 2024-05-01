import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardActions, Typography, Menu, MenuItem } from "@mui/material";
import "./existing.css";
import '../App.css';
import FloatingActionBar from "../components/FloatingActionBar";
import { Icon, List, ListItem, Popper, Box, Fade, IconButton } from "@mui/material";
import { ChangeCircle, Delete, MenuBook, MoreVert, Restore } from "@mui/icons-material";
import BasicModal from "../components/Modal";
import { Link } from "react-router-dom";
import { MyContext } from "../components/Connection";
import { useContext } from "react";
const navigateTo = (History) => {
    console.log("Navigating to:", History);
};

function Existing() {
    const data = [
        
    ];

    const [datalist, setDataList] = useState(data);
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperStr, setPopperstr] = useState()
    const [openModal, setOpenModal] = useState()
    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget); 
        setOpen(true); 
        console.log("mouseEnter", open, event.currentTarget.id)
        if (event.currentTarget.id == 1) {
            setPopperstr("Reset the activity to inert state")
        } else if (event.currentTarget.id == 2) {
            setPopperstr("delete the activity")
        } else if (event.currentTarget.id == 3) {
            setPopperstr("more options")
            console.log(3)
        }
    };
    const { socket} = useContext(MyContext)
    useEffect(()=>{
        let intervalid=setInterval(()=>{
            if(socket!=null){
                if(socket.readyState=== WebSocket.OPEN){
                    clearInterval(intervalid)
                    console.log("connected..");
                    var data=JSON.parse(localStorage.getItem('login'))
                    data['activity']='activity';
                    socket.send(JSON.stringify(data))
                    socket.onmessage=(msg)=>{
                        if(msg.data!=null){
                            console.log(msg.data)
                            let data=JSON.parse(msg.data)
                            if(data.actvity_status_id==2)
                                setDataList((prev)=>[...prev,JSON.parse(msg.data)])
                        }
                    }
                }else if(socket.readyState===WebSocket.CONNECTING){
                    console.log("Connecting...")
                    
                }
            }
            return ()=>{
                if(socket){
                    socket.onmessage=null
                    console.log("socket set to null...")
                }
            }
        },1000)
        
    },[socket])

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setOpen(false); 
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
                    sx={{ width: "fit-content", height: "fit-content", width: "100%", margin: "1px", display: "flex", justifyContent: "space-between" }}
                    title={item.activity_name}
                    action={
                        (<IconButton id="3" aria-label="more actions" onClick={handleCardClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <MoreVert />
                        </IconButton>)
                    }
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2" sx={{ letterSpacing: "0.1rem", fontSize: "15px" }} fontFamily={'Roboto'} color="primary.black">
                        {item.activity_descrption}
                    </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-start', padding: 0, margin: 0 }}>
                    <List sx={{ display: "flex", flexDirection: "row", width: "100%", padding: 0, margin: 0 }}>
                        <ListItem sx={{ width: "100%", padding: 0, margin: 0 }}>
                            <IconButton id="1" aria-label="restore" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Restore />
                            </IconButton>
                            <IconButton id="2" aria-label="delete" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                <Delete />
                            </IconButton>
                        </ListItem>
                        <ListItem sx={{ width: "100%", padding: 0, margin: 0 }}>
                            <Typography sx={{ width: "100%" }}>
                                assigned to: {item.assigned_to_user}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ width: "100%", padding: 0, margin: 0 }}>
                            <Typography sx={{ width: "100%" }}>
                                assigned by: {item.activity_creator}
                            </Typography>
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
