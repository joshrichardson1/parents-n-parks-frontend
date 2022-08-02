import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {Box, TextField, FormControl, Grid} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import SignupAPI from "../../api/SignupAPI";
import S3Bucket from "../../components/S3Bucket/S3Bucket";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import Toast from "react-bootstrap/Toast";
import CheckIcon from "@mui/icons-material/Check";

const SignUpForm = () => {
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [profilePicURL, setProfilePicURL] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const account = {
      first_name: event.target.firstName.value,
      middle_name: event.target.middleName.value,
      last_name: event.target.lastName.value,
      preferred_name: event.target.preferredName.value,
      birthdate: event.target.birthDate.value,
      email: event.target.email.value,
      zip_code: event.target.zipCode.value,
      intro: event.target.briefIntro.value,
      full_bio: event.target.fullBio.value,
      personal_interests: event.target.personalInterests.value,
      family_interests: event.target.familyInterests.value,
      available_times: event.target.availableTimes.value,
      profile_pic: profilePicURL
    };


    // creates profile and opens modal to add kids
    let response = await SignupAPI.addNewProfile(account);
    console.log(response)
    if (response === "Profile Created") {
      setOpenModal(true);
    } else {
      console.log(response);
    }

    console.log(account);
  };

  return (
    <div className="box-form">
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          width: "75%",
          margin: "auto",
        }}
        component="form"
        onSubmit={handleSubmit}
        className="text-box"
      >
        <Grid container padding={5} className="grid-box">
          <Grid item xs={12}>
            <h2 className="profile-header">
              <u>User Profile</u>
            </h2>
          </Grid>
          <Grid item xs={12} md={3} padding={1}>
            <FormControl fullWidth>
              <TextField
                required
                id="firstName"
                label="First Name"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} padding={1}>
            <FormControl fullWidth>
              <TextField id="middleName" label="Middle Name" size="small" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} padding={1}>
            <FormControl fullWidth>
              <TextField
                required
                id="lastName"
                label="Last Name"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} padding={1}>
            <FormControl fullWidth>
              <TextField
                id="preferredName"
                label="Preferred Name"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} padding={1}>
            <FormControl fullWidth>
              <TextField
                required
                id="birthDate"
                label="Birthdate (YYYY-MM-DD)"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} padding={1}>
            <FormControl fullWidth>
              <TextField required id="email" size="small" label="Email" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} padding={1}>
            <FormControl fullWidth>
              <TextField required id="zipCode" label="Zip Code" size="small" />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} padding={1}>
            <FormControl fullWidth>
              <TextField
                multiline
                id="personalInterests"
                label="Personal Interests"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} padding={1}>
            <FormControl fullWidth>
              <TextField
                multiline
                id="familyInterests"
                label="Family Interests"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} padding={1}>
            <FormControl fullWidth>
              <TextField
                required
                multiline
                id="briefIntro"
                label="Brief Introduction"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} padding={1}>
            <FormControl fullWidth>
              <TextField
                required
                multiline
                id="fullBio"
                label="Full Bio"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8} padding={1}>
            <FormControl fullWidth>
              <TextField
                id="availableTimes"
                label="Available Times"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} padding={1}>
            <S3Bucket
              profilePicURL={profilePicURL}
              setProfilePicURL={setProfilePicURL}
              setShowToast={setShowToast}
            />
            {/* <Toast
              onClose={() => setShowToast(false)}
              bg={"success"}
              show={showToast}
              delay={2000}
              autohide
              id="kids-toast"
            >
              <Toast.Body className="text-white">
                <CheckIcon />
              </Toast.Body>
            </Toast> */}
          </Grid>
          <Grid item md={1} id="upload-pic-container">
            <Toast
              onClose={() => setShowToast(false)}
              bg={"success"}
              show={showToast}
              delay={2000}
              autohide
              id="profile-pic-toast"
            >
              <Toast.Body className="text-white">
                <CheckIcon id="check-icon"/>
              </Toast.Body>
            </Toast>
          </Grid>
          <Grid item xs={12} md={12} padding={5}>
            <Button
              variant="contained"
              type="submit"
              color="success"
              size="large"
            >
              Sign Up
            </Button>
            {openModal && <SignUpButton />}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SignUpForm;
