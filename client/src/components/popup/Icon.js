import React, { Component } from 'react';
import '../../css/Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Icon extends Component {
    render() {
        const { onClick, iconName } = this.props;
        return (
            <span className='popup_icon' onClick={onClick}>
                <FontAwesomeIcon icon={iconName} className='fa-lg'/>
            </span>
        );
    }
}
