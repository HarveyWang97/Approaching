import React, { Component } from 'react';
import '../../css/Popup.css';
import Row from './Row';
import Icon from './Icon';
import {insertEvent} from '../../Request';
import {connect} from 'react-redux';
import  * as actions from '../../actions';

/**
 * @classdesc Construct a Popup component that renders given data object. 
 */
class EventPopup extends Component {
    /**
     * Currently we manually construct datas for popup to display since we do not have communication with others.
     * Initialize the state variables with corresponding input data.
     * (TO BE DONE) Communication with other front-end components and server.
	 * @constructor 
	 * @param {None}
	 * @return {void} 
	 */
    constructor(props){
        super(props);

        this.fieldToIcon = {
            description: 'file-alt',
            time: 'clock',
            location: 'map-marker-alt',
            itemList: 'list-ul',
            eventList: 'calendar-alt'
        };
        
        this.data = {
            type: 'event',
            data: {
                title: '',
                description: '',
                time: '',
                location: '',
                itemList: ''
            }
        };

        this.state = {
            
        };
        for (let key in this.data.data) {
            this.state[key] = this.data.data[key];
        }
    }


     /**
	 * This method set the value of title to the new input value.
	 * 
	 * @param {JsonObject} event a specific event that invokes this method, e.g. editing the iput form
	 * @return {void} 
	 */
    handleChange(event){
        this.setState({
            title: event.target.value
        });
    }

    /**
	 * This method invokes the changeEditingState() on clicking of submit button.
     * In the future it will send the changed data to server and reducer.
	 * 
	 * @param {None}
	 * @return {void}
	 */
    handleSubmit() {
        
    }

    /**
	 * This method set the value of each key to the new given value.
	 * 
	 * @param {String} key a specific event that invokes this method, e.g. editing the iput form.
	 * @param {String} value the given new value.
     * @return {void} 
	 */
    handleEditResult(key, value) {
        this.state[key] = value;
    }


    /**
	 * Render the popup based on input data type and value. 
     * 
	 * @param {none}
     * @return {html} Returns a html block of Popup component. 
	 */
    render() {
        const data = this.data.data;
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className='top'>
                        <span>
                            <Icon iconName='times' onClick={() => this.props.toggleAddEventPopup()} />
                            <input className='title' type="text" value={this.state.title} placeholder="Input event name here"
                            onChange={this.handleChange.bind(this)} />
                        </span>
                    </div>
                    <div className='middle'>
                        {Object.keys(data).map(key => {
                            if (key !== 'title') {
                                return (
                                    <Row key={key} 
                                         field={key}
                                         iconName={this.fieldToIcon[key]}
                                         details={this.state[key]}
                                         editing={true}
                                         handleEditResult={this.handleEditResult.bind(this)} />
                                );
                            }
                        })}
                    </div>
                    <div className='bottom'>
                        <div className='left'>
                            <Icon iconName='save' onClick={this.handleSubmit.bind(this)} />
                        </div>
                        <div className='right'>
                            <Icon iconName='trash-alt' />
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

function mapStateToProps(state){
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps,actions)(EventPopup);