import React, { createContext, useEffect } from "react";
import { useState } from "react";
export const MyContext = createContext()
const MyProvider = ({ children }) => {
    const [Machineoptions,setMachineOption]=useState([])
   
    const [Useroptions,setUserOption]=useState([])
    const [Componentoptions,setComponentOption]=useState([])
    const [ScheduleOptions,setScheduleOption]=useState([])
    const [response, setresponse] = useState({
        login: null,
    });
    const handleMachine =()=>{
        socket.send(JSON.stringify({
            user_id:response.login.user_id,
            machine:"machine"
        }))
    }
    const createActivity = (activity)=>{
        console.log(activity)
        socket.send(JSON.stringify(activity))
    }
    const handleComponents =()=>{
        socket.send(JSON.stringify({
            user_id:response.login.user_id,
            component:"component"
        }))
    }
    const searchUser=(str)=>{
        socket.send(JSON.stringify({
            username:response.login['username'],
            users:str
        }))
    }
    const editActivity = (str) =>{
        console.log("edit activity clicked...")
        socket.send(JSON.stringify(
            str
        ))
    }
    const handleSchedules =()=>{
        socket.send(JSON.stringify({
            user_id:response.login.user_id,
            schedule:"schedule"
        }))
    }
    const [modal,setModal]=useState(false)
    useEffect(()=>{
        console.log("change in exisiting",response.existing)
    },[response])
    const [socket, setSocket] = useState(null); // Track WebSocket state
    useEffect(()=>{
        console.log(Machineoptions)
    },[Machineoptions])
    useEffect(() => {
        console.log("connection....");
        const newSocket = new WebSocket('ws://127.0.0.1:8000/chat/userid/');
        setSocket(newSocket)
        return () => {
            if (socket) {
                socket.close();
            }
        };

    }, []);
    useEffect(() => {
        if (socket != null) {
            socket.onopen = () => {
                console.log("Connection Established....")
                setSocket(socket)
            }
        }
    }, [socket])
    return (
        <MyContext.Provider value={{ response, setresponse, socket ,modal,setModal,handleMachine,Machineoptions,Componentoptions,handleComponents,handleSchedules,ScheduleOptions,createActivity,Useroptions,searchUser,editActivity}}>
            {children}
        </MyContext.Provider>
    );
};
export default MyProvider;
/* socket.onmessage = (msg) => {
                    let msgdata = JSON.parse(msg.data)
                    console.log(msgdata)
                    if (msgdata.activity_id != null && msgdata.actvity_status_id == 1) {
                        console.log("called")
                        setresponse((prevState) => ({
                            ...prevState,
                            existing: [...prevState.existing, msgdata], // Spread operator to create a new array
                        }));
                    }else if (msgdata.activity_id != null && msgdata.actvity_status_id == 2) {
                        console.log("called")
                        setresponse((prevState) => ({
                            ...prevState,
                            existing: [...prevState.existing, msgdata], // Spread operator to create a new array
                        }));
                    }else if (msgdata.activity_id != null && msgdata.actvity_status_id == 3) {
                        console.log("called")
                        setresponse((prevState) => ({
                            ...prevState,
                            existing: [...prevState.existing, msgdata], // Spread operator to create a new array
                        }));
                    }else if (msgdata.activity_id != null && msgdata.actvity_status_id == 4) {
                        console.log("called")
                        setresponse((prevState) => ({
                            ...prevState,
                            existing: [...prevState.existing, msgdata], // Spread operator to create a new array
                        }));
                    }else if(msgdata.id!=null && msgdata.actvity_status_id ==null && msgdata.type=="machine"){
                        console.log("Machines are fetching...")
                        setMachineOption((prev)=>[...prev,msgdata  ])
                    }else if(msgdata.id!=null && msgdata.actvity_status_id ==null&& msgdata.type=="component"){
                        console.log("Components are fetching...")
                        setComponentOption((prev)=>[...prev,msgdata  ])
                    }else if(msgdata.id!=null && msgdata.actvity_status_id ==null&& msgdata.type=="schedule"){
                        console.log("Schedules are fetching...")
                        setScheduleOption((prev)=>[...prev,msgdata  ])
                    }else if(msgdata.callback!=null){
                        console.log(msgdata.callback)
                    }else if(msgdata.length!=null){
                        console.log("user updating..")
                        setUserOption(msgdata)
                    }else{
                        setresponse({...response,login:msgdata})
                    }
                }*/