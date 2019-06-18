import React from 'react';
import PropTypes from 'prop-types';
import './kotirovkiItem.less';


const KotirovkiItem = props => {

    const {quotes} = props;

    return (
        quotes.map(item => (
                <div key={item.ID}
                     className="mmCrExt-instrument">
                    <div className="mmCrExt-instrument-name">
                        {item.Name}
                    </div>
                    <div className="mmCrExt-instrumentAmount"
                         style={{color: item.fontColor}}>
                        {`${item.CurrentValue} / ${item.AskValue}`}
                    </div>
                </div>
            )
        )
    )
};

KotirovkiItem.propTypes = {
    quotes: PropTypes.array
};

export default KotirovkiItem;