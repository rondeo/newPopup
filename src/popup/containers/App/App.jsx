import React, {Component} from "react";
import "./App.less";
import * as api from "../../chromeApi";
import {config} from '../../config';
import Tabs from '../../components/Tabs';
import News from '../../components/News';
import Signals from '../../components/Signals';
import Profile from '../../components/Profile';
import Settings from '../../components/Settings';

export default class App extends Component {

    state = {};

    initState = () => {
        const initialSettings = api.getInitialSettings();
        console.log('initialSettings',initialSettings);
        this.setState(prevState  => ({
            ...initialSettings
        }));
    };

    handleFilterNewsChange = event => {
        const filterName = event.target.name;
        const isChecked = event.target.checked;

        this.setState(prevState  => ({
            [filterName]: isChecked
        }));

        api.toggleFilterNews(filterName);
    };

    handleToolbarSwitch = () => {
        const isEnableToolbar = !this.state.enableToolbar;
        this.setState(prevState  => ({
            enableToolbar: isEnableToolbar
        }));

        api.toggleToolbar();
    };


    componentDidMount() {
        this.initState();
    }

    render() {
        console.log("render.state",this.state);

        const {
            filterStock,
            enableToolbar,
            filterCurrency,
            economicalEvent,
            filterCommodities,
        } = this.state;

        return (
            <div className="popup-wrapper">
                <div className="popup-news__badge">11</div>
                <div className="popup-signals__badge">3</div>
                <Tabs>
                    <div label="Новости">
                        <News
                            filterStock={filterStock}
                            filterCurrency={filterCurrency}
                            economicalEvent={economicalEvent}
                            filterCommodities={filterCommodities}
                            handleFilterNewsChange = {this.handleFilterNewsChange}
                        />
                    </div>
                    <div label="Сигналы">
                        <Signals/>
                    </div>
                    <div label="Профиль">
                        <Profile/>
                    </div>
                    <div label="Настройки">
                        <Settings
                            enableToolbar={enableToolbar}
                            handleToolbarSwitch = {this.handleToolbarSwitch}
                        />
                    </div>
                </Tabs>
                <div className="popup-footer">
                    <button>
                        Выйти из учетной записи
                    </button>
                </div>
            </div>
        )
    }
}



