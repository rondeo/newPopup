import React, {Component} from 'react';
import './settings.less';
import TransferList from '../TransferList';

class Settings extends Component {

    render() {
        const { enableToolbar , handleToolbarSwitch} = this.props;

        return (
            <div className="popup-settings">
                <div className="popup-settings__toolbar">
                    настройки тулбара
                    <label htmlFor="enableToolbar">
                        <input type="checkbox"
                               id="enableToolbar"
                               checked={!enableToolbar}
                               onChange={handleToolbarSwitch}
                        />
                        отключить тулбар
                    </label>
                    <label htmlFor="toolbarAlignTop">
                        <input type="checkbox"
                               id="toolbarAlignTop"/>
                        отображать тулбар вверху страницы
                    </label>
                    <label htmlFor="toolbarAlignBottom">
                        <input type="checkbox"
                               id="toolbarAlignBottom"/>
                        отображать тулбар внизу страницы
                    </label>
                </div>
                <div className="popup-settings__filter">
                    фильтр отображаемых в тулбаре инструментов
                    <TransferList />
                </div>
            </div>
        );
    }
}

export default Settings;