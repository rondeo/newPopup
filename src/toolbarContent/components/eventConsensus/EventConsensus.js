import React from 'react';
import PropTypes from "prop-types";
import './eventConsensus.less';

const EventConsensus = props => {

    const {
        DisplayActual,
        DisplayPrevious,
        DisplayConsensus,
        DisplayActualColor,
        DisplayPreviousColor,
        DisplayConsensusColor,
    } = props;

    return (
        <div className="mmCrExt-numbers">
            <span className="mmCrExt-display"
                  style={{color: DisplayPreviousColor}}
            >
                {DisplayPrevious || '---'}
            </span>
            <span className="mmCrExt-display-separate"/>
            <span className="mmCrExt-display"
                  style={{color: DisplayConsensusColor}}
            >
                {DisplayConsensus || '---'}
            </span>
            <span className="mmCrExt-display-separate"/>
            <span className="mmCrExt-display"
                  style={{color: DisplayActualColor}}>
                {DisplayActual || '---'}
            </span>
        </div>
    );
};

EventConsensus.propTypes = {
    DisplayActual: PropTypes.string,
    DisplayPrevious: PropTypes.string,
    DisplayConsensus: PropTypes.string,
    DisplayActualColor: PropTypes.string,
    DisplayPreviousColor: PropTypes.string,
    DisplayConsensusColor: PropTypes.string,
};

export default EventConsensus;