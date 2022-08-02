import React from 'react';
import './Dashboard.css';

import PendingConnections from '../../components/PendingConnections/PendingConnections';
import Events from '../../components/Events/Events';
import { Weather } from '../../components/Weather/Weather.js';
import MenuAppBar from '../../components/Navbar/Navbar';
import DashDrawer from '../../components/Drawer/Drawer';
import { UpcomingEvents } from '../../components/UpcomingEvents/UpcomingEvents';
import { Grid } from '@mui/material';




const Dashboard = () => {


  return (
    
    <div id="dashboardContainer">

      <MenuAppBar />
      <DashDrawer/>
      <Grid container spacing={2} id="gridContainer">
        <Grid item xs={12} md={6}>
          <UpcomingEvents />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Weather />
        </Grid>
        <Grid item xs={12} md={6} id="connectionsContainer">
          <PendingConnections />
        </Grid>
        <Grid item xs={12} md={4}>
          <Events />
        </Grid>
        {/* <Row xs={1} sm={1} md={2} lg={2} id="dashboardRow">
          <Col className="dashboardSections" id="dashboardUpcomingEvents">
            <UpcomingEvents />
          </Col>
          <Col className="dashboardSections" id="dashboardWeather">
            <Weather />
          </Col>
        </Row>
        <Row xs={1} sm={2} md={2} lg={2} id="dashboardRow">
          <Col className="dashboardSections" id="dashboardRequests">
            <PendingConnections />
          </Col>
          <Col className="dashboardSections" id="dashboardSuggested">
            <Events />
          </Col>
        </Row> */}
      </Grid>
    </div>
  );
}

export default Dashboard
