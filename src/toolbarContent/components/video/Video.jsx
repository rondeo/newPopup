import React from 'react';
import './video.less';
import PropTypes from 'prop-types';

const Video = props => {

    const imgClass = props.isShowVideo ? 'arrowDown' : null;

    return (
        <div className="mmCrExt-div-video">
            <button
                className="mmCrExt-btn-video mmCrExt-play"
                onClick={props.handleVideoButton}
            >
                {'Maximarkets TV'}
                <img
                    className={imgClass}
                    src="../img/arrowRight.svg"
                    alt="play video"/>
            </button>
        </div>
    )
};

Video.propTypes = {
    isShowVideo: PropTypes.bool,
    handleVideoButton: PropTypes.func
};

export default Video;