import React, {Component} from 'react';
import './transferList.less';

class TransferList extends Component {


    render() {
        return (
            <div className="popup-transfer">
                <div>
                    <span>отображаются</span>
                    <ul className="popup-transfer__list">
                        <li>EUR/USD</li>
                        <li>GBP/USD</li>
                        <li>AUD/USD</li>
                        <li>CAD/USD</li>
                    </ul>
                </div>
                <div className="popup-transfer__buttons">
                    <button children=">>"/>
                    <button children=">"/>
                    <button children="<"/>
                    <button children="<<"/>
                </div>
                <div>
                    <span>не отображаются</span>
                    <ul className="popup-transfer__list">
                        <li>USD/JPY</li>
                        <li>USD/RUB</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                        <li>USD/JPY</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default TransferList;