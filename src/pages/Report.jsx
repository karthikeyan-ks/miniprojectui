import React, { useContext, useEffect, useState } from "react";
import { Box, ImageListItem, Paper, Typography } from "@mui/material";
import { MyContext } from "../components/Connection";
import { Card } from "react-bootstrap";
export const Report = () => {
    let id = localStorage.getItem('item')
    console.log(id, typeof (id))
    const { socket } = useContext(MyContext)
    const [response, setResponse] = useState([])
    const [activityName, setActivityName] = useState('')
    useEffect(() => {
        response.map((item) => {
            console.log(item['reports-all'])
            setActivityName(item['activity-name'])
            
        })
    }, [response])
    useEffect(() => {
        let intervalid = setInterval(() => {
            if (socket != null) {
                if (socket.readyState === WebSocket.OPEN) {
                    clearInterval(intervalid)
                    console.log("connected..", localStorage.getItem('login'));
                    var data = JSON.parse(localStorage.getItem('login'))
                    data['report-get'] = -1;
                    socket.send(JSON.stringify(data))
                    socket.onmessage = (msg) => {
                        if (msg.data != null) {
                            console.log(msg.data)
                            let data = JSON.parse(msg.data)
                            if (data.report_user_id > 0) {
                                console.log(data)
                                setResponse(prevResponse => [...prevResponse, data]);
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

    return (
        <Box>
            <Typography variant="h3">{activityName}</Typography>
            {
                response.map((item, index) => (
                    <Paper sx={{
                        width:"100%"
                    }} key={index}>
                        <Typography>text</Typography> 
                        {
                        item['reports-all']['text'].map((i)=>(
                            <Card>
                                {i}
                            </Card>
                        ))
                        }
                        {}
                        <Typography>image</Typography> 
                        {
                            
                        item['reports-all']['image'].map((i)=>(
                            <ImageListItem>
                                <img
                                    src={'http://127.0.0.1:8000'+i.replace('/home/acer/Maintenance-server','')}
                                />
                            </ImageListItem>
                        ))
                        }
                    </Paper>
                ))
            }

        </Box>
    )
}