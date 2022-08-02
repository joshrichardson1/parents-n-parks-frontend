import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUpForm from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import EventsPage from './pages/EventsPage/EventsPage'
import FriendsPage from './pages/FriendsPage/FriendsPage';
import MessagesPage from './pages/MessagesPage/MessagesPage';
import { MeetUp } from './pages/MeetUpPage/MeetUp';
import FindFriendsPage from "./pages/FindFriendsPage/FindFriendsPage";
import FriendDetailPage from './pages/FriendDetailPage/FriendDetailPage';
import MainLandingPage from './pages/LandingPage/MainLandingPage';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path={'/'} element={<MainLandingPage />} />
          <Route exact path={'/home'} element={<Dashboard />} />
          <Route exact path={'/create-profile'} element={<SignUpForm />} />
          <Route exact path={'/profile'} element={<ProfilePage/>}/>
          <Route exact path={'/events'} element={<EventsPage/>}/>
          <Route exact path={'/friends'} element={<FriendsPage/>}/>
          <Route exact path={'/messages'} element={<MessagesPage/>}/>
          <Route exact path={'/meetups'} element={<MeetUp />} />
          <Route exact path={'/find-friends'} element={<FindFriendsPage />} />
          <Route exact path={'/friends/:id'} element={<FriendDetailPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
