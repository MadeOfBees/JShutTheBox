import * as React from 'react';
import DrawBoard from '../Components/DrawBoard';
import { Box, Button, Grid, Modal, Stack, Input } from '@mui/material';

export default function MainApp() {
    const [open, setOpen] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);
    const [secondModalContent, setSecondModalContent] = React.useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleCloseSecond = () => setOpenSecond(false);
    const style = { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4, };
    const [userInput, setUserInput] = React.useState(0);
    const [refreshNum, setRefreshNum] = React.useState(0);
    const [totalPlayers, setTotalPlayers] = React.useState(0);

    const takeUserInput = () => {
        if (isNaN(userInput)) {
            drySecondModal("You need to enter a number!");
        } else if (userInput > 12) {
            drySecondModal("You can't have more than 12 players!");
        } else if (userInput < 1) {
            drySecondModal("You need at least 1 player to play this game!");
        } else {
            setRefreshNum(refreshNum + 1);
            setTotalPlayers(userInput);
            handleClose();
        }
    };

    const drySecondModal = (type) => {
        setSecondModalContent(type);
        handleClose();
        setOpenSecond(true);
    };

    return (
        <div >
            {totalPlayers ? <DrawBoard playerTotal={totalPlayers} refreshNum={refreshNum} /> : <Box sx={{ flexGrow: 2 }} style={{ marginTop: '20%' }}><Grid container spacing={2} justifyContent="center" alignItems="center" style={{ marginTop: '5%' }}><Button variant="contained" onClick={handleOpen}>Open The Box</Button></Grid></Box>}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Stack>
                        <h1>How many players?</h1>
                        <Input placeholder="1 is the minimum" onChange={(e) => setUserInput(e.target.value)} />
                        <Button variant="contained" onClick={takeUserInput} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>Submit</Button>
                    </Stack>
                </Box>
            </Modal>
            <Modal open={openSecond} onClose={handleCloseSecond} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>{secondModalContent}</Box>
            </Modal>
        </div>
    );
}
