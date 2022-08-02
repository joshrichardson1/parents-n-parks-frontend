import React, { useEffect, useState } from 'react';
import { Button, Grid, Divider, TextField, FormControl, Box, Stack, InputLabel, Select, MenuItem, List, ListItem, ListItemAvatar, Typography, ListItemText } from '@mui/material';
import './EditProfileForm.css';
import EditProfile from '../../api/EditProfileAPI';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import FaceIcon from '@mui/icons-material/Face';
import { deleteKid, addKid } from '../../api/AddKidAPI';
import SuccessToast from "../SuccessToast/SuccessToast";
import Modal from "@mui/material/Modal";
import { getKids } from '../../api/backendAPI';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const EditProfileForm = (props) => {
    const profile = props.profile;
    const kids = props.kids
    const [kidsState, setKidsState] = useState(kids)
    const [dense, setDense] = useState(false);
    const [removeKid, setRemoveKid] = useState();
    const [openModal, setOpenModal] = useState(false);

    // generate modal 
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [childAge, setChildAge] = useState("");
    const [childGender, setChildGender] = useState("");
    const [profileID, setProfileID] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {        
        if (kids != kidsState) {
            const callDeleteKid = async () => {
                let response = await deleteKid(removeKid)                
                console.log(response)

                const callFetchKid = async () => {
                    let response = await getKids(localStorage.getItem('accessToken'))
                    if (response) {
                        setKidsState(response)
                    }
                }
                callFetchKid()
            }
            callDeleteKid()
        }
    },[removeKid])

    const handleSubmit = (e) => {
        const updatedProfile = {
            id: profile.id,
            user: profile.user,
            first_name: e.target.firstName.value,
            middle_name: e.target.middleName.value,
            last_name: e.target.lastName.value,
            preferred_name: e.target.preferredName.value,
            birthdate: e.target.birthDate.value,
            email: e.target.email.value,
            zip_code: e.target.zipCode.value,
            intro: e.target.intro.value,
            full_bio: e.target.bio.value,
            interests: e.target.interests.value,
            values: e.target.values.value,
            available_times: e.target.availableTimes.value
        };

        const callEditProfile = async () => {
            let response = await EditProfile(updatedProfile)
            if(response){
                console.log(response)
            }else{
                console.error('failure calling api')
            }
        }
        callEditProfile()
    }

    const handleAddKid = async () => {
        const kid = {
          age_group: childAge,
          gender: childGender,
          profile_id: profileID,
        };
        setChildAge("");
        setChildGender("");
        let response = await addKid(kid);
        if (response === "Kid Added") {
          setSuccessMessage("Kid Added!")
          setShowSuccessToast(true);   
          props.kids.push(kid)   
          props.setKidsState(props.kids)
        } else {
          console.log(response);
        }
      };

    const addChild = (e) => {
        e.preventDefault();
        console.log("child added")
        setOpenModal(true);
    }

    const deleteChild = (e) => {
        e.preventDefault();
        
        console.log(e.target.value)
        if (e.target.value !== undefined && e.target.value !== NaN) {
            setKidsState(kidsState.filter(itm => !(itm.id == e.target.value)));        
            setRemoveKid({"kidId": parseInt(e.target.value)})
        }        
    }

    const handleKidSubmit = () => {
        return null;
    }

    const generateChildren = () => {
        if (kidsState){
            return kidsState.map((kid, index) => {
                return(
                    <ListItem key={index}>  
                    <FaceIcon />            
                            <ListItemText> <Typography align='center'> {kid.age_group} </Typography>  </ListItemText>
                            <ListItemText> <Typography align='center'> {kid.gender} </Typography> </ListItemText>
                            <ListItemAvatar>                  
                                <Button
                                    value={kid.id}
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    size="small"
                                    onClick={(e) => {deleteChild(e)}}
                                    >                        
                                    <ClearIcon /> 
                                </Button>  
                            </ListItemAvatar>     
                    </ListItem>                
                )
            })
        }
    }

    const generateModal = () => {
        return (
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <h4>Add your child:</h4>
                    </Grid>
                    <Grid item md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="kids-age-label" className="age-label">
                          Age
                        </InputLabel>
                        <Select
                          labelId="kids-age-label"
                          id="kids-age"
                          value={childAge}
                          label="Age"
                          onChange={(e) => setChildAge(e.target.value)}
                          size="small"
                        >
                          <MenuItem value={"0-12 mos"}>0-12 mos</MenuItem>
                          <MenuItem value={"1-3 yrs"}>1-3 yrs</MenuItem>
                          <MenuItem value={"3-5 yrs"}>3-5 yrs</MenuItem>
                          <MenuItem value={"elementary"}>Elementary</MenuItem>
                          <MenuItem value={"middle school"}>Middle School</MenuItem>
                          <MenuItem value={"high school"}>High School</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="kids-gender-label">Gender</InputLabel>
                        <Select
                          labelId="kids-gender-label"
                          id="kids-gender"
                          value={childGender}
                          label="Gender"
                          onChange={(e) => setChildGender(e.target.value)}
                          size="small"
                        >
                          <MenuItem value={"Male"}>Boy</MenuItem>
                          <MenuItem value={"Female"}>Girl</MenuItem>
                          <MenuItem value={"Prefer not to answer"}>
                            Prefer not to answer
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item md={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddKid}
                      >
                        Add Kid
                      </Button>
                    </Grid>
                    <Grid item={12} id="kid-buttons">
                      <Button
                        id="nty-button"
                        variant="contained"
                        color="error"
                        onClick={() => setOpenModal(false)}
                      >
                        No thanks
                      </Button>
                      <Button
                        id="complete-signup-button"
                        variant="contained"
                        color="success"
                        onClick={() => setOpenModal(false)}
                      >
                        Done
                      </Button>
                      <SuccessToast
                        open={showSuccessToast}
                        setOpen={setShowSuccessToast}
                        message={successMessage}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Modal>
            </div>
          );
    }
    
    return (
        <div className='ProfileFormArea'>
            <Box
                component="form"
                onSubmit={handleSubmit}
                className="text-box"
            >
                <Grid 
                    container 
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                >   
                    <Grid item xs={1} className='clearDisplay' />
                    <Grid item xs={3} className={'pro-grid-item'}>
                        <div>
                          <img id='edit-form-pic' src={profile.profile_pic} /> 
                            <FormControl classname={'formItem'} fullWidth>
                            <TextField
                            id="firstName"
                            defaultValue={profile.first_name}
                            size="small"
                            label='First Name'
                            InputLabelProps={{shrink: true}}
                            />
                            </FormControl>
                            <Divider />
                            <FormControl classname={'formItem'} fullWidth>
                            <TextField
                            id="middleName"
                            defaultValue={profile.middle_name}
                            size="small"
                            label='Middle Name'
                            InputLabelProps={{shrink: true}}
                            />
                            </FormControl>
                            <Divider />
                            <FormControl classname={'formItem'} fullWidth>
                            <TextField
                            id="lastName"
                            defaultValue={profile.last_name}
                            size="small"
                            label='Last Name'
                            InputLabelProps={{shrink: true}}
                            />
                            </FormControl>
                            <Divider />
                            <FormControl classname={'formItem'} fullWidth>
                            <TextField
                            id="preferredName"
                            defaultValue={profile.preferred_name}
                            size="small"
                            label='Preferred name'
                            InputLabelProps={{shrink: true}}
                            />
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid item xs={3} className={'pro-grid-item'}>
                                <div className={'infoSection'}>
                                    <FormControl classname={'formItem'} fullWidth>
                                    <TextField
                                    id="birthDate"
                                    defaultValue={profile.birthdate}
                                    size="small"
                                    label='D.O.B'
                                    InputLabelProps={{shrink: true}}
                                    />
                                    </FormControl>
                                    <Divider />
                                    <FormControl classname={'formItem'} fullWidth>
                                    <TextField
                                    id="email"
                                    defaultValue={profile.email}
                                    size="small"
                                    label='Email'
                                    InputLabelProps={{shrink: true}}
                                    />
                                    </FormControl>
                                    <Divider />
                                    <FormControl classname={'formItem'} fullWidth>
                                    <TextField
                                    id="zipCode"
                                    defaultValue={profile.zip_code}
                                    size="small"
                                    label='Zip Code'
                                    InputLabelProps={{shrink: true}}
                                    />
                                    </FormControl>
                                    <Divider />
                                    <FormControl classname={'formItem'} fullWidth>
                                    <TextField
                                    id="intro"
                                    defaultValue={profile.intro}
                                    size="small"
                                    label='Brief Intro'
                                    InputLabelProps={{shrink: true}}
                                    />
                                    </FormControl>
                                    <Divider />
                                    <FormControl classname={'formItem'} fullWidth>
                                    <TextField
                                    id="bio"
                                    multiline
                                    rows={4}
                                    defaultValue={profile.full_bio}
                                    size="small"
                                    label='Full Bio'
                                    InputLabelProps={{shrink: true}}
                                    />
                                    </FormControl>
                                </div>
                            </Grid> 
                            <Grid item xs={3} className={'pro-grid-item'}>
                                <div className='infoSection'>
                                    <FormControl classname={'formItem'} fullWidth>
                                        <TextField
                                        id="interests"
                                        defaultValue={profile.interests}
                                        size="small"
                                        label='Interests'
                                        InputLabelProps={{shrink: true}}
                                        />
                                    </FormControl>
                                    <Divider />
                                    <FormControl classname={'formItem'} fullWidth>
                                        <TextField
                                        id="values"
                                        defaultValue={profile.values}
                                        size="small"
                                        label='Values'
                                        InputLabelProps={{shrink: true}}
                                        />
                                    </FormControl>
                                    <Divider />
                                    <FormControl classname={'formItem'} fullWidth>
                                        <TextField className='FormItem'
                                        id="availableTimes"
                                        defaultValue={profile.available_times}
                                        size="small"
                                        label='Available Times'
                                        InputLabelProps={{shrink: true}}
                                        />
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                    <Button
                    variant="contained"
                    type="submit"
                    color="success"
                    size="large"
                    className={'submitButton'}>
                        Submit
                    </Button>            
            </Box>
            <Box
                component="form"
                onSubmit={handleKidSubmit}
                className="text-box">
                <Grid 
                container 
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                >   
                    <Grid item xs={3} className={'pro-grid-item'}>                    
                    <List sx={{ borderRadius: 2 }}
                        dense={dense} alignItems='flex'
                        >
                        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                            Children:
                        </Typography>     
                        {generateChildren()}
                    </List>                    
                    </Grid>
                    <ListItemAvatar>                  
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="success"
                                    size="small"
                                    onClick={(e) => {addChild(e)}}
                                    >                        
                                    <AddIcon />                                                       
                                </Button>  
                    </ListItemAvatar>             
                    {openModal && generateModal()}      
                </Grid>
            </Box>
        </div>
    )
}

export default EditProfileForm;
