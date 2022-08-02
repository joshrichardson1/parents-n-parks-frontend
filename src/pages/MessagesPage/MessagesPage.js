import React, { useEffect, useState } from 'react'
import DashDrawer from '../../components/Drawer/Drawer';
import MarkMsgAPI from '../../api/MarkMsgAPI';
import { Grid,Paper,TableContainer, Table, TableBody, TableCell, Button, TableHead, tableCellClasses, styled, TableRow, Modal, Box, Typography } from '@mui/material/';
import SendMessageForm from '../../components/SendMessageForm/SendMessageForm';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));





const MessagesPage = () =>{
   
    const [messages, setMessages] = useState([]) 
    const [openSend, setSend] = useState(false);
    const handleOpenSend = () => setSend(true);
    const handleCloseSend = () => setSend(false);

    const [message, setMessage] = useState({sender:"", receiver:"", date_time:"", subject:"",message:""})
    const [msgOpen, setMsgOpen] = useState(false);
    const handleOpenOpen = () => setMsgOpen(true);
    const handleCloseOpen = () => setMsgOpen(false);




    const getMessages = async () => {
        const response = await fetch ('http://parents-n-parks-2.herokuapp.com/messagelist/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem('accessToken')
            },

        });

        return response.json();
    }



    useEffect(() => {
        getMessages().then(data => {
            setMessages(data)
        }
        )
    }, [msgOpen, openSend]);


    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 500,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const defaultProfilePic = "https://cp-pnp-bucket.s3.amazonaws.com/90/no-profile-image.png";
    console.log(messages)
    return (
        <div>
            <DashDrawer/>
            You've got mail.
            <div>				
                <Grid container spacing={1} padding={7} justifyContent="left">
					<Grid item xs={12} justifyContent="center">
					<h1>Messages</h1>
          <Button onClick={handleOpenSend}>Send a Message</Button>

          <Modal
              open={openSend}
              onClose={handleCloseSend}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
              <SendMessageForm setSend={setSend}/>
              </Box>
            </Modal>

            <Modal
              open={msgOpen}
              onClose={handleCloseOpen}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h6" id="modal-modal-title">
                 A Message For Me!</Typography>
                <Typography variant="subtitle1" id="modal-modal-description">From: {(message.sender.preferred_name ? message.sender.preferred_name : message.sender.first_name) + " " + message.sender.last_name}</Typography>
                <Typography variant="subtitle1" id="modal-modal-description">Date:  {message.date_time}</Typography>
                <Typography variant="subtitle1" id="modal-modal-description">Subject:  {message.subject}</Typography>
                <br></br>
                <Box sx={{border:"1px solid black", p: 4}}>{message.message}</Box>
                <Button onClick={handleCloseOpen}>Close</Button>
              </Box>
            </Modal>
					</Grid>

					<Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>From</StyledTableCell>
                                <StyledTableCell align="right">From</StyledTableCell>
                                <StyledTableCell align="right">Subject</StyledTableCell>
                                <StyledTableCell align="right">Date</StyledTableCell>
                                <StyledTableCell align="right">Unread</StyledTableCell>
                                <StyledTableCell align="right">Open</StyledTableCell>
                                <StyledTableCell align="right">Delete</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {messages.map((msg) => (
                                <StyledTableRow key={msg.id}>
                                <StyledTableCell component="th" scope="row">
                                  <img src={msg.sender.profile_pic  ? msg.sender.profile_pic : defaultProfilePic} height="100" alt='Profile'/>
                                </StyledTableCell>
                                <StyledTableCell align="right">{(msg.sender.preferred_name ? msg.sender.preferred_name : msg.sender.first_name) + " " + msg.sender.last_name}</StyledTableCell>
                                <StyledTableCell align="right">{msg.subject}</StyledTableCell>
                                <StyledTableCell align="right">{msg.date_time}</StyledTableCell>
                                <StyledTableCell align="right">{msg.unread ? "Unread" : "Read"}</StyledTableCell>
                                <StyledTableCell align="right"><Button onClick={()=>{
                                    setMessage(msg)
                                    handleOpenOpen()
                                    console.log(msg.id)
                                    MarkMsgAPI(msg.id)
                                  }}>OPEN</Button></StyledTableCell>
                                <StyledTableCell align="right"><Button>Delete</Button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
					</Grid>
				</Grid></div>
        </div>
    )}

export default MessagesPage