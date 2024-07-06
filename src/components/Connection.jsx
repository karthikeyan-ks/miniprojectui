import React, { createContext, useEffect } from "react";
import { useState } from "react";
export const MyContext = createContext()
const MyProvider = ({ children }) => {
    const [Machineoptions,setMachineOption]=useState([])
    const [modal2,setModal2]=useState(false)
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
    const [socket, setSocket] = useState(null); 
    useEffect(()=>{
        console.log(Machineoptions)
    },[Machineoptions])
    useEffect(() => {
        let user_id=JSON.parse(localStorage.getItem('login')) == null?"":JSON.parse(localStorage['login']).user_id
        console.log("connection....",user_id);
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
        <MyContext.Provider value={{ response,  socket,setSocket ,modal,setModal,Machineoptions,Componentoptions,ScheduleOptions,Useroptions,modal2,setModal2}}>   
            {children}
        </MyContext.Provider>
    );
};
export default MyProvider;
