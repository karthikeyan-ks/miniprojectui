import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardActions, Typography, Menu, MenuItem, Skeleton, Stack } from "@mui/material";
import "./existing.css";
import '../App.css';
import FloatingActionBar from "../components/FloatingActionBar";
import { List, ListItem, Popper, Box, Fade, IconButton } from "@mui/material";
import { Delete, Edit, MoreVert, Restore } from "@mui/icons-material";
import BasicModal from "../components/Modal";
import { Link } from "react-router-dom";
import { MyContext } from "../components/Connection";
import CreateModal from "../components/CreateActivity";
import { useNavigate } from "react-router-dom";
const navigateTo = (History) => {
    console.log("Navigating to:", History);
};
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
</style>



function Review() {
    const data = [
    ];
    const [Machineoptions, setMachineOption] = useState([])
    const [Componentoptions, setComponentOption] = useState([]);
    const [ScheduleOptions, setScheduleOption] = useState([])
    const [Useroptions, setUserOption] = useState([])
    const navigate=useNavigate()
    const { socket, setModal } = useContext(MyContext)
    const [Item, setItem] = useState(null)
    useEffect(() => {
        let intervalid = setInterval(() => {
            if (socket != null) {
                if (socket.readyState === WebSocket.OPEN) {
                    clearInterval(intervalid)
                    console.log("connected..", localStorage.getItem('login'));
                    var data = JSON.parse(localStorage.getItem('login'))
                    data['activity'] = 'activity';
                    socket.send(JSON.stringify(data))
                    socket.onmessage = (msg) => {
                        if (msg.data != null) {
                            console.log(msg.data)
                            let data = JSON.parse(msg.data)
                            if (data.actvity_status_id == 4) {
                                setDataList((prev) => [...prev, JSON.parse(msg.data)])
                                setLoading(false)
                            }
                            else if (data.type == "machine") {
                                console.log(data);
                                setMachineOption((prev) => [...prev, data])
                            } else if (data.type === 'component') {
                                console.log(data);
                                setComponentOption((prev) => [...prev, data])
                            } else if (data.type === 'schedule') {
                                console.log(data)
                                setScheduleOption((prev) => [...prev, data])
                            } else if (data.activity_id > 0 && data.create != null) {
                                console.log("activity reached...")
                                appendActivity(data)
                            } else if (data[0] != null) {
                                console.log(data)
                                setUserOption(data)
                            } else if (data.modal == 'Activity') {
                                setModal((prev) => !prev)
                            } else if (data.type != null && data.type == 'send_database_client') {
                                appendActivity(data.message)
                            }
                        } 
                    }
                } else if (socket.readyState === WebSocket.CONNECTING) {
                    console.log("Connecting...")

                }
            }
            return () => {
                if (socket) {
                    socket.onmessage = null
                    console.log("socket set to null...")
                }
            }
        }, 1000)

    }, [socket])

    useEffect(() => {

    }, [ScheduleOptions])

    const [datalist, setDataList] = useState([]);
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [popperStr, setPopperstr] = useState()
    const [openModal, setOpenModal] = useState()
    const [loading, setLoading] = useState(true)
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
        console.log("mouseEnter", open, event.currentTarget.id)
        if (event.currentTarget.id == 1) {
            setPopperstr("Reset the activity to inert state")
        } else if (event.currentTarget.id == 2) {
            setPopperstr("delete the activity")
        } else if (event.currentTarget.id == 3) {
            setPopperstr("edit")
            console.log(3)
        }
    };
    const appendActivity = (data) => {
        console.log(data, datalist)
        setDataList((prev) => [...prev.filter((item) => item.activity_id != data.activity_id), data])
    }
    const RemoveActivity = (item) => {
        const filtered = datalist.filter((i) => i.activity_name != item.activity_name)
        setDataList(filtered)
    }
    const handleMouseLeave = () => {
        setAnchorEl(null);
        setOpen(false);
        console.log("mouseLeaves", open)
    };
    const handleCardClick = (eve, item) => {
        setOpenModal(!openModal)
        console.log(openModal)
    }
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? 'spring-popper' : undefined;

    useEffect(() => {
        const dataView1 = datalist.map(item =>
            <Card variant="outlined"
                key={item.id}
                onClick={(eve)=>{
                    console.log("item clicked",item)
                    localStorage.setItem('item',item.activity_id)
                    navigate('/report')
                }}
                sx={{ mb: 2, width: "90%", padding: "0px", margin: "5px", bgcolor: 'primary' }}
            >
                <CardHeader
                    sx={{ width: "fit-content", height: "fit-content", width: "100%", padding: "5px", paddingLeft: '16px', margin: "1px", display: "flex", justifyContent: "space-between" }}
                    title={<Typography variant="h6" component={"div"} sx={{ letterSpacing: "0.1rem", fontFamily: 'Open sans' }}>{item.activity_name}</Typography>}
                    subheader={<Typography variant="body2" sx={{ letterSpacing: "0.1rem", fontSize: "15px", fontFamily: 'Open sans' }} fontFamily={'Roboto'} color="primary.black">
                        {item.activity_descrption}
                    </Typography>}
                    action={
                        (<div>
                            <IconButton
                                onClick={(eve) => {
                                    setItem(item)
                                    console.log("selected a item...", item)
                                }}
                                id="3"
                                aria-label="edit"
                                aria-haspopup="menu"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                <Edit />
                            </IconButton>
                            <Menu
                                id="menu-appbar"

                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                                <MenuItem onClick={() => {
                                }}>History</MenuItem>
                            </Menu>
                        </div>)

                    }
                >
                </CardHeader>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-start', padding: 0, margin: 0 }}>
                    <List sx={{ display: "flex", flexDirection: "row", width: "100%", padding: 0, margin: 0 }}>
                        <ListItem sx={{ width: "100%", paddingLeft: 1, margin: 0 }}>
                        </ListItem>
                        <ListItem sx={{ width: "100%", paddingLeft: 1, margin: 0 }}>
                            <Typography sx={{ width: "100%", fontWeight: 'light', fontFamily: 'Poppin,"Schibsted Grotesk"', fontSize: '14px' }}>
                                {Math.floor((new Date().getTime() - new Date(item.activity_last_reported).getTime()) / (1000 * 60 * 60 * 24))}/{item.schedule_value} days left
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ width: "100%", paddingLeft: 1, margin: 0 }}>
                            <Typography sx={{ width: "100%", fontWeight: 'light', fontFamily: 'Poppin,"Schibsted Grotesk"', fontSize: '14px' }}>
                                Assigned to: {item.assigned_to_user}
                            </Typography>
                        </ListItem>
                        <ListItem sx={{ width: "100%", paddingLeft: 1, margin: 0 }}>
                            <Typography sx={{ width: "100%", fontWeight: 'light', fontFamily: 'Poppin,"Schibsted Grotesk"', fontSize: '14px' }}>
                                Assigned by: {item.activity_creator}
                            </Typography>
                        </ListItem>
                    </List>
                </CardActions>
                <Popper
                    sx={{ zIndex: 1000, bgcolor: '#013220' }}
                    id={item.id}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={100}>
                            <Box sx={{ zIndex: 1000, border: 1, p: 1, bgcolor: 'primary.black', color: '#fff' }}>
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
        <Box sx={{
            bgcolor: 'primary',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Link to={"https://fonts.googleapis.com/css2?family=Roboto:wght@200;500;700&display=swap"} />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:200,400i,700,700i&display=swap" />
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"></link>
            <h4 >Existing Activity</h4>
            {datalist.length == 0 ? "No Activity found" : null}
            {!loading ? list : (
                <Stack spacing={1} width={"100%"} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" height={100} sx={{ width: "90%" }} />
                    <Skeleton variant="rounded" sx={{ width: "90%" }} />
                </Stack>
            )}
            <FloatingActionBar onClick={(eve) => {
                setModal((prev) => !prev)
            }} />
            <CreateModal appendActivity={appendActivity} Machineoptions={Machineoptions} Componentoptions={Componentoptions} ScheduleOptions={ScheduleOptions} />
            <BasicModal appendActivity={RemoveActivity} item={Item} setItem={setItem} Machineoptions={Machineoptions} Componentoptions={Componentoptions} ScheduleOptions={ScheduleOptions} Useroptions={Useroptions} />
        </Box>
    );
}

export default Review;
