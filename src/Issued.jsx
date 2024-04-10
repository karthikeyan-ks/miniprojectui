import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./existing.css";
import './App.css';
import FloatingActionBar from "./components/FloatingActionBar";

function Existing() {
    const data = [
        {
            name: "Activity 1",
            description: "contains the description about the activty 1",
            id: 1
        },
        {
            name: "Activity 2",
            description: "contains the description about the activty 2",
            id: 2
        },
        {
            name: "Activity 3",
            description: "contains the description about the activty 3",
            id: 3
        }
    ];

    const [datalist, setDataList] = useState(data);

    useEffect(() => {
        const dataView1 = datalist.map(item =>
            <Card key={item.id} className="card">
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Footer>22-10-2020</Card.Footer>
                </Card.Body>
            </Card>
        );
        setList(dataView1);
    }, [datalist]);

    const [list, setList] = useState([]);

    return (
        <div className="container-fluid">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap" />
            <h3 className=''>Issued activity</h3>
            {list}
            <FloatingActionBar/>
        </div>
    );
}

export default Existing;
