import React from 'react';
import PropTypes from 'prop-types';
import './economical.less';
import EventTime from '../eventTime';
import EventFlag from '../EventFlag';
import EventName from '../EventName';
import EventBullBear from '../eventBullBear/EventBullBear';
import EventConsensus from '../EventConsensus';
import EventInstrument from '../EventInstrument';


const Economical = props => {

    const {
        Time,
        Name,
        Better,
        Currency,
        Volatility,
        DisplayActual,
        DisplayPrevious,
        DisplayConsensus,
        InternationalCode,
        DisplayActualColor,
        DisplayPreviousColor,
        DisplayConsensusColor,
    } = props.events;


    return (
        <div className="mmCrExt-economical-events"
             onClick={props.handleEventsClick}>
            <EventFlag InternationalCode={InternationalCode}/>
            <EventTime Time={Time}/>
            <EventInstrument Currency={Currency}/>
            <EventBullBear
                Better={Better}
                Volatility={Volatility}
            />
            <EventName Name={Name}/>
            <EventConsensus
                DisplayActual={DisplayActual}
                DisplayPrevious={DisplayPrevious}
                DisplayConsensus={DisplayConsensus}
                DisplayActualColor={DisplayActualColor}
                DisplayPreviousColor={DisplayPreviousColor}
                DisplayConsensusColor={DisplayConsensusColor}
            />
        </div>
    )
};

Economical.propTypes = {
    events: PropTypes.object,
    handleEventsClick: PropTypes.func,
};

export default Economical;