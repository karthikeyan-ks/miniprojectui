import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { TextField } from '@mui/material';

const style = {
    display: "flex",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"

};
const typoStyle = {
    width: "90%"
}

export default function BasicModal({ openModal }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        setOpen(openModal)
    }, [openModal])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        sx={{ display: "flex", justifyContent: "center" }}

                        id="modal-modal-title" variant="h6" component="h2">
                        Edit the Actiivty
                    </Typography>
                    <TextField
                        sx={typoStyle}
                        variant='standard'
                        InputProps={{ disableUnderline: true }}
                        label="enter the activity name">

                    </TextField>
                    <TextField sx={typoStyle} label="enter the activity decription">

                    </TextField>
                    <TextField sx={typoStyle} label="enter the activity ">

                    </TextField>
                    <Button>
                        change
                    </Button>

                </Box>
            </Modal>
        </div>
    );
}