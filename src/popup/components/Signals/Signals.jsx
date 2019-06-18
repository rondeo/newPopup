import React from 'react';
import './signals.less';
import SignalsItem from '../SignalsItem';

const Signals = props => {
    return (
        <div className="popup-signals">
            <div className="popup-signals__body">
                <SignalsItem />
                <SignalsItem />
                <SignalsItem />
                <SignalsItem />
                <SignalsItem />
                <SignalsItem />
            </div>
        </div>
    );
};

export default Signals;