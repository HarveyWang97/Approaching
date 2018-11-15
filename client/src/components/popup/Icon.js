import React, { Component } from 'react';
import '../../css/Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * @classdesc Construct a FontAwesonIcon. 
 * @param {JsonObject} onClick Associate specific onClick behavior with this icon.
 * @param {string} iconName The name of FAIcon to be constructed.
 */
class Icon extends Component {
    /**
	 * Render the icon with given iconName.
	 * @param {none}
     * @return {html} Return a html object of FAIcon. 
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
