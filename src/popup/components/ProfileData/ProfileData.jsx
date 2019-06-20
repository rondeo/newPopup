import React from 'react';
import './profileData.less';

const ProfileData = props => {
    return (
        <div className="popup-profile__data">
            <div>Состояние счёта </div>
            <div>email: example@example.com</div>
            <div>имя: NAME</div>
            <div>фамилия: SURNAME</div>
            <div>баланс:</div>
            <div>account1 USD 33333</div>
            <div>account2 EUR 6666</div>
            <div>account3 EUR 856</div>
        </div>
    );
};

export default ProfileData;