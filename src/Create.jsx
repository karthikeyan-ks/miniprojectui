import React from "react";
import './App.css'
import './Create.css'
import FloatingActionBar from "./components/FloatingActionBar";

function Create() {
    console.log("rendering")
    return (
        <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="section">
              <h4 className="h4">Section Title</h4>
              <p>This is a Materialize section.</p>
            </div>
          </div>
        </div>
        <FloatingActionBar/>
      </div>
    )
}
export default Create