import React from 'react';
import PropTypes from "prop-types";
import './eventFlag.less';


const EventFlag = props => {

    const imgFlagSrc = `/img/flag/${props.InternationalCode.toLowerCase()}.svg`;

    return (
        <div className="mmCrExt-flags-of-countries">
            <img src={imgFlagSrc}/>
        </div>
    );
};

EventFlag.propTypes = {
    InternationalCode: PropTypes.string
};

export default EventFlag;