import React, {useState, useEffect} from "react";
import {Navigate, useParams} from 'react-router-dom';
import Drawer from "../../components/Drawer/Drawer";
import "./FindFriendsPage.css";
import { Grid, Button } from "@mui/material";
import { Card, Image } from "react-bootstrap";
import { SignalCellularNull } from "@mui/icons-material";
import {fetchProfiles} from "../../api/backendAPI";
import {getCity} from "../../api/zipcodeAPI";
import { Data } from "@react-google-maps/api";

const FindFriendsPage = () => {
  const [friendData, setFriendData] = useState(null);
  // const [zipcode, setZipcode] = useState(null);
  const [currentFriendCnt, setCurrentFriendCnt] = useState(0);
  const [currentFriend, setCurrentFriend] = useState();
  const params = useParams();

  const defaultProfilePic =
    "https://cp-pnp-bucket.s3.amazonaws.com/90/no-profile-image.png";


  useEffect(() => {
    const fetchData = async () => {
      let friendObj = await fetchProfiles()
      console.log(friendObj)
      console.log(friendObj[currentFriendCnt])
      if (friendObj[currentFriendCnt] === undefined){
        setCurrentFriendCnt(0);
      } else{
          friendObj.zip = await getCity(friendObj[currentFriendCnt].zip_code)
          setFriendData(friendObj)
          setCurrentFriend({'friend': friendObj[currentFriendCnt], 'zipData': friendObj.zip})
          // setZipcode(friendObj.zip)
      }
    }
    fetchData();
    
  }, [currentFriendCnt]);
  
  
  const sendFriendRequest = async () => {
    
    try {
      const response = await fetch(
        "http://parents-n-parks-2.herokuapp.com/friends/friend_request/",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver_user_id: currentFriend["friend"].id,
          }),
        }
      );
      const requestFriendData = await response.json();
      if (requestFriendData.error) {
        return {
          'message': requestFriendData.error.message,
          'statusCode': 200
        }
      }
      setCurrentFriendCnt(currentFriendCnt + 1)
      return requestFriendData;
    }
    
    catch (error) {
      console.log(error);
      return null;
    }
  };

  
  

  

  const handleSkip = () => {
    setCurrentFriendCnt(currentFriendCnt + 1);
  };

  const getAge = () => {
    let friendBirthDate = currentFriend['friend'].birthdate;
    let today = new Date();
    let birthDate = new Date(friendBirthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderFriend = () => {
    if (!friendData){
      return null
    }
    
    return (
      <div className="find-friends-main-container">
        <Drawer />
        <h1 id="main-header">
          <b>Find Your Village!</b>
        </h1>
        <Grid container spacing={0} id="find-friends-grid-container">
          <Grid item md={6} lg={7} id="profile-main" align="center">
            <Card id="profile-card" style={{ width: "30rem" }}>
              <div>
                <Image
                  fluid
                  id="find-friends-profile-pic"
                  src={
                    currentFriend["friend"].profile_pic
                      ? currentFriend["friend"].profile_pic
                    : defaultProfilePic
                  }
                />
                <span id="profile-basics">
                  <h4 id="name">
                    <b>
                      {currentFriend["friend"].preferred_name
                        ? currentFriend["friend"].preferred_name
                        : currentFriend["friend"].first_name}{" "}
                      {currentFriend["friend"].last_name}
                    </b>
                  </h4>
                  <h4>
                    <b>Location: </b>
                    {currentFriend["zipData"].city},{" "}
                    {currentFriend["zipData"].state}
                  </h4>
                  <h4>
                    <b>Age:</b> {getAge()}
                  </h4>
                  <h4>
                    <b>Kids Age Group(s):</b>
                  </h4>
                  <p>
                    3-5 year old<br></br>
                    7-10 year old
                  </p>
                </span>
              </div>
              <Card.Body>
                <Card.Text id="intro">
                  {currentFriend["friend"].intro}
                </Card.Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid item sm={12} md={4} lg={5} id="profile-info">
            <div>
              <Card
                id="personal-interests"
                style={{ width: "24rem", height: "10rem" }}
              >
                <Card.Body>
                  <Card.Text>
                    <h4>
                      <b>Personal Interests:</b>
                    </h4>
                    <p>{currentFriend["friend"].personal_interests}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div>
              <Card
                id="family-interests"
                style={{ width: "24rem", height: "10rem" }}
              >
                <Card.Body>
                  <Card.Text>
                    <h4>
                      <b>Family Interests:</b>
                    </h4>
                    <p>{currentFriend["friend"].family_interests}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Grid>
          <Grid item md={12} id="button-container">
            <Button
              variant="contained"
              color="error"
              size="medium"
              id="skip-button"
              onClick={handleSkip}
            >
              Skip
            </Button>
            <Button
              variant="contained"
              color="success"
              size="medium"
              id="add-button"
              onClick={sendFriendRequest}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }

  

  return (
    <div className="main-container">
      <Drawer />
      {renderFriend()}
    </div>
  );
};

export default FindFriendsPage;


