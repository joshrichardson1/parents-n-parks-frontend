import React, {useEffect, useState} from 'react'
import MenuAppBar from '../../components/Navbar/Navbar';
import DashDrawer from '../../components/Drawer/Drawer';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {FixedSizeList} from 'react-window';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import getFriendsList from '../../api/FriendsListAPI';
import './FriendsPage.css';


const FriendsPage = () => {

    const [friends, setFriends] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const callGetFriendsList = async () => {
            let resp = await getFriendsList(localStorage.getItem('accessToken'))
            if(resp){
                setFriends(resp['response'])
            }else{
                console.error("friend call failed")
            }
        }
        callGetFriendsList()
    }, [])

    const Row = ({ index, style }) => (
        <div style={style}>
            <ListItem alignItems="flex-start" className='friendInstance' >
                <ListItemAvatar>
                <Avatar 
                    alt="https://www.researchgate.net/publication/303290600/figure/fig3/AS:941692383399950@1601528368900/Proposed-3D-happy-face-of-virtual-human_Q320.jpg" 
                    src="https://www.researchgate.net/publication/303290600/figure/fig3/AS:941692383399950@1601528368900/Proposed-3D-happy-face-of-virtual-human_Q320.jpg" />
                </ListItemAvatar>
                <div className={'proText'}>
                    <h5><strong>{friends[index].first_name} {friends[index].last_name}</strong></h5>
                    <p>{friends[index].intro}</p>
                    
                </div>
                {/* <ListItemText className={'proText'}
                primary={`${friends[index].first_name} ${friends[index].last_name}`}

                secondary={
                    <React.Fragment>
                    <Typography
                        sx={{ display: 'flex'}}
                        component="div"
                        variant="body2"
                        color="text.primary"
                    >
                    </Typography>
                    {friends[index].intro}
                    </React.Fragment>
                }
                /> */}
                <Button variant='contained' size='small' className='profileButton' onClick={() => {navToProfile(friends[index].id, friends[index])}}>Profile</Button>
            </ListItem>
            <Divider variant="inset" component="div" />        
        </div>
      );
      
    const navToProfile = (id, profile) => {
        navigate(`/friends/${id}`, {state: {profile}})
    }

    return (
        <div>
            <MenuAppBar />
            <DashDrawer/>
            <div className='friendListArea'>
                <div className='friendListBox'>
                    <h2>Friends</h2>
                    <FixedSizeList
                        height={700}
                        width={'100%'}
                        itemCount={friends.length}
                        overscanCount={1}
                        itemSize={100}
                    >
                        {friends && Row}
                    </FixedSizeList>
                </div>
            </div>
        </div>
    )
}

export default FriendsPage