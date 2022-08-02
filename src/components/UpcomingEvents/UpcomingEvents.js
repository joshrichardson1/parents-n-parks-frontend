import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getEvents } from '../../api/backendAPI';
import './UpcomingEvents.css';
import { Grid, Card, CardContent, Typography, CardHeader, CardMedia, CardActions, Button } from '@mui/material';


export const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  const navigate = useNavigate();

  const moment = require("moment");

  useEffect(() => {
    const fetchEvents = async () => {
      let response = await getEvents();
      if (response) {
        setEvents(response.slice(0, 3));
      } else {
        console.log("error");
      }
    };
    fetchEvents();
  }, []);

  console.log(events);

  const renderEvents = () => {
    if (events.length === 0) {
      return <div>No events found.</div>;
    } else {
      return events.map((event, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card id="indiv-card">
              <CardHeader
                className="pb-1"
                title={event.title}
                subheader={
                  moment(event.date).format("MMM Do") +
                  " - " +
                  event.time.substring(0, 5)
                }
              />
              <CardContent className="pt-0">
                <Typography variant="body3" color="text.secondary">
                  <b>with:</b> {event.friend}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  id="card-view-all-events"
                  onClick={() => navigate("../events/")}
                >
                  View All Events
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
    }
  };

  return (
    <div className="upcoming-events">
      <div className="upcoming-cards">
        <h2 id="upcomingEventsTitle">Upcoming Events</h2>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {renderEvents()}
        </Grid>
      </div>
    </div>
  );
};