import { TextField, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Button, Select, MenuItem,Grid, InputLabel, FormControl} from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react'
import SendMessage from  '../../api/SendMessageApi'



const SendMessageForm = (props) => {
    const [receiver, setReceiver] = useState("");

    const handleChange = (event) => {
        setReceiver(event.target.value);
      };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.message.value)

        const message = {
            receiver: receiver,
            message: e.target.message.value,
            subject: e.target.subject.value
        };

        const callSendMessage = async () => {
            let response = await SendMessage(message)
            if(response){
                console.log(response)
            }else{
                console.error('failure calling api')
            }
        }
        callSendMessage()
        props.setSend(false)
    }

        return(
            <Box
            component="form"
            onSubmit={handleSubmit}
            className="text-box"

            >
                 <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h5">Send Message</Typography>
                </Grid>
               
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel id="select-receiver-label">Send to</InputLabel>
                    <Select
                        size="medium"
                        labelId="select-Receiver-label"
                        id="receiver"
                        value={receiver}
                        label="Receiver"
                        onChange={handleChange}
                    >
                        <MenuItem value={11}>Tressa Sharma</MenuItem>
                        <MenuItem value={18}>Anthony Lemke</MenuItem>
                        <MenuItem value={8}>William Keirn</MenuItem>
                        <MenuItem value={2}>Ka Leung</MenuItem>
                        <MenuItem value={32}>Josh Richardson</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                    <TextField
                        required
                        id="subject"
                        label="Subject"
                        defaultValue=""
                    />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth >
                        <TextField
                            required
                            id="message"
                            label="Message"
                            multiline
                            rows={10}
                            defaultValue=""
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        type="submit"
                        color="success"
                        size="large"
                        className={'submitButton'}>
                            Submit
                    </Button>   
                </Grid>
                <Grid item xs={6}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => props.setSend(false)}
                    >
                        Cancel
                    </Button>
                    </Grid>
                </Grid>    
            </Box>
        )
    }


export default SendMessageForm;