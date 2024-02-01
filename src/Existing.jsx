import React, { useEffect, useState } from "react";
import "./existing.css"
function Existing() {

    const data = [
        {
            name: "Activity 1",
            descritpion: "contains the description about the activty 1",
            id: 1
        },
        {
            name: "Activity 2",
            descritpion: "contains the description about the activty 2",
            id: 2
        },
        {
            name: "Activity 3",
            descritpion: "contains the description about the activty 3",
            id: 3
        }
    ]
    const [datalist, setDataList] = useState(data)
    useEffect(() => {
        const dataView1 = datalist.map(element =>
            <div className='list-group-it' key={"1" + element.id}>
                <div className="container divsep" key={"2" + element.id}>
                    <div className="header" key={"3" + element.id}>
                        <h4 key={"4" + element.id}>{element.name}</h4>
                        <scan key={"5" + element.id}>{element.id}</scan>
                    </div>
                    <div className="body" key={"6" + element.id}>{element.descritpion}</div>
                    <div className="footer" key={"7" + element.id}>
                        footer
                    </div>
                </div>
            </div>
        )
        setList(dataView1)
    }, [datalist])

    const dataView = datalist.map(element =>
        <div className='list-group-it' key={"1" + element.id}>
            <div className="container divsep" key={"2" + element.id}>
                <div className="header" key={"3" + element.id}>
                    <h4 key={"4" + element.id}>{element.name}</h4>
                    <scan key={"5" + element.id}>{element.id}</scan>
                </div>
                <div className="body" key={"6" + element.id}>{element.descritpion}</div>
                <div className="footer" key={"7" + element.id}>
                    footer
                </div>
            </div>
        </div>
    )
    const [list, setList] = useState(dataView)
    return (<div className="container-fluid">
        <body data-spy="scroll" className='listexisting'>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,700,700i&display=swap"></link>
            <h3 className=''>Existing activity</h3>
            <div className="col-sm-10 dropdown-content">
                <input type="search" className="search" rows={5} id="pwd" placeholder=" Search activity" onChange={(event) => {
                    console.log(event.target.value)
                    let newData = []
                    datalist.forEach(element => {
                        console.log(element.name, element.name.includes(event.target.value))
                        if (element.name.includes(event.target.value)) {
                            newData.push(element)
                        }
                    });
                    console.log(newData)
                    if (event.target.value.length !== 0)
                        setDataList(newData)
                    else
                        setDataList(data)
                    console.log(list)
                    const dataView = data.map(element =>
                        <div className='list-group-it' key={"1" + element.id}>
                            <div className="container divsep" key={"2" + element.id}>
                                <div className="header" key={"3" + element.id}>
                                    <h4 key={"4" + element.id}>{element.name}</h4>
                                    <scan key={"5" + element.id}>{element.id}</scan>
                                </div>
                                <div className="body" key={"6" + element.id}>{element.descritpion}</div>
                                <div className="footer" key={"7" + element.id}>
                                    footer
                                </div>
                            </div>
                        </div>
                    )
                    setList(dataView)
                }} />
            </div>
            <ul className='list-group space'>
                {list}
            </ul>
        </body>

    </div >)
}
export default Existing