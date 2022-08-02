import { useState, useEffect } from "react";
import * as React from "react";
import { getUserProfile, addEvent } from "../../api/backendAPI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, InputLabel, MenuItem, Select, Grid, TextField } from "@mui/material";
import SuccessToast from "../SuccessToast/SuccessToast";
import CheckIcon from "@mui/icons-material/Check";
import Toast from "react-bootstrap/Toast";

import "./AddEventModal.css"

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

export default function AddEventModal(props) {
  const [profileID, setProfileID] = useState("");
  const [attendee, setAttendee] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  let allAttendees = [profileID];

  const handleChange = (event) => {
    setAttendee(event.target.value);
  };

  const handleClose = () => props.setOpen(false);

  const handleAddAttendee = () => {
    allAttendees.push(attendee);
    console.log(allAttendees);
    setSuccessMessage("Friend Invited!")
    setShowSuccessToast(true);
  };

  const handleSubmit = (event) => {
    console.log(event.target)
    event.preventDefault();
    if (props.modeName === "Meet Up") {
      let dateFormatted = startDate.toISOString().split("T")[0];
      let timeToLocal = startDate.toLocaleTimeString();
      let timeFormatted = timeToLocal.substring(0, timeToLocal.length - 3);
      let eventData = {
        title: props.meetupName,
        address: props.address,
        date: dateFormatted,
        time: timeFormatted,
        attendees: allAttendees
      };
      addEvent(eventData).then((data) => {
        console.log(data);
        if (data) {
          props.setOpen(false);
          props.openSuccessToast(true);
        }
      });
    } else {
      let eventData = {
        title: props.meetupName,
        address: props.address,
        attendees: allAttendees
      }
      addEvent(eventData).then((data) => {
        if (data) {
          setSuccessMessage("Event Planned!")
          setShowSuccessToast(true);
          props.setOpen(false);
        }
      });
    };
  }

  useEffect(() => {
    getUserProfile(localStorage.getItem("accessToken")).then((res) => {
      setProfileID(res[0].id);
    });
  }, []);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h4>Plan Your {props.modeName}!</h4>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                Title:
                <TextField
                  id="title"
                  label={props.meetupName}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={12}>
              <FormControl fullWidth>
                Address:
                <TextField
                  id="event-address"
                  label={props.address}
                  size="small"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </FormControl>
            </Grid>
            {props.modeName === "Meet Up" ? (
              <Grid item md={12}>
                <FormControl fullWidth>
                  Date and Time:
                  <DatePicker
                    selected={startDate}
                    dateFormat="yyyy/MM/dd"
                    onChange={(date) => setStartDate(date)}
                    inline
                    showTimeSelect
                  />
                </FormControl>
              </Grid>
            ) : null}
            <Grid item md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-attendees-label">
                  Who's joining you?
                </InputLabel>
                <Select
                  size="small"
                  labelId="select-attendees-label"
                  id="attendee"
                  value={attendee}
                  label="Attendees"
                  onChange={handleChange}
                >
                  <MenuItem value={3}>Tressa Sharma</MenuItem>
                  <MenuItem value={2}>Anthony Lemke</MenuItem>
                  <MenuItem value={13}>William Keirn</MenuItem>
                  <MenuItem value={66}>Ka Leung</MenuItem>
                  <MenuItem value={64}>Josh Richardson</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} id="invite-friend-button">
              <FormControl>
                <Button variant="contained" onClick={handleAddAttendee}>
                  Invite friend!
                </Button>
              </FormControl>
            </Grid>
            <Grid item md={6} className="add-event-modal-button-container">
              <Button
                variant="contained"
                color="error"
                onClick={() => props.setOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item md={6}>
              <Button variant="contained" color="success" type="submit">
                Submit
              </Button>
            </Grid>
            <SuccessToast
              open={showSuccessToast}
              setOpen={setShowSuccessToast}
              message={successMessage}
            />
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
