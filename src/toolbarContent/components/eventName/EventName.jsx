import React from 'react';
import PropTypes from 'prop-types';
import './eventName.less';


const EventName = props => {
    return (
        <div className="mmCrExt-description-content">
            <span>{props.Name}</span>
        </div>
    );
};

EventName.propTypes = {
    Name: PropTypes.string
};

export default EventName;