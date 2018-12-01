import React, { Component } from 'react';
import '../../assets/styles/Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * @classdesc Construct a FontAwesonIcon. 
 */
class Icon extends Component {
    /**
	 * Render the icon with given iconName.
	 * @param {Function} onClick Associate specific onClick behavior with this icon.
     * @param {String} iconName The name of FAIcon to be constructed.
     * @returns {html} Returns an html object of FAIcon. 
	 */
    render() {
        const { onClick, iconName } = this.props;
        return (
            <span className='popup_icon' onClick={onClick}>
                <FontAwesomeIcon icon={iconName} className='fa-lg'/>
            </span>
        );
    }
}

export default Icon;
