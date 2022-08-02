import React, { useState, useEffect } from 'react'
import { Grid, Box, Button } from '@mui/material'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";
import { getDummy } from "../../api/backendAPI";
import { getUserProfile } from "../../api/backendAPI";
import './MainLandingPage.css';

export default function MainLandingPage() {
  const {
    loginWithRedirect,
    loginWithPopup,
    isAuthenticated,
    user,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (openSignUp || openLogin) {
      const getUserAccessToken = async () => {
        const domain = "dev-valkjtef.us.auth0.com";
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        // set accessToken to local storage
        localStorage.setItem("accessToken", accessToken);

        // dummyCall will create an user on the backend if the user was never created
        const dummyCall = async (accessToken) => {
          let response = await getDummy(accessToken).then((data) => {
            return data;
          });
          console.log(response);
        };
        dummyCall(accessToken);

        const callUserProfile = async (token) => {
          let response = await getUserProfile(accessToken).then((data) => {
            return data;
          });
          console.log(response.length);
          if (response.length > 0) {
            navigate("/home");
          } else {
            navigate("/create-profile");
          }
        };
        callUserProfile(accessToken);
      };
      getUserAccessToken();
    }
  }, [getAccessTokenSilently, user?.sub]);

  const handleOpenLogin = () => {
    loginWithPopup();
    setOpenLogin(true);
  };

  const handleOpenSignUp = () => {
    loginWithPopup({ mode: "signUp" });
    setOpenSignUp(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const navToDash = () => {
    navigate("/home");
  };

  return (
    <Box>
      <div id="landing-page-container">
        <nav className="navbar navbar-expand-lg navbar-light pt-3">
          <a className="navbar-brand" href="#">
            <img
              src={require("../../images/LogoWithWords.png")}
              width="150"
              height="150"
              // className="d-inline-block align-top"
              alt="logo"
            />
          </a>
          <button
            id="landing-navbar-toggler"
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarResponsive"
          >
            <ul className="navbar-nav">
              <li className="nav-item active navbar-link-container">
                <a
                  className="nav-link landing-navbar-links"
                  id="landing-navbar-links"
                  href="#landing-about-container"
                >
                  About
                </a>
              </li>
              <li className="nav-item navbar-link-container">
                <a
                  className="nav-link"
                  href="#landing-how-container"
                  id="landing-navbar-links"
                >
                  How It Works
                </a>
              </li>
              <li className="nav-item navbar-link-container">
                <a
                  className="nav-link"
                  href="#landing-safety-container"
                  id="landing-navbar-links"
                >
                  Safety
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Grid container spacing={2} id="landing-page-login-container">
          <Grid item xs={12}>
            <div id="landing-page-login-container-left">
              <h1 id="landing-intro">Welcome to Parents-n-Parks!</h1>
            </div>
          </Grid>
          <Grid item xs={12}>
            {localStorage.getItem("accessToken") ? (
              <Button
                variant="contained"
                color="success"
                onClick={navToDash}
                className="m-2"
              >
                Go To Dashboard
              </Button>
            ) : (
              <div>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenSignUp}
                  className="m-2"
                >
                  Create an Account
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={handleOpenLogin}
                  className="m-2"
                >
                  Login
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
      <div id="landing-about-container">
        <Grid container spacing={2}>
          <Grid item md={6} className="landing-sections-container">
            <img
              src="https://thumbs.dreamstime.com/b/multi-generation-african-american-family-cycle-ride-outdoors-having-fun-35611496.jpg"
              alt="kids playing"
              id="aboutImage"
              className="landing-images"
            ></img>
          </Grid>
          <Grid item md={6} sm={12} className="landing-sections-container">
            <div>
              <h2 id="landing-about-header">About Us</h2>
              <p id="landing-about-description">
                We are all too familiar with the difficulties that lie within
                connecting to other families. Our goal is to bridge that gap.
                Parents-n-Parks is a social media platform that aims to connect
                families with kids similar in age and that share interests
                similar to their own. Unlike other platforms, we aim to connect
                parents first while still building their child's social circle.
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
      <div id="landing-how-container">
        <Grid container spacing={2}>
          <Grid item md={6} className="landing-sections-container">
            <div>
              <h2 id="landing-how-header">How It Works</h2>
              <p id="landing-how-description">
                It's really quite simple! <br />
                <br />
                  Step 1: Create an account.<br /><br />
                  Step 2: Complete your user profile. <br /><br />
                  Step 3: Connect with other families. <br /><br />
                  Step 4: Plan your next adventure! <br />
              </p>
            </div>
          </Grid>
          <Grid
            item
            md={6}
            className="landing-sections-container  landing-how-image-container"
          >
            <img
              src="https://media.allure.com/photos/5a4bee11e5730250b2933b91/3:4/w_2361,h_3148,c_limit/skin-phone.jpg"
              alt="woman on the phone"
              id="howImage"
              className="landing-images"
            ></img>
          </Grid>
        </Grid>
      </div>
      <div id="landing-safety-container">
        <Grid container spacing={2}>
          <Grid item md={6} className="landing-sections-container">
            <img
              src="https://digitallearning.eletsonline.com/wp-content/uploads/2017/12/school-safety.jpg"
              alt="safety"
              id="safetyImage"
              className="landing-images"
            ></img>
          </Grid>
          <Grid item md={6} className="landing-sections-container">
            <div>
              <h2 id="landing-safety-header">Safety</h2>
              <p id="landing-safety-description">
                Here at Parents-n-Parks, we aim to provide a safe
                environment for parents and kids. We advise all users to
                practice safe and responsible social-media behavior. When meeting with
                other users, we recommend using our "Find a Meetup" feature
                to locate a safe and public location to meet.  Please report any 
                unsafe or inappropriate behavior to our <a href="mailto:parentsnparks@mail.com">Customer Service</a>.
              
              
              
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. */}
              </p>
            </div>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}
