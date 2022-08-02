import React, { useState, useEffect } from 'react';
import './PendingConnections.css';
import Carousel from "react-multi-carousel";
import {Card, Image} from 'react-bootstrap';
import "react-multi-carousel/lib/styles.css";
import { Button } from '@mui/material';
import {fetchFriendRequests, acceptFriendRequest, declineFriendRequest } from '../../api/PendingAPI';

let UpcomingEvents = (props) => {
    const [friendRequests, setFriendRequests] = useState();
    const [updated, setUpdated] = useState(false);
    const no_pic = "https://cp-pnp-bucket.s3.amazonaws.com/90/no-profile-image.png";
    useEffect(() => {
        const fetchRequests = async () => {
            let token = localStorage.getItem('accessToken')
            let requestObj = await fetchFriendRequests(token)
            console.log(requestObj)
            setFriendRequests(requestObj)
        }
        fetchRequests();
    }, [updated]);
    

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const handleAccept = (requestID) => {
        console.log(requestID)

        const callAcceptFriendRequest = async () => {
            let response = await acceptFriendRequest(requestID)
            if(response){
                console.log(response)
            }else{
                console.error('api call failed')
            }
        }
        callAcceptFriendRequest()
        setUpdated(true)
    }

    const handleDecline = (requestID) => {
        console.log(requestID)

        const callDeclineFriendRequest = async () => {
            let response = await declineFriendRequest(requestID)
            if(response){
                console.log(response)
            }else{
                console.error('api call failed')
            }
        }
        callDeclineFriendRequest()
        setUpdated(true)
    }

    //This is where we can insert connection props from backend
    const getConnections = () => {
        if (!friendRequests || friendRequests.length < 1){
                return(
                    <div className={'profileCard'}>
                        <Card style={{height: '100%'}}>
                            <Card.Body>
                                <Card.Title>No Pending Connections</Card.Title>
                            </Card.Body>
                        </Card>
                    </div>
                )
        } else {
            return friendRequests.map((item, index) => {
                return (
                    <div>
                        <Card className={'ProfileCard'}>
                            <Card.Body className='card-body pending-connection-card-body'>
                                <Image className={'ProfileImage'} roundedCircle={true} src={friendRequests[index]['sender'].profile_pic ? friendRequests[index]['sender'].profile_pic : no_pic}/>
                                <Card.Title>{friendRequests[index]['sender'].first_name} {friendRequests[index]['sender'].last_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Lets Connect!</Card.Subtitle>
                                <Card.Text>
                                    {friendRequests[index]['sender'].email}
                                </Card.Text>
                                <Button variant='text' onClick={() => {handleAccept(item.id)}} >Accept</Button>
                                <Button variant='text' onClick={() => {handleDecline(item.id)}}>Remove</Button>
                            </Card.Body>
                        </Card>
                    </div>
                )
            })
        } 
    }

    return (
        <div className={'PendingConnectionsArea'}>
            <h2 style={{color: 'white'}}>Pending Connections</h2>
            <Carousel
                centerMode={true}
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                infinite={false}
                keyBoardControl={true}
                customTransition="transform 300ms ease-in-out"
                transitionDuration={500}
                containerClass="carousel-container"
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
                {getConnections()}
            </Carousel>
        </div>
    )
}

export default UpcomingEvents;

