import MenuAppBar from '../../components/Navbar/Navbar';
import DashDrawer from '../../components/Drawer/Drawer';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import './ProfilePage.css';
import React, {useEffect, useState} from 'react';
import {getProfile} from '../../api/backendAPI';
import {getKids} from '../../api/backendAPI';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Grid, Divider } from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

const ProfilePage = () =>{
    const [displayForm, setDisplayForm] = useState(false)
    const [profile, setProfile] = useState()
    const [kids, setKids] = useState()
    
    useEffect(() => {
        const callGetProfile = async () => {
                let response = await getProfile(localStorage.getItem('accessToken'))
                if(response){
                    setProfile(response[0])
                    // console.log(response)
                }else{
                    console.error('response failed')
                }
        }
        const callGetKids = async () => {
            let response = await getKids(localStorage.getItem('accessToken'))
            if(response){
                setKids(response)
                // console.log(response)
            }else{
                console.error('response failed')
            }
        }
        callGetProfile();
        callGetKids()
    }, []);

    const callDisplayForm = () => {
        setDisplayForm(true);
    }

    const generateKids = () => {
        if (kids){
            return kids.map((kid, index) => {
                return(<div><FaceIcon />  {kid['age_group']}, {kid['gender']}</div>)
            })
        }else{
            return(<h3>No children to display</h3>)
        }               
    }


    return (
        <div className='ProfilePageArea'>
            <MenuAppBar />
            <DashDrawer/>
            {
                displayForm 
                ? <EditProfileForm profile={profile} kids={kids} /> 
                :
                <div className='ProfileArea'>
                    {   profile
                        ?
                        <div>

                            <Grid 
                                container 
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0}
                            >   
                                <Grid item xs={1} className='clearDisplay'/>
                                <Grid className={"propicBox"} item xs={3}>
                                    <div>
                                            <img id="edit-profile-pic" src={profile.profile_pic} /> 
                                            <h3>{profile.first_name} {profile.middle_name} {profile.last_name}</h3>
                                            <p>Preferred Name: {profile.preferred_name}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={3} className={'pro-grid-item'}>
                                    <div>
                                        <p>DOB: {profile.birthdate}</p>
                                        <Divider />
                                        <p>Email: {profile.email}</p>
                                        <Divider />
                                        <p>Zip: {profile.zip_code}</p>
                                        <Divider />
                                        <p>Intro: {profile.intro}</p>
                                        <Divider />
                                        <p>Full Bio: {profile.full_bio}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={3} className={'pro-grid-item'}>
                                    <div>
                                        <p>Personal Interests: {profile.personal_interests}</p>
                                        <Divider />
                                        <p>Family Interests: {profile.family_interests} </p>
                                        <Divider />
                                        <p>Available Times: {profile.available_times}</p>
                                    </div>
                                </Grid>
                                <Grid item xs={3} className={'pro-grid-item'}>
                                    <h4>Children: </h4>
                                    {generateKids()}
                                </Grid>
                            </Grid>
                            <Button className='editButton' variant='contained' onClick={callDisplayForm}><EditIcon /></Button>
                        </div>
                        :
                        <p>Loading...</p>
                    }

                </div>
            }
        </div>
    )
}

export default ProfilePage
