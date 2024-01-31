import { Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import './App.css'
import './Create.css'
function Create() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (show) {
            document.getElementById("root").style.background = "grey"
            document.getElementById("root").style.filter = "blur(5px)"

        } else {
            document.getElementById("root").style.filter = "none"
            document.getElementById("root").style.background = "white"
        }
    }, [show])

    return (
        <div className="container-fluid">
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <body data-spy="scroll" data-target="#myScrollspy" data-offset="100" className="content">
                <h1>Create activity</h1>
                <div className="container">
                    <div className="row">
                        <nav className="col-sm-3" id="myScrollspy">
                            <ul className="nav nav-pills nav-stacked">
                                <li><a href="#section1">activity details</a></li>
                                <li><a href="#section2">activity schedule details</a></li>
                                <li><a href="#section3">activity assign details</a></li>
                            </ul>
                        </nav>
                        <div className="col-sm-9 bottom black">
                            <div id="section1">
                                <h3>activity details</h3>
                                <div className="jumbotron content">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="email">activity Name :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="email" placeholder="Enter activity name" />

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="pwd">activity description :</label>
                                            <div className="col-sm-10">
                                                <textarea className="form-control" rows={5} id="pwd" placeholder="enter decription" />
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div id="section2">
                                <h3>activity schedule details</h3>
                                <div className="jumbotron content">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="email">activity machine  :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" id="email" placeholder="enter machine" list="dataset" />
                                                <datalist id="dataset">
                                                    <option value={"Machine 1"}></option>
                                                    <option value={"Machine 2"}></option>
                                                    <option value={"Machine 3"}></option>
                                                </datalist>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="pwd">activity component type :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" rows={5} id="pwd" placeholder="enter component" list="dataset1" />
                                                <datalist id="dataset1">
                                                    <option value={"Component 1"}></option>
                                                    <option value={"Component 2"}></option>
                                                    <option value={"Component 3"}></option>
                                                </datalist>
                                            </div>

                                        </div>
                                        <div className="form-group">
                                            <label className="control-label col-sm-2" for="pwd">actiivity schedule type :</label>
                                            <div className="col-sm-10">
                                                <input type="text" className="form-control" rows={5} id="pwd" placeholder="enter schedule type" list="dataset2" />
                                                <datalist id="dataset2">
                                                    <option value={"schedule 1"}></option>
                                                    <option value={"schedule 2"}></option>
                                                    <option value={"schedule 3"}></option>
                                                </datalist>
                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                            <div id="section3" className="fix">
                                <h3>Activity assign details</h3>
                                <div className="jumbotron content">
                                    <div className="form-group dropdown">
                                        <label className="control-label col-sm-2" for="pwd">actiivity schedule type :</label>
                                        <div className="col-sm-10 dropdown-content">
                                            <input type="search" className="form-control" rows={5} id="pwd" placeholder="search user" />
                                            <a href="a">a</a>
                                            <a href="a">a</a>
                                            <a href="a">a</a>
                                        </div>
                                    </div>
                                </div>
                                <h3>Submit</h3>
                                <p>clicking this button a new activity will be create the assign user will be default for this activity</p>
                                <Button variant="primary" onClick={handleShow}>
                                    create activity
                                </Button>
                                <Modal
                                    style={{ opacity: 1 }}
                                    show={show}
                                    onHide={handleClose}
                                    backdrop="false"
                                    keyboard={false}
                                    size="lg"
                                    fade={false}
                                    className="custom"
                                    fullscreen="true"

                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title><p>activity insertion</p></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="mbody">
                                        I will not close if you click outside me. Do not even try to press
                                        escape key.
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            ok
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>


            </body >

        </div >
    )
}
export default Create