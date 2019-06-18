import React from 'react';
import PropTypes from "prop-types";
import './kotirovkiBlock.less';
import KotirovkiItem from '../KotirovkiItem/KotirovkiItem.jsx';


const KotirovkiBlock = props => {
    return (
        <div className="mmCrExt-kotirovki"
             onClick={props.handleQuotesClick}>
            <KotirovkiItem quotes={props.quotes}/>
        </div>
    )
};

KotirovkiBlock.propTypes = {
    quotes: PropTypes.array,
    handleQuotesClick: PropTypes.func,
};

export default KotirovkiBlock;

