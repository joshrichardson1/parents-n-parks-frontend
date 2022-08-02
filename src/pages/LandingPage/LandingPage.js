import React, { useEffect, useState } from 'react'
import './LandingPage.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router';
import {getDummy} from '../../api/backendAPI';
import {getUserProfile} from '../../api/backendAPI';

const LandingPage = ()  => {
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
        const domain = 'dev-valkjtef.us.auth0.com'
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        // set accessToken to local storage
        localStorage.setItem("accessToken", accessToken);    

      // dummyCall will create an user on the backend if the user was never created
      const dummyCall = async (accessToken) => {
              let response = await getDummy(accessToken).then(data => {return data})
              console.log(response)
      }
      dummyCall(accessToken)        
      
      const callUserProfile = async (token) => {
        let response = await getUserProfile(accessToken).then(data => {return data})
        console.log(response.length)
        if (response.length > 0) {
          navigate('/home')        
        } else {
          navigate('/create-profile')
        }
      }
      callUserProfile(accessToken)     
    }
  getUserAccessToken()
  }
    // User meta data from Auth0 
    // if (user) {
    //   const domain = 'dev-valkjtef.us.auth0.com'
    //   const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
      
    //   const getUserData = async () => {
    //     let response = await auth0Api.getMetaData(userDetailsByIdUrl, localStorage.getItem('accessToken'))
    //     .then(data => { console.log(data)})
    //   }   
    //   getUserData()
    // }
      
  },  [getAccessTokenSilently, user?.sub])


  const handleOpenLogin = () => {
    // setOpenLogin(true);
    // login with redirect
    // loginWithRedirect();

    // login with popup
    loginWithPopup(); 
    setOpenLogin(true) 
  };

  const handleOpenSignUp = () => {
    loginWithPopup({mode:"signUp"})
    setOpenSignUp(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const navToDash = () => {
    navigate('/home')
  }

  return (
    <div>
         <div className="LandingPage" id="landingMain">
    <div id="landingLogin" className="pt-1">
      <div id="landingHeader">
        <a href="#landingMain" className="m-5 landingLinks" id="logo">
          Parents-N-Parks
        </a>
        <a href="#about" className="m-5 landingLinks" id="aboutLink">
          About
        </a>
        <a href="#how" className="m-5 landingLinks" id="howLink">
          How It Works
        </a>
        <a href="#safety" className="m-5 landingLinks" id="safetyLink">
          Safety
        </a>
      </div>

      <div className="Signup">
        <h1 className="mt-5 mb-5" id="landingPhrase">
          Find Your Village
        </h1>
        {
          localStorage.getItem('accessToken')
          ? 
          <Button
          variant="contained"
          color="success"
          onClick={navToDash}
          className="m-2"
          >
            Go To Dashboard
          </Button>
          :
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
        }


        {/* // temp for testing */}
        {/* <Button
          variant="contained"
          color="success"
          onClick={handleLogout}
          className="m-2"
        >
          Logout
        </Button> */}

      </div>
    </div>
    <div id="aboutSectionContainer" className="d-flex">
      <div className="mr-auto" id="aboutImageContainer">
        <img
          src="https://thumbs.dreamstime.com/b/multi-generation-african-american-family-cycle-ride-outdoors-having-fun-35611496.jpg" alt="kids playing" id='aboutImage'></img>
      </div>
      <div className="landingSections" id="about">
        <h2 className="p-2">About Us</h2>
        <p className="p-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
    <div id="howSectionContainer" className='d-flex'>
      <div className="landingSections ml-auto" id="how">
        <h2 className='p-2 ml-5'>How does Parents-n-Parks work?</h2>
        <p className="ml-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div className='p-2' id='howImageContainer'>
        <img src='https://media.allure.com/photos/5a4bee11e5730250b2933b91/3:4/w_2361,h_3148,c_limit/skin-phone.jpg alt="woman on the phone' id='howImage'></img>
      </div>
    </div>
    <div id="safetySectionContainer" className='d-flex'>
      <div id='safetyImageContainer' className='mr-auto'>
        <img src='https://digitallearning.eletsonline.com/wp-content/uploads/2017/12/school-safety.jpg' alt='safety' id='safetyImage'></img>
      </div>
      <div className="landingSections" id="safety">
        <h2 className='p-2'>Safety</h2>
        <p className='p-2'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s
          with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
    </div>
  </div>
    </div>
  );
}

export default LandingPage;