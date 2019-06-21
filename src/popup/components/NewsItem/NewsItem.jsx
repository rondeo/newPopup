import React from 'react';
import './newsItem.less';

const NewsItem = props => {
    console.log('item', props.instrument);
    return (
        <div className="popup-news__item">
            <div className="popup-news__volatility">
                <span>{props.instrument.Time}</span>
                <span>{props.instrument.Currency}</span>
                <span>{props.instrument.Name}</span>
                <img src="../img/burn_red.svg" alt=""/>
                <img src="../img/burn_red.svg" alt=""/>
                <img src="../img/burn_white.svg" alt=""/>
            </div>

        </div>
    );
};

export default NewsItem;