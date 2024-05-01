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

const style = {
    display: "flex",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "80%",
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
    margin:1
}

export default function CreateModal() {
    const [Machineoptions,setMachineOption]=useState([])
    const [Componentoptions,setComponentOption]=useState([]);
    const [ScheduleOptions,setScheduleOption]=useState([])
    const {socket,modal,setModal} = useContext(MyContext)
    const [MachineValue, setMachineValue] = React.useState('');
    const [MachineInputValue, setMachineInputValue] = React.useState('');
    const [ComponentValue, setComponentValue] = React.useState('');
    const [ComponentInputValue, setComponentInputValue] = React.useState('');
    const [ScheduleValue, setScheduleValue] = React.useState('');
    const [ScheduleInputValue, setScheduleInputValue] = React.useState('');
    const [activityName,setActivityName]=useState('')
    const [activityDescrition,setActivityDescription]=useState('')
    const handleClose=()=>{
        setModal(!modal)
    }
    useEffect(()=>{
        let intervalid=setInterval(()=>{
            if(socket!=null){
                if(socket.readyState===WebSocket.OPEN){
                    clearInterval(intervalid)
                    let user=localStorage.getItem('login')
                    user['machine']='machine'
                    socket.send(JSON.stringify(user))
                    user=localStorage.getItem('login')
                    user['component']='component'
                    socket.send(JSON.stringify(user))
                    user=localStorage.getItem('login')
                    user['schedule']='schedule'
                    socket.send(JSON.stringify(user))
                    socket.onmessage=(msg)=>{
                        console.log(msg.data)
                    }
    
                }else if(socket.readyState===WebSocket.CONNECTING){
    
                }
            }
        });
        
    },[])
    const createActivity=(activity)=>{
        socket.send(JSON.stringify(activity));
        socket.onmessage=(msg)=>{
            if(msg.data!=null){
                console.log(msg.data)
            }
        }
    }
    useEffect(()=>{
        let intervalid=setInterval(()=>{
            if(socket!=null){
                if(socket.readyState=== WebSocket.OPEN){
                    clearInterval(intervalid)
                    console.log("connected..");
                    var data=JSON.parse(localStorage.getItem('login'))
                    data['machine']='machine';
                    socket.send(JSON.stringify(data))
                    socket.onmessage=(msg)=>{
                        if(msg.data!=null){
                            console.log(msg.data)
                            let data=JSON.parse(msg.data)
                            
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
    return (
        <div>
            <Modal
                open={modal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}
                        id="modal-modal-title" variant="h6" component="h2">
                        Create Actiivty
                    </Typography>
                    <TextField
                        value={activityName}
                        onChange={(eve)=>{
                            setActivityName(eve.currentTarget.value)
                        }}
                        sx={typoStyle}
                        label="enter the activity name">

                    </TextField>
                    <TextField 
                    value={activityDescrition}
                    onChange={(eve)=>{
                        setActivityDescription(eve.currentTarget.value)
                    }}
                    sx={typoStyle} 
                    label="enter the activity decription">

                    </TextField>
                    <Autocomplete
                        value={MachineValue}
                        onChange={(event, newValue) => {
                            console.log(newValue,"machine value")
                            setMachineValue(newValue);
                        }}
                        inputValue={MachineInputValue}
                        onInputChange={(event, newInputValue) => {
                            console.log(newInputValue,"input value")
                            setMachineInputValue(newInputValue);
                        }}
                        id="controllable-component"
                        options={Machineoptions}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%",padding:2 }}
                        renderInput={(params) => <TextField {...params} label="Select Machine" />}
                    />
                     <Autocomplete
                        value={ComponentValue}
                        onChange={(event, newValue) => {
                            console.log(newValue,"machine value")
                            setComponentValue(newValue);
                        }}
                        inputValue={ComponentInputValue}
                        onInputChange={(event, newInputValue) => {
                            setComponentInputValue(newInputValue);
                        }}
                        id="controllable-component"
                        options={Componentoptions}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%",padding:2 }}
                        renderInput={(params) => <TextField {...params} label="Select component" />}
                    />
                     <Autocomplete
                        value={ScheduleValue}
                        onChange={(event, newValue) => {
                            console.log(newValue,"machine value")
                            setScheduleValue(newValue);
                        }}
                        inputValue={ScheduleInputValue}
                        onInputChange={(event, newInputValue) => {
                            setScheduleInputValue(newInputValue);
                        }}
                        id="controllable-component"
                        options={ScheduleOptions}
                        getOptionLabel={(option) => option.name}
                        sx={{ width: "100%" ,padding:2}}
                        renderInput={(params) => <TextField {...params} label="Select schedule" />}
                    />
                    <Button
                     variant='outlined'
                     onClick={(eve)=>{
                        console.log("clicked")
                        let user=JSON.parse(localStorage.getItem('login'))
                        createActivity({
                            activity:{
                                activity_name:activityName,
                                activity_description:activityDescrition,
                                activity_machine_id:MachineValue.id,
                                activity_component_id:ComponentValue.id,
                                activity_schedule_id:ScheduleValue.id,
                                schedule_value:ScheduleValue.value
                            },username:user['username'],
                            password:user['password'],
                            create:'create'
                        })
                     }}
                     >
                        create Activity
                    </Button>

                </Box>
            </Modal>
        </div>
    );
}