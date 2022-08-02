import React, { useEffect, useState } from 'react';
import MenuAppBar from '../../components/Navbar/Navbar';
import DashDrawer from '../../components/Drawer/Drawer';
import Drawer from '../../components/Drawer/Drawer';
import { getEvents } from '../../api/backendAPI';
import { Grid, Card, CardContent, Typography, CardHeader, CardMedia, CardActions, Button } from '@mui/material';
import "./EventsPage.css"

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const moment = require("moment");
  const defaultImage =
    "https://cp-pnp-bucket.s3.amazonaws.com/noImage.jpeg";

  useEffect(() => {
    const fetchEvents = async () => {
      let response = await getEvents();
      if (response) {
        setEvents(response);
      } else {
        console.log("error");
      }
    };
    fetchEvents();
  }, []);

  console.log(events);

  return (
    <div id="all-events-main-container">
      <Drawer />
      <h1 id="all-events-header">All Upcoming Meet Ups &amp; Events</h1>
      <Grid container spacing={3} id="all-events-grid-container">
        {events.map((event, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card id="all-events-card">
                <CardMedia
                  id="all-events-card-image"
                  component="img"
                  height="140"
                  image={defaultImage}
                  alt="green iguana"
                />
                <Typography gutterBottom variant="h5" component="div">
                  {event.title}
                </Typography>
                {event.date && (
                  <Typography variant="body2" color="text.secondary">
                    {moment(event.date).format("MMM Do, YYYY")} - {event.time}
                  </Typography>
                )}
                <Typography variant="h6" color="text.secondary">
                          Attending with: 
                          
                </Typography>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default EventsPage