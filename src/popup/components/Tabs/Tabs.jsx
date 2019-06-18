import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tab from '../Tab';

export default class Tabs extends Component {
    state = {
        activeTab: this.props.children[0].props.label,
    };

    onClickTabItem = (tab) => {
        this.setState({activeTab: tab});
    };

    render() {
        const {
            onClickTabItem,
            props: {
                children,
            },
            state: {
                activeTab,
            }
        } = this;

        return (
            <React.Fragment>
                <div className="popup-header">
                    {children.map((child) => {
                        const {label} = child.props;

                        return (
                            <Tab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClickTabItem={onClickTabItem}
                            />
                        );
                    })}
                </div>
                <div className="popup-body">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return null;
                        return child.props.children;
                    })}
                </div>
            </React.Fragment>
        );
    }
}

Tabs.propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
};

