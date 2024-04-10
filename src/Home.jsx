import React from "react";
import { Outlet } from "react-router-dom";

import './App.css'
function Home({handleProgress}) {
    return (
        <div className="App">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap"></link> 
            <Outlet />
            <footer>
            </footer>
        </div>
    )
}
export default Home;