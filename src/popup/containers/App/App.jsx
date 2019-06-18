import React, {Component} from "react";
import "./App.less";
import * as api from "../../chromeApi";
import {config} from '../../config';
import Tabs from '../../components/Tabs';
import News from '../../components/News';
import Signals from '../../components/Signals';

export default class App extends Component {

    state = {
        enableToolbar: config.enableToolbar,
        enableProxy: config.enableProxy,
        url: config.src
    };

    // initState = () => {
    //     api.getInitialSettings()
    //         .then(result => {
    //             const {proxySettings, toolbarSettings} = result;
    //             this.setState(state => ({
    //                 enableProxy: proxySettings || false,
    //                 enableToolbar: toolbarSettings || false
    //             }));
    //         })
    // };
    //
    //
    // handleToolbarSwitch = () => {
    //     const isEnableToolbar = !this.state.enableToolbar;
    //     this.setState(state => ({
    //         enableToolbar: isEnableToolbar
    //     }));
    //
    //     api.toggleToolbar();
    // };
    //
    // handleToggleChange = () => {
    //     const isEnableProxy = !this.state.enableProxy;
    //     this.setState(state => ({
    //         enableProxy: isEnableProxy
    //     }));
    //
    //     api.toggleProxy(isEnableProxy);
    // };
    //
    // componentDidMount() {
    //     // this.initState();
    // }

    render() {
        return (
            <div className="popup-wrapper">
                <Tabs>
                    <div label="Новости">
                        <News />
                    </div>
                    <div label="Сигналы">
                       <Signals />
                    </div>
                    <div label="Профиль">
                        Nothing to see here, this tab is <em>Профиль</em>!
                    </div>
                    <div label="Настройки">
                        Nothing to see here, this tab is <em>Настройки</em>!
                    </div>
                </Tabs>
                <div className="popup-footer">
                    <input type="checkbox" id="proxyCheckbox"/>
                    <label htmlFor="proxyCheckbox">включить впн</label>
                </div>
            </div>
        )
    }
}



