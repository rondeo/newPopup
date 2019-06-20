import React from 'react';
import './profile.less';
import LogIn from '../LogIn';
import ProfileData from '../ProfileData';

const Profile = props => {
    return (
        <div className="popup-profile">
            <LogIn />
            {/*<ProfileData />*/}
        </div>
    );
};

export default Profile;