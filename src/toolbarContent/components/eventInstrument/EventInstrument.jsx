import React from 'react';
import PropTypes from "prop-types";
import './eventInstrument.less';

const EventInstrument = props => {
    return (
        <div className="mmCrExt-events-instrument">{props.Currency}</div>
    );
};

EventInstrument.propTypes = {
    Currency: PropTypes.string
};

export default EventInstrument;