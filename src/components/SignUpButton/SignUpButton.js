import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as React from "react";
import { addKid } from "../../api/AddKidAPI";
import {getUserProfile} from "../../api/backendAPI";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, Select, Grid } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Toast from "react-bootstrap/Toast";
import SuccessToast from "../SuccessToast/SuccessToast";
import addFriendsList from "../../api/AddFriendsList";
import "./SignUpButton.css";

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

export default function SignUpButton() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [childAge, setChildAge] = useState("");
  const [childGender, setChildGender] = useState("");
  const [profileID, setProfileID] = useState("");
  // const [show, setShow] = useState(false); 
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    const callAddFriendsList = async (token) => {
      let response = await addFriendsList(token)
      if(response){
        console.log(response)
      }else{
        console.log('api call failed')
      }
    }

    getUserProfile(localStorage.getItem("accessToken")).then(res => {
      console.log(res);
      setProfileID(res[0].id);
      console.log(profileID);
      callAddFriendsList(localStorage.getItem('accessToken'))
    }
    );

  } , []);

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
      console.log('kid added');
      setSuccessMessage("Kid Added!")
      setShowSuccessToast(true);
    } else {
      console.log(response);
    }
  };

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
              <h4>Would you like to add your kid's age group?</h4>
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
                onClick={() => navigate("/home")}
              >
                No thanks
              </Button>
              <Button
                id="complete-signup-button"
                variant="contained"
                color="success"
                onClick={() => navigate("/home")}
              >
                Complete Sign Up!
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

