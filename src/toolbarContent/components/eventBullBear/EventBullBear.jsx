import React from 'react';
import PropTypes from "prop-types";
import './eventBullBear.less';
import * as logic from './logic';


const EventBullBear = props => {

    const {Better, Volatility} = props;

    return (
        <div className="mmCrExt-buls-bear">
            <img className="mmCrExt-buls-bear-img" src={logic.getImageSrc(Better, Volatility, 1)}
                 title="bulsAndBear"/>
            <img className="mmCrExt-buls-bear-img" src={logic.getImageSrc(Better, Volatility, 2)}
                 title="bulsAndBear"/>
            <img className="mmCrExt-buls-bear-img" src={logic.getImageSrc(Better, Volatility, 3)}
                 title="bulsAndBear"/>
        </div>
    )
};

EventBullBear.propTypes = {
    Better: PropTypes.bool,
    Volatility: PropTypes.number,
};

export default EventBullBear;