import React from 'react';
import PropTypes from "prop-types";
import './brand.less';


const Brand = props => {
    return (
        <div className="mmCrExt-brand"
             onClick={props.handleBrandClick}/>
    )
};

Brand.propTypes = {
    handleBrandClick: PropTypes.func,
};

export default Brand;