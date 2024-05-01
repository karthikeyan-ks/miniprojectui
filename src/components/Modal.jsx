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

export default function BasicModal({ item,openModal }) {
    const { modal, setModal ,Machineoptions,Componentoptions,ScheduleOptions,createActivity,response,Useroptions,searchUser,editActivity} = useContext(MyContext)
    const [MachineValue, setMachineValue] = React.useState('');
    const [MachineInputValue, setMachineInputValue] = React.useState('');
    const [ComponentValue, setComponentValue] = React.useState('');
    const [ComponentInputValue, setComponentInputValue] = React.useState('');
    const [ScheduleValue, setScheduleValue] = React.useState('');
    const [ScheduleInputValue, setScheduleInputValue] = React.useState('');
    const [activityName,setActivityName]=useState('')
    const [userInputValue,setUserInputValue]=useState('')
    const [userValue,setUserValue]=useState('')
    const [activityDescrition,setActivityDescription]=useState('')
    useEffect(()=>{
        console.log(Useroptions)
    },[Useroptions])
    useEffect(() => {
        console.log(Machineoptions)
        
        setOpen(modal)
    }, [modal])
    useEffect(()=>{
        console.log("createActivity refledted")
    },[Machineoptions])
    useEffect(() => {
        setOpen(modal)
    }, [modal])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setOpen(openModal)
    }, [openModal])

    return (
        <div>
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
                        value={userValue}
                        onChange={(event, newValue) => {
                            console.log(newValue,"machine value")
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
                        sx={{ width: "100%",padding:2 }}
                        renderInput={(params) => <TextField {...params} label="Select User" />}
                    />
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
                        console.log("clicked",item,userValue)
                        editActivity({
                            activity:{
                                activity_id:item.activity_id,
                                activity_name:activityName,
                                assigned_to_user:userValue.username,
                                activity_assigned_to:userValue.userid,
                                activity_description:activityDescrition,
                                activity_machine_id:MachineValue.id,
                                activity_component_id:ComponentValue.id,
                                activity_schedule_id:ScheduleValue.id,
                                schedule_value:ScheduleValue.value
                            },username:response.login['username'],
                            password:response.login['password'],
                            update:'update'
                        })
                     }}
                     >
                        Edit Activity
                    </Button>

                </Box>
            </Modal>
        </div>
    );
}