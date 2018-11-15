import React, { Component } from 'react';
import '../../css/Popup.css';
import Icon from './Icon';

/**
 * @classdesc Called by Popup to construct a pair of one Icon and one text value. 
 * @param {String} field The data type of given text value, e.g. location, time.
 * @param {String} iconName The name of FAIcon to be constructed.
 * @param {Boolean} editing Whether the Popup is in editing mode.
 * @param {JsonObject} handleEditResult Pass handleEditResult behavior from Popup to this object.
 * 
 */
class Row extends Component {
    /**
	 * @constructor Currently we manually construct datas for popup to display since we do not have communication with others.
     * Initialize the state variables with corresponding input data.
     * (TO BE DONE) Communication with other front-end components and server.
	 * 
     * @private
	 * @param {None}
	 * @return {void} 
	 */
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.details
        };
    }

    handleChange(event){
        this.setState({
            item: event.target.value
        });
    }

    render() {
        const { field, iconName, details, editing, handleEditResult } = this.props;
        handleEditResult(field, this.state.item);
        return (
            <div className='popup_row'>
                <Icon iconName={iconName}/>
                {editing ? (<input type="text" value={this.state.item} placeholder="Input"
                        onChange={this.handleChange.bind(this)} />)
                        : (<span>{details}</span>)
                }
            </div>
        );
        
    }
}

export default Row;