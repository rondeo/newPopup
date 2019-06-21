import React from 'react';
import PropTypes from 'prop-types';
import './news.less';
import NewsItem from '../NewsItem';

const News = props => {
    console.log('props', props)
    return (
        <div className="popup-news">
            <div className="popup-news__body">
                {props.economicalEvent &&
                    props.economicalEvent.arrayByInstrument.map(instrument => (
                    <NewsItem
                        key={instrument.Name}
                        instrument={instrument}
                    />
                ))}
            </div>
            <div className="popup-news__footer">
                <span>Фильтр новостей</span>
                <input type="checkbox"
                       id="stockCheckbox"
                       name="filterStock"
                       checked={props.filterStock}
                       onChange={props.handleFilterNewsChange}
                />
                <label htmlFor="stockCheckbox">Акции</label>
                <input type="checkbox"
                       id="сommoditiesCheckbox"
                       name="filterCommodities"
                       checked={props.filterCommodities}
                       onChange={props.handleFilterNewsChange}
                />
                <label htmlFor="сommoditiesCheckbox">Товары</label>
                <input type="checkbox"
                       id="stockCurrency"
                       name="filterCurrency"
                       checked={props.filterCurrency}
                       onChange={props.handleFilterNewsChange}
                />
                <label htmlFor="stockCurrency">Валюты</label>
            </div>
        </div>
    );
};

export default News;

News.propTypes = {
    filterStock: PropTypes.boolean,
    filterCurrency: PropTypes.boolean,
    filterCommodities: PropTypes.boolean
};