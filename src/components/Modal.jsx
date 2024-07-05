import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useContext } from 'react';
import { MyContext } from './Connection';
import { useState } from 'react';
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap');
</style>

const style = {
    display: "flex",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "fit-content",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"

};
const typoStyle = {
    width: "100%",
    margin: 1
}

export default function BasicModal({ item, openModal, setItem, appendActivity, Machineoptions, Componentoptions, ScheduleOptions, Useroptions }) {
    const { socket } = useContext(MyContext)
    const [MachineValue, setMachineValue] = React.useState('');
    const [MachineInputValue, setMachineInputValue] = React.useState('');
    const [ComponentValue, setComponentValue] = React.useState('');
    const [ComponentInputValue, setComponentInputValue] = React.useState('');
    const [ScheduleValue, setScheduleValue] = React.useState('');
    const [ScheduleInputValue, setScheduleInputValue] = React.useState('');
    const [activityName, setActivityName] = useState('')
    const [userInputValue, setUserInputValue] = useState('')
    const [userValue, setUserValue] = useState('')
    const [activityDescrition, setActivityDescription] = useState('')
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setItem(null)
        setOpen(!open)
    }
    useEffect(() => {
        console.log(open)
        if (open) {
            if (socket != null) {
                if (socket.readyState === WebSocket.OPEN) {
                    if (ScheduleOptions.length <= 0) {
                        console.log("openning ....")
                        let user = localStorage.getItem('login')
                        user = JSON.parse(user)
                        user['machine'] = 'machine'
                        socket.send(JSON.stringify(user))
                        user = localStorage.getItem('login')
                        user = JSON.parse(user)
                        user['component'] = 'component'
                        socket.send(JSON.stringify(user))
                        user = localStorage.getItem('login')
                        user = JSON.parse(user)
                        user['schedule'] = 'schedule'
                        socket.send(JSON.stringify(user))
                    }
                }
            }
        }
    }, [open])


    useEffect(() => {
        console.log("item", item)
        if (item != null) {
            setOpen(!open)
            setActivityName(item.activity_name)
            setActivityDescription(item.activity_descrption)
            if (Machineoptions != null && Componentoptions != null && ScheduleOptions != null) {
                console.log(Useroptions)
                setMachineValue(Machineoptions[item.activity_machine_id])
                setComponentValue(Componentoptions[item.activity_component_id])
                setScheduleValue(ScheduleOptions[item.activity_schedule_id])
            }
        }
    }, [item])
    const editActivity = (activity) => {
        socket.send(JSON.stringify(activity));
    }
    const searchUser = (str) => {
        console.log(str)
        if (socket != null) {
            if (socket.readyState == WebSocket.OPEN) {
                let data = {}
                data['users'] = str
                console.log(data)
                socket.send(JSON.stringify(data))
            }
        }

    }
    useEffect(() => {
        console.log(activityDescrition, activityName)
    }, [activityName, activityDescrition])
    useEffect(() => {
        let intervalid = setInterval(() => {
            console.log("modal is trying best to connect...")
            if (socket != null) {
                if (socket.readyState === WebSocket.OPEN) {
                    clearInterval(intervalid)

                } else if (socket.readyState === WebSocket.CONNECTING) {
                    console.log("Connecting...")
                }

            } else {
                clearInterval(intervalid)
            }
        });

    }, [socket])
    useEffect(() => {
        if (item != null) {
            console.log(Useroptions)
            setMachineValue(Machineoptions[item.activity_machine_id])
            setComponentValue(Componentoptions[item.activity_component_id])
            setScheduleValue(ScheduleOptions[item.activity_schedule_id])
        }
        console.log(ScheduleOptions)
    }, [ScheduleOptions])
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}
                    id="modal-modal-title" variant="h6" component="h2">
                    Edit Actiivty
                </Typography>
                <TextField

                    multiline
                    rows={1}
                    value={activityName}
                    onChange={(eve) => {
                        setActivityName(eve.currentTarget.value)
                    }}
                    sx={typoStyle}
                    label="enter the activity name1">

                </TextField>
                <TextField
                    multiline
                    value={activityDescrition}
                    rows={4}
                    onChange={(eve) => {
                        setActivityDescription(eve.currentTarget.value)
                    }}
                    sx={typoStyle}
                    label="enter the activity decription">

                </TextField>
                <Autocomplete
                    value={userValue}
                    onChange={(event, newValue) => {
                        console.log(newValue, "machine value")
                        setUserValue(newValue)
                    }}
                    inputValue={userInputValue}
                    onInputChange={(event, newInputValue) => {
                        searchUser(newInputValue)
                        setUserInputValue(newInputValue);
                    }}
                    id="controllable-component"
                    options={Useroptions}
                    getOptionLabel={(option) => option.username}
                    sx={{ width: "100%", padding: 2 }}
                    renderInput={(params) => <TextField {...params} label="Select User" />}
                />
                <Autocomplete
                    value={MachineValue}
                    onChange={(event, newValue) => {
                        console.log(newValue, "machine value")
                        setMachineValue(newValue);
                    }}
                    inputValue={MachineInputValue}
                    onInputChange={(event, newInputValue) => {
                        console.log(newInputValue, "input value")
                        setMachineInputValue(newInputValue);
                    }}
                    id="controllable-component"
                    options={Machineoptions}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "100%", padding: 2 }}
                    renderInput={(params) => <TextField {...params} label="Select Machine" />}
                />
                <Autocomplete
                    value={ComponentValue}
                    onChange={(event, newValue) => {
                        console.log(newValue, "machine value")
                        setComponentValue(newValue);
                    }}
                    inputValue={ComponentInputValue}
                    onInputChange={(event, newInputValue) => {
                        setComponentInputValue(newInputValue);
                    }}
                    id="controllable-component"
                    options={Componentoptions}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "100%", padding: 2 }}
                    renderInput={(params) => <TextField {...params} label="Select component" />}
                />
                <Autocomplete
                    value={ScheduleValue}
                    onChange={(event, newValue) => {
                        console.log(newValue, "machine value")
                        setScheduleValue(newValue);
                    }}
                    inputValue={ScheduleInputValue}
                    onInputChange={(event, newInputValue) => {
                        setScheduleInputValue(newInputValue);
                    }}
                    id="controllable-component"
                    options={ScheduleOptions}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: "100%", padding: 2 }}
                    renderInput={(params) => <TextField {...params} label="Select schedule" />}
                />
                <Button
                    variant='contained'
                    onClick={(eve) => {
                        let userData = JSON.parse(localStorage.getItem('login'))
                        let data = {
                            activity: {
                                activity_id: item.activity_id,
                                activity_name: activityName,
                                assigned_to_user: userValue != null && userValue.username != null ? userValue.username : "None",
                                activity_assigned_to: userValue != null && userValue.userid != null ? userValue.userid : 0,
                                activity_description: activityDescrition,
                                activity_machine_id: MachineValue.id,
                                activity_component_id: ComponentValue.id,
                                activity_schedule_id: ScheduleValue.id,
                                schedule_value: 10
                            }, username: userData['username'],
                            password: userData['password'],
                            update: 'update'
                        }
                        console.log(data)
                        editActivity(data)
                    }}
                >
                    Edit Activity
                </Button>

            </Box>
        </Modal>
    );
}