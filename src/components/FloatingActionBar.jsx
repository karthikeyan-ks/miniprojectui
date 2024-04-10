import React from "react";
import { Fab } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

function FloatingActionBar(props) {
    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <Fab color="primary" aria-label="add">
        <Add />
      </Fab>
      <Fab color="secondary" aria-label="delete" style={{ marginLeft: '10px' }}>
        <Delete />
      </Fab>
    </div>

    )
}
export default FloatingActionBar;