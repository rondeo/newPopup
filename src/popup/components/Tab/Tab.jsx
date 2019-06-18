import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './tab.less';

const Tab = props => {

    const {label, onClickTabItem, activeTab} = props;

    const getTabStyle = (
        activeTab === label ? 'popup-tab popup-tab__active' : 'popup-tab'
    );

    return (
        <button
            className={getTabStyle}
            onClick={()=> onClickTabItem(label)}
        >
            {label}
        </button>
    );
}


export default Tab;

Tab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClickTabItem: PropTypes.func.isRequired,
};