import React, { useContext } from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from './Connection';

const FloatingActionBar=()=>{
    const {setModal,modal}=useContext(MyContext)
    const navigate=useNavigate()
    const goToHistoryPage=()=> {
        //this.props.navigateTo('/history');
        //navigate("/history")
        setModal(!modal)
        console.log(modal)
    }
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <Fab color="primary" aria-label="add" onClick={goToHistoryPage}>
                <Add />
            </Fab>
        </div>
    );

    
}

export default FloatingActionBar;
