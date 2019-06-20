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

    state = {
        enableToolbar: config.enableToolbar,
        isEnableProxy: config.isEnableProxy,
        url: config.src
    };

    initState = () => {
        const initialSettings = api.getInitialSettings();
        console.log('initialSettings',initialSettings);
        this.setState(state => ({
            ...initialSettings
        }));
    };


    handleToolbarSwitch = () => {
        const isEnableToolbar = !this.state.enableToolbar;
        this.setState(state => ({
            enableToolbar: isEnableToolbar
        }));

        api.toggleToolbar();
    };

    handleToggleChange = () => {
        const isEnableProxy = !this.state.isEnableProxy;
        this.setState(state => ({
            isEnableProxy: isEnableProxy
        }));

        api.toggleProxy(isEnableProxy);
    };

    componentDidMount() {
        this.initState();

    }

    render() {
        console.log("this.state",this.state);

        return (
            <div className="popup-wrapper">
                <div className="popup-news__badge">11</div>
                <div className="popup-signals__badge">3</div>
                <Tabs>
                    <div label="Новости">
                        <News/>
                    </div>
                    <div label="Сигналы">
                        <Signals/>
                    </div>
                    <div label="Профиль">
                        <Profile/>
                    </div>
                    <div label="Настройки">
                        <Settings
                            enableToolbar={this.state.enableToolbar}
                            handleToolbarSwitch={this.handleToolbarSwitch}
                        />
                    </div>
                </Tabs>
                <div className="popup-footer">
                    <button>
                        Выйти из учетной записи
                    </button>
                    <label htmlFor="proxyCheckbox">
                        <input type="checkbox"
                               id="proxyCheckbox"
                               onChange={this.handleToggleChange}
                               checked={this.state.isEnableProxy}
                        />
                        включить впн
                    </label>
                </div>
            </div>
        )
    }
}



