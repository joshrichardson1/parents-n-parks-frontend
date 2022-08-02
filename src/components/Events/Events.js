import React, { useEffect, useState, useRef } from 'react';
import AddEventModal from '../AddEventModal/AddEventModal';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import apiData from '../../api/serpapi_test_data.json'
import DirectionIcon from '@mui/icons-material/Directions';
import Carousel from 'react-material-ui-carousel';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import useMediaQuery from '../../hooks/useMediaQuery';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box'
import './Events.css';
import { getUserProfile, fetchEvent } from '../../api/backendAPI';
import axios from 'axios'



const Events = () => {
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState(apiData)
  const [eventData, setEventData] = useState(null)
  const [itemLink, setItemLink] = useState(null)
  const [itemAddress, setItemAddress] = useState(null)
  const [mapImage, setMapImage] = useState('https://www.vizion.com/wp-content/uploads/2018/09/shutterstock_479042983-636x344.jpg')
  const [openAddEvent, setOpenAddEvent] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 960px)');
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {

    // get user profile for zip code
    const callGetProfile = async () => {
      let zip_var 
      let response = await getUserProfile(localStorage.getItem('accessToken'))       
        if (response[0].zip_code) {
          setItemAddress(response[0].zip_code)
          zip_var = response[0].zip_code
        } else if (!itemAddress) {
          const getIPaddressData = async () => {            
              const res = await axios.get('https://geolocation-db.com/json/')
              setItemAddress(res.data.postal);      
              zip_var = res.data.postal    
          }          
          getIPaddressData()
        }
      }
      callGetProfile()
      
  }, [])
  
  useEffect(() => {
    const fetchNearbyEvents = async () => {

      if (eventData === null || eventData === undefined) {   
          let evtResponse = await fetchEvent(itemAddress)
          console.log(evtResponse)
          setEventData(evtResponse)
        }
    }
    fetchNearbyEvents()
  }, [itemAddress])


  return (
    <div className="sugg-events">
      <div className="sugg-cards">
        <h2>Local Events</h2>
        <Carousel
          className="carousel-cards"
          sx={{ maxWidth: 350 }}
          // autoPlay={false}
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          stopAutoPlayOnHover={true}
          navButtonsAlwaysVisible={true}
          fullHeightHover={false}
          navButtonsWrapperProps={{
            // Move the buttons to the bottom. Unsetting top here to override default style.
            style: {
              padding: "0px",
            },
          }}
        >
          {eventData && eventData.map((item) => (
            <Card key={item.link} sx={{ maxWidth: 345 }}>
              <CardHeader
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                title={item.title}
                subheader={item.date.when}
                onClick={() => window.open(item.link)}
                id="suggested-event-card-header"
              />
              {isDesktop && (
                <CardMedia
                  component="img"
                  height="194"
                  image={item.thumbnail}
                  alt={item.link}
                />
              )}
              <div className="pt-2 pb-2">
                <Button
                  id="plan-local-event-button"
                  className="pt-2 pb-2"
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAddEvent(true)}
                >
                  Plan it!
                </Button>
              </div>
              {openAddEvent && (
                <AddEventModal
                  open={openAddEvent}
                  setOpen={setOpenAddEvent}
                  meetupName={item.title}
                  address={item.address[0] + ", " + item.address[1]}
                  modeName="Event"
                  date={item.date.start_date}
                  eventPic = {item.thumbnail}
                />
              )}
            </Card>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Events
