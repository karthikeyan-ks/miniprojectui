import React from 'react';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link } from "react-router-dom";

class FloatingActionBar extends React.Component {
    constructor(props) {
        super(props);
        // Bind the function to the component instance
        this.goToHistoryPage = this.goToHistoryPage.bind(this);
    }

    // Define the function inside the class
    goToHistoryPage() {
        // Use the navigateTo prop to navigate to the 'history' page
        this.props.navigateTo('/history');
    }

    render() {
        return (
            <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <Fab color="primary" aria-label="add" onClick={this.goToHistoryPage}>
                    <Add />
                </Fab>
            </div>
        );
    }
}

export default FloatingActionBar;
