import './MeetUp.css';
import MenuAppBar from '../../components/Navbar/Navbar';
import DashDrawer from '../../components/Drawer/Drawer';
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import EventPageDropdown from '../../components/EventPageDropdown/EventPageDropdown';
import { zipConvert } from 'convert-zip-to-gps';
import {useLocation} from "react-router-dom"
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Button } from '@mui/material';
import { Gesture, WindowSharp } from '@mui/icons-material';
import { maxWidth } from '@mui/system';
import { getUserProfile } from '../../api/backendAPI';
import AddEventModal from "../../components/AddEventModal/AddEventModal";
import SuccessToast from '../../components/SuccessToast/SuccessToast';


const libraries = ['places'];

export const MeetUp = () => { 

    let libRef = useRef(libraries)
    const [center, setCenter] = useState({});
    const [selection, setSelection] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [mapInstance, setMapInstance] = useState(null)
    const [pins, setPins] = useState(null)
    const [activeMarker, setActiveMarker] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
    // functions for getting latitude and longitude from GPS on page
    const success = (position) => {        
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCenter({lat: latitude, lng: longitude});
    }
    
    // functions for getting latitude and longitude from user profile if user didn't allow GPS on page
    const error = () => {
        if (zipcode) {
            const geoLoc = zipConvert(zipcode[0].zip_code);
            setCenter({lat: Number(geoLoc.split(',')[0]), lng: Number(geoLoc.split(',')[1])});
        } else {
            setCenter({lat: 40.7128, lng: -74.0060})
        }
    }
        navigator.geolocation.getCurrentPosition(success,error);
    },[])

    // useEffect to get user Profile when page load
    useEffect(() => {
        const getLocation = async () => {
            const data = await getUserProfile(localStorage.getItem('accessToken')).then(data=> {return data})
            if (data) {
                setZipcode(data);
            }
        }
        getLocation();
        
    }, []);

    useEffect(() => {
        if (mapInstance) {            
            // check if places return OK
            const placesStatus = (placesMark, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK){
                    setPins(placesMark)
                }
            }
        
            // set variable for loc and center and request from radio selection
            var loc = new window.google.maps.LatLng(center);
            var request = {
                location: loc,
                radius: '5000',
                types: [selection],
            };
            
            let service = new window.google.maps.places.PlacesService(mapInstance);
            service.nearbySearch(request, placesStatus);

        }

    },[selection])

    // load React Google Map 
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBrqW5i2fwwTyDQlCQgWbBEtA_1jf0-2cA',
        libraries: libRef.current
    });
    
    // handle changes from user on Radio button
    const handleChange = (e) => {
        setSelection(e.target.value);
        localStorage.setItem("dropDown", e.target.value)
        // window.location.reload()
    }
    
    // start the map instance and set in useState
    const onMapLoad = useCallback((map) => {
        setMapInstance(map)
    },[])        

    // generate return of Marker and InfoWindow
    const markerInfoWindow = () => {
      // handle state of Active Marker
      const handleActiveMarker = (index) => {
        if (index === activeMarker) {
          return;
        }
        setActiveMarker(index);
      };

      // check if the image is available if error use a default image
      const imageChecker = (obj) => {
        try {
          return obj.photos[0].getUrl();
        } catch {
          return "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
        }
      };
      // map thru the pin generate
      if (pins) {
        console.log(pins)
        return pins.map((pin, index) => (
          <Marker
            key={index}
            position={pin.geometry.location}
            title={pin.name}
            onClick={() => handleActiveMarker(index)}
          >
            {activeMarker === index ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="info-window" id="pin-detail-view">
                  <h4>
                    <strong>{pin.name} </strong>
                  </h4>
                  <p>{pin.formatted_address}</p>
                  <p>Rating: {pin.rating}/5</p>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <img
                        src={imageChecker(pin)}
                        width="100"
                        height="100"
                      ></img>
                    </Grid>
                    <Grid item xs={6} id="plan-it-button-container">
                      <Button
                        variant="contained"
                        onClick={() => setOpenModal(true)}
                      >
                        Plan it!
                      </Button>
                      {openModal && (
                        <AddEventModal
                          open={openModal}
                          setOpen={setOpenModal}
                          openSuccessToast={setShowSuccessToast}
                          meetupName={pin.name}
                          address={pin.vicinity}
                          modeName="Meet Up"
                        />
                      )}
                    </Grid>
                  </Grid>
                </div>
              </InfoWindow>
            ) : null}
          </Marker>
        ));
      }
    };


    return (
      <div className="MeetUpContainer">
        <MenuAppBar />
        <DashDrawer />
        <SuccessToast
          open={showSuccessToast}
          setOpen={setShowSuccessToast}
          message="Event added successfully!"
        />
        <h1 className="meet-up-title">Find a Meet Up Spot</h1>
        {JSON.stringify(center) !== "{}" && (
          <div className="dropdown" id="meetup-categories">
            <FormControl className="radio-buttons" id="meetup-categories-radio-group">
              <FormLabel id="demo-row-radio-buttons-group-label">
                <strong>Select A Category</strong>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                size="small"
                className="radio-group"
                onChange={handleChange}
                state={selection}
                // id="meetup-categories-radio-group"
                // defaultValue={localStorage.getItem('dropDown')}
              >
                <FormControlLabel
                  value="aquarium"
                  control={<Radio />}
                  label="Aquarium"
                />
                <FormControlLabel
                  value="amusement_park"
                  control={<Radio />}
                  label="Amusement Park"
                />
                <FormControlLabel
                  value="library"
                  control={<Radio />}
                  label="Library"
                />
                <FormControlLabel
                  value="movie_theater"
                  control={<Radio />}
                  label="Theater"
                />{" "}
                <br></br>
                <FormControlLabel
                  value="museum"
                  control={<Radio />}
                  label="Museum"
                />
                <FormControlLabel
                  value="park"
                  control={<Radio />}
                  label="Park"
                />
                <FormControlLabel
                  value="restaurant"
                  control={<Radio />}
                  label="Restaurant"
                />
                <FormControlLabel
                  value="shopping_mall"
                  control={<Radio />}
                  label="Mall"
                />
                <FormControlLabel value="zoo" control={<Radio />} label="Zoo" />
              </RadioGroup>
            </FormControl>
          </div>
        )}
        {isLoaded && (
          <GoogleMap
            onClick={() => setActiveMarker(null)}
            zoom={15}
            center={center}
            onLoad={onMapLoad}
            mapContainerClassName="map-container"
          >
            {markerInfoWindow()}
          </GoogleMap>
        )}
      </div>
    );
}
