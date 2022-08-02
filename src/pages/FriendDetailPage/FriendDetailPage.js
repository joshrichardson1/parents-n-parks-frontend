import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MenuAppBar from '../../components/Navbar/Navbar';
import DashDrawer from '../../components/Drawer/Drawer';
import { Avatar } from '@mui/material';
import getKidByProfile from '../../api/KidByProfile';
import FaceIcon from '@mui/icons-material/Face';
import './FriendDetailPage.css';

const FriendDetailPage = () => {
    const location = useLocation()
    const [profile, setProfile] = useState(location.state.profile)
    const [kids, setKids] = useState([])

    useEffect(() => {
        const callGetKids = async () => {
            let resp = await getKidByProfile(localStorage.getItem('accessToken'), profile.id)
            if(resp){
                setKids(resp)
            }else{
                console.error('API call for Kids failed.')
            }
        }
        callGetKids()
    }, [])

    const generateKids = () => {
        if (kids){
            return kids.map((kid, index) => {
                return(<div className={'Kid'}><FaceIcon />  {kid['age_group']}, {kid['gender']}</div>)
            })
        }else{
            return(<h3>No children to display</h3>)
        }               
    }

    return (
        <div>
            <MenuAppBar />
            <DashDrawer/>
            <div className='friendProfileArea'>
                <div className='proGrid'>
                    <div className='initialInfoCard'>
                        <Avatar alt={profile.first_name} src={profile.profile_pic} sx={{ width: 100, height: 100 }}/>
                        <h4><strong>{profile.first_name} {profile.last_name}</strong></h4>
                        <p>{profile.intro}</p>
                        <hr className='divider'/>
                        <h6>Personal Interests:</h6>
                        <p>{profile.personal_interests}</p>
                    </div>
                    <div className='secondaryGrid'>
                        <div className='secondaryCards'>
                            <div className='famBio'>
                                <h3><strong>About Me and My Family</strong></h3>
                                <hr className='divider'/>
                                <p>{profile.full_bio}</p>
                            </div>
                            <div className='famInterests'>
                                <h5><strong>Family Interests</strong></h5>
                                <hr className='divider'/>
                                <p>{profile.family_interests} Skiing, hiking</p>
                            </div>
                        </div>
                        <div className='secondaryCards'>
                            <div className='kidsLabel'>
                                <h3>Kids: </h3>
                                <hr className='divider' />
                            </div>
                            <div className='kidsList'>
                                {kids && generateKids()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendDetailPage;