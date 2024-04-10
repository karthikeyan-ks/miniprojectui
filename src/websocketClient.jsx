import { useEffect, useState } from 'react';    
function WebSocketComponent({handleMessage,message}) {
    const [msg,setMessage] =useState(message)
    const [socket,setSocket] = useState(null)
    if(message!==msg)
        setMessage(message)
    useEffect(() => {
        console.log("before",message)
        if(socket===null){
            setSocket(new WebSocket('ws://127.0.0.1:8000/chat/userid/'))
        }
        else{
            socket.send(JSON.stringify(msg))
        }
        //setMessage(message)
        console.log("after",message)
    }, [msg]);
    useEffect(()=>{
        if(socket!==null){
            socket.addEventListener("open", event => {
                console.log("Connection established...")
            });
            socket.addEventListener("message", event => {
                console.log("Message from server ", event.data)
                handleMessage(event.data)
            });
        }
    },[socket])

    return 
}

export default WebSocketComponent;
