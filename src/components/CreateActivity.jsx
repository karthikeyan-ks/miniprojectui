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
import { Paper } from '@mui/material';
import { forwardRef } from 'react';

const ForwardAutocomplete = forwardRef((props, ref) => (
    <Autocomplete {...props} ref={ref} />
));

const style = {
    display: "flex",
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "fit-content",
    scroll: "paper",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px",
    padding: 2

};
const typoStyle = {
    width: "95%",
    margin: 2,
}

export default function CreateModal({ appendActivity, Machineoptions, Componentoptions, ScheduleOptions }) {

    const { socket, modal, setModal } = useContext(MyContext)
    const [MachineValue, setMachineValue] = React.useState('');
    const [MachineInputValue, setMachineInputValue] = React.useState('');
    const [ComponentValue, setComponentValue] = React.useState('');
    const [ComponentInputValue, setComponentInputValue] = React.useState('');
    const [ScheduleValue, setScheduleValue] = React.useState('');
    const [ScheduleInputValue, setScheduleInputValue] = React.useState('');
    const [activityName, setActivityName] = useState('')
    const [activityDescrition, setActivityDescription] = useState('')
    const handleClose = () => {
        setModal(!modal)
    }
    useEffect(() => {
        if (socket != null) {
            if (socket.readyState === socket.OPEN) {
                if (ScheduleOptions.length <= 0) {
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
    }, [modal])
    useEffect(() => {
        console.log("change occuring", Machineoptions);
    }, [Machineoptions, Componentoptions, ScheduleOptions])
    useEffect(() => {
        let intervalid = setInterval(() => {
            if (socket != null) {
                if (socket.readyState === WebSocket.OPEN) {
                    clearInterval(intervalid)
                    socket.onmessage = (msg) => {
                        let data = JSON.parse(msg.data)
                        console.log(data)

                    }

                } else if (socket.readyState === WebSocket.CONNECTING) {

                }

            } else {

            }
            return () => {
                if (socket) {
                    socket.onmessage = null
                    console.log("socket set to null...")
                }
            }
        });

    }, [socket])

    const createActivity = (activity) => {
        socket.send(JSON.stringify(activity));
    }

    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ overflowY: "scroll" }}
            >
                <Paper sx={style}>
                    <Typography
                        sx={{ display: "flex", justifyContent: "center", alignItems: "start", width: "90%" }}
                        id="modal-modal-title" variant="h6" component="h2">
                        Create Actiivty
                    </Typography>
                    <TextField
                        value={activityName}
                        multiline
                        rows={2}
                        onChange={(eve) => {
                            setActivityName(eve.currentTarget.value)
                        }}
                        sx={typoStyle}
                        label="enter the activity name">

                    </TextField>
                    <TextField
                        value={activityDescrition}
                        multiline
                        rows={5}
                        scroll='paper'
                        onChange={(eve) => {
                            setActivityDescription(eve.currentTarget.value)
                        }}
                        sx={typoStyle}

                        label="enter the activity decription">

                    </TextField>
                    <ForwardAutocomplete
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
                    <ForwardAutocomplete
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
                    <ForwardAutocomplete
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
                            console.log("clicked")
                            let user = JSON.parse(localStorage.getItem('login'))
                            createActivity({
                                activity: {
                                    activity_name: activityName,
                                    activity_description: activityDescrition,
                                    activity_machine_id: MachineValue.id,
                                    activity_component_id: ComponentValue.id,
                                    activity_schedule_id: ScheduleValue.id,
                                    schedule_value: ScheduleValue.value
                                }, username: user['username'],
                                password: user['password'],
                                create: 'create'
                            })
                        }}
                    >
                        create Activity
                    </Button>

                </Paper>
            </Modal>
        </div>
    );
}