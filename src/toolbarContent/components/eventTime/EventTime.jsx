import React from 'react';
import PropTypes from "prop-types";
import './eventTime.less';

const EventTime = props => {
    return (
        <div className="mmCrExt-time">
            {'GMT'}
            <span>{props.Time}</span>
        </div>
    );
};


EventTime.propTypes = {
    Time: PropTypes.string
};

export default EventTime;