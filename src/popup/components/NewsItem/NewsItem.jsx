import React from 'react';
import './newsItem.less';

const NewsItem = props => {
    return (
        <div className="popup-news__item">
            <div className="popup-news__volatility">
                <img src="../img/burn_red.svg" alt=""/>
                <img src="../img/burn_red.svg" alt=""/>
                <img src="../img/burn_white.svg" alt=""/>
            </div>
            <span>Норма инфляции ЕС (м/м)</span>
        </div>
    );
};

export default NewsItem;