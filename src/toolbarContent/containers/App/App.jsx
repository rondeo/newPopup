import React, {Component} from "react";
import "./app.less";
import {config} from '../../config';
import * as chromeApi from '../../chromeApi';
import Brand from '../../components/brand';
import Video from '../../components/Video';
import Economical from '../../components/economicalEventsBlock';
import KotirovkiBlock from '../../components/KotirovkiBlock';


class App extends Component {
    state = {
        src: config.src,
        quotes: config.quotes,
        events: config.events,
        eventsArr: config.eventsArr,
        activeEvent: config.activeEvent,
        isShowVideo: config.isShowVideo
    };

    updateState = (key, value) => {
        this.setState({
            [key]: value
        })
    };

    init = () => {
        chromeApi.init();
        chromeApi.updateDataEconEvents();
        chromeApi.dataListener(this.handleNewData);
    };

    handleNewData = response => {
        try {
            const dataType = response.cmd;
            const data = JSON.parse(response.data);

            if (data.length === 0) return;
            switch (dataType) {
                case 'economicalEvent.set-mmCrExt':
                    this.updateState('eventsArr', data);
                    break;
                case 'kotirovki.set-mmCrExt':
                    this.updateState('quotes', data);
                    break;
                default:
                    return;
            }
        } catch (e) {
            console.log(e)
        }
    };

    eventNextOne = () => {
        if (this.state.activeEvent === this.state.eventsArr.length - 1) {
            this.updateState('activeEvent', 0)
        } else {
            this.updateState('activeEvent', ++this.state.activeEvent)
        }
    };

    handleBrandClick = () => {
        chromeApi.openNewTab(this.state.src.brandUrl);
    };

    handleQuotesClick = () => {
        chromeApi.openNewTab(this.state.src.chartsUrl);
    };

    handleEventsClick = () => {
        chromeApi.openNewTab(this.state.src.calendarUrl);
    };

    handleCloseClick = () => {
        if(this.state.isShowVideo) {
            this.handleVideoButton();
        }
        chromeApi.closeToolbar();
    };

    handleVideoButton = () => {
        const cond = !this.state.isShowVideo;
        this.setState(state => {
            return {
                isShowVideo: cond,
            }
        });
        chromeApi.toggleVideo(cond);
    };

    componentDidMount() {
        this.init();
        this.interval = setInterval(() => this.eventNextOne(), 15000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {quotes, eventsArr, activeEvent} = this.state;
        return (
            <div
                className='mmCrExt-main-div'
                id='mmCrExt-mainDiv'>
                <Brand handleBrandClick={this.handleBrandClick}/>
                <KotirovkiBlock
                    quotes={quotes}
                    handleQuotesClick={this.handleQuotesClick}
                />
                {/*<Video*/}
                {/*    isShowVideo={this.state.isShowVideo}*/}
                {/*    handleVideoButton={this.handleVideoButton} />*/}
                <Economical
                    events={eventsArr[activeEvent]}
                    handleEventsClick={this.handleEventsClick}
                />
                <button
                    id="btn-close"
                    className="mmCrExt-btn-close"
                    onClick={this.handleCloseClick}
                >
                    <img src="/img/close_icon.svg" alt="close"/>
                </button>
            </div>
        )
    }
}

export default App;

