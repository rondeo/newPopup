import React from 'react';
import './news.less';
import NewsItem from '../NewsItem';

const News = props => {
    return (
        <div className="popup-news">
            <div className="popup-news__body">
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
            </div>
            <div className="popup-news__footer">
                <span>Фильтр новостей</span>
                <input type="checkbox" id="stockCheckbox"/>
                <label htmlFor="stockCheckbox">Акции</label>
                <input type="checkbox" id="сommoditiesCheckbox"/>
                <label htmlFor="сommoditiesCheckbox">Товары</label>
                <input type="checkbox" id="stockCurrency"/>
                <label htmlFor="stockCurrency">Валюты</label>
            </div>
        </div>
    );
};

export default News;