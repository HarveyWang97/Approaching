import React, { Component } from 'react';
import '../../assets/styles/Popup.css';
import Icon from '../common/Icon';
import Select from 'react-select';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import { isArray } from 'util';
import uuidv4 from 'uuid/v4';

var today = new Date();
var todayISO = today.toISOString().slice(0,16);
var todayDateISO = today.toISOString().slice(0,10);
/**
 * @classdesc Called by Popup to construct a pair of one Icon and one content field.
 */
class Row extends Component {
    /**
     * Initialize the state variables with given input data, input is passed from Popup component.
	 * @constructor
	 * @param {Object} props The properties passed in when the component is constructed.
     * The input values are three strings (contentType, field, details). 
     * contentType: Determine if the input is for an event object or an item object.
     * field: Determine which field in the object is passed in, and handle different fields properly.
     * details: The content to be rendered.
	 * @return {void} 
	 */
    constructor(props) {
        super(props);

        const { contentType, field, details } = this.props;
        this.state = {
            description: field === 'description' ? details : '',
            diyLocation: field === 'location' && contentType === 'item' ? 
                this.reformatItemLocation(details) : ''
        }        
    }

    /**
	 * This method sets this row's field value to the new input value. 
     * It handles different field differently.
     * For time field (in event object), get input value from time picker.
	 * For expireDate field (in item object), get input value from date picker.
     * For itemList or eventList field, parse input from item/event selector component.
	 * @param {Object} event A specific event that invokes this method, e.g. editing the input form.
	 * @return {void} 
	 */
    handleChange(event) {
        const { handleEditResult, field } = this.props;
        if (field === 'time') {
            const time = document.getElementById('timepicker');

            const d = new Date(time.value);
            const mtime = d.getTime();
            // console.log('mtime', mtime);
            handleEditResult(field, mtime);
        }
        else if (field === 'expireDate') {
            const time = document.getElementById('datepicker');
            // console.log(time.value);
            const d = new Date(time.value);
            const mtime = d.getTime();
            // console.log('expire time', mtime);
            handleEditResult(field, mtime);
        }
        else if(field === 'itemList' || field === 'eventList'){
            if(isArray(event)){
                const formatted_data = JSON.stringify(event);
                handleEditResult(field,formatted_data);
            }
            else{
                if(event === null || event === undefined || event.target.newItem.value === ''){
                    return;
                }
                let raw_data;
                if(this.props.details === null || this.props.details === undefined || this.props.details.length === 0){
                    raw_data = [];
                }
                else{
                    raw_data = JSON.parse(this.props.details);
                }
               
                raw_data.push({label:event.target.newItem.value,id:uuidv4()});
                handleEditResult(field,JSON.stringify(raw_data));
            }    
        }
        else {
            handleEditResult(field, event.target.value);
        }
    }

    /**
     * Handle manually added items
     * @param {item} e 
     * @return {void}
     */
    handleManuallyAddItem(e){
        e.preventDefault();
        this.handleChange(e);
    }

    /**
     * Convert the unix timestamp into a time display string of format like "Dec 1 2018 10:00"
     * @param {number} UNIX_timestamp 
     * @return {String} formatted string with given unix timestamp
     */
    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp*1);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours() < 10 ? ('0'+a.getHours()) : a.getHours();
        var min = a.getMinutes() < 10 ? ('0'+a.getMinutes()) : a.getMinutes();
        var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min ;
        return time;
    }

    /**
     * Convert the unix timestamp into a date display string of format like "Dec 1 2018"
     * @param {number} UNIX_timestamp 
     * @return {String} formatted string with given unix timestamp
     */
    dateConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp*1);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date + ' ' + year ;
        return time;
    }

    /**
     * Show location in a formatted way
     * @param {String} location 
     * @return {String}
     */
    reformatItemLocation(location) {
        return location ? JSON.parse(location).join(' / ') : '';
    }

    /**
     * Get Event/Item description from server and render them in edit/display mode
     * @param {Boolean} editing 
     * @param {String} details 
     */
    renderDescription(editing, details) {
        return (
            <div className={'popup-field-content-row popup-description-field-content-row'}>
                {editing ? (
                    <input 
                        type='text'
                        value={this.state.description}
                        placeholder='Input'
                        onChange={e => {
                            this.setState({ description: e.target.value });
                            this.handleChange(e);
                        }}
                    />
                ) : <span>{details}</span>}
            </div>
        );
    }

    /**
     * Handle event time picker, including setting default time and choosing new time
     * @param {Boolean} editing 
     * @param {number} details 
     * 
     */
    renderTime(editing, details) {
        const showTime = this.timeConverter(details);
        const dTime = details ? new Date(details*1-28800000).toISOString().slice(0,16) : null;

        return (
            <div className={'popup-field-content-row popup-time-field-content-row'}>
                {editing ? (
                    <input 
                        id='timepicker'
                        type='datetime-local'
                        min={todayISO}
                        max='2030-12-31T00:00'
                        defaultValue={dTime}
                        onChange={this.handleChange.bind(this)}
                    />
                ) : <span>{showTime}</span>}
            </div>
        );
    }

    /**
     * Handle expireDate picker, including setting default date, date is NaN and choosing new date
     * @param {Boolean} editing 
     * @param {number} details 
     * 
     */
    renderDate(editing, details) {
        const showTime = details && !isNaN(details) ? this.dateConverter(details*1+86400000) : "";
        const dTime = details !== undefined && details.length>0 && !isNaN(details) ? new Date(details*1-28800000+86400000).toISOString().slice(0,10) : null;

        return (
            <div className={'popup-field-content-row popup-date-field-content-row'}>
                {editing ? (
                    <input 
                        id='datepicker'
                        type='date'
                        min={todayDateISO}
                        max='2030-12-31'
                        defaultValue={dTime}
                        onChange={this.handleChange.bind(this)}
                    />
                ) : <span>{showTime}</span>}
            </div>
        );
    }

    /**
     * Render selected items or events in edit mode
     * @param {Array<item>} items 
     * @return {Array<String>}
     */
    renderRemovable(items) {
        let formatted_items;
        let output;
        if(items === undefined || items.length === 0){
            output = (<div/>);
        } else {
            formatted_items = JSON.parse(items);
            output = formatted_items.map((item,idx) => (
                <li
                    key={idx}
                    className={'popup-field-content-row popup-list-field-content-row popup-list-display'}
                >
                    {item.label}
                </li>
            ));
        }
        return output;
    }

    /**
     * Render item location part in item detail in editing/non-editing mode
     * @param {Boolean} editing 
     * @param {String} details 
     */
    renderLocation(editing, details) {
        const { contentType, items } = this.props;
        const className = 'popup-field-content-row popup-location-field-content-row';
        
        if (contentType === 'event') {
            return editing ? (
                <div className={className}>
                    <input 
                        type='text'
                        value={details}
                        placeholder='Input'
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
            ) : <span className={className}>{details}</span>;
        }
        
        const paths = [];
        const pathsSet = new Set([]);

        if (items) {
            items.forEach(item => pathsSet.add(item.location));
        }
        pathsSet.forEach(path => paths.push(path));
        paths.forEach((path, index) => paths[index] = {
            label: this.reformatItemLocation(path),
            value: path
        });
        paths.sort((a, b) => a.label - b.label);
        const currentLocation = this.reformatItemLocation(details);

        return editing ? (
            <div>
                <div className={className}>
                    Write the location if it's new
                </div>
                <Select
                    className={`basic-single popup-field-select ${className}`}
                    classNamePrefix='select'
                    defaultValue={{ label: currentLocation, value: details}}
                    isSearchable={true}
                    name='color'
                    options={paths}
                    maxMenuHeight={100}
                    onChange={data => {
                        const { handleEditResult, field } = this.props;
                        handleEditResult(field, data.value);
                    }}
                />
                <div className={className}>
                    <input type='text' value={this.state.diyLocation} onChange={e => {
                        this.setState({
                            diyLocation: e.target.value
                        })
                        // the user inputed location can use '/' or ' / ' as separators
                        const newLocation = e.target.value.split(' / ').join('/').split('/');
                        if (newLocation && newLocation.length > 0 && newLocation[0] === 'home') {
                            const { handleEditResult, field } = this.props;
                            handleEditResult(field, JSON.stringify(newLocation));
                        }
                    }}/>
                </div>
            </div>
        ) : <span className={className}>{currentLocation}</span>;
    }

    // the itemList is in the format [{lable:xxx,id:xxx}.....] 
    /**
     * Render the itemList and item selection in event detail in editing/non-editing mode
     * @param {Boolean} editing 
     * @param {Array<item>} details 
     */
    renderItemList(editing, details) {
        let output;
        let formatted_details;
        if(details === undefined || details.length === 0){
            output = (<div/>);
        } else {
            formatted_details = JSON.parse(details);
            output = formatted_details.map((item,idx) => (
                <li
                    key={idx}
                    className={'popup-field-content-row popup-list-field-content-row popup-list-display'}
                >
                    {item.label}
                </li>
            ));
        }
        const className = 'popup-field-content-row popup-list-field-content-row';

        return editing ? (
            <div>
                <form className={className} onSubmit={(e) => this.handleManuallyAddItem(e)}>
                    <input type='text' placeholder='Input' name = 'newItem'/>
                    <button
                        type='submit'
                        className='popup-field-content-row-autosize-button'
                    >
                        add
                    </button>
                </form>
                <div className={className}>
                    <button type='button' className='popup-field-content-row-fullsize-button'
                            onClick={() => this.props.toggleItemSelector({
                        id:this.props.field._id,
                        handleSubmit: this.handleChange.bind(this),
                        formatted_details:formatted_details
                    })}>Open Item Selector</button>
                </div>
                {this.renderRemovable(details)}
            </div>
        ) : <div>{output}</div>;
    }

    /**
     * Render the eventList and event selection in item detail in editing/non-editing mode
     * @param {Boolean} editing 
     * @param {Array<event>} details 
     */
    renderEventList(editing, details) {
        let output;
        let formatted_details;
        if (details === undefined || details.length === 0){
            output = (<div/>);
        } else {
            formatted_details = JSON.parse(details);
            output = formatted_details.map((item,idx) => (
                <li
                    key={idx}
                    className={'popup-field-content-row popup-list-field-content-row popup-list-display'}
                >
                    {item.label}
                </li>
            ));
        }
        const className = 'popup-field-content-row popup-list-field-content-row';
        
        return editing ? (
            <div>
                <div className={className}>
                    <button type='button' className='popup-field-content-row-fullsize-button'
                            onClick={() => this.props.toggleEventSelector({
                        id:this.props.field._id,
                        handleSubmit: this.handleChange.bind(this),
                        formatted_details:formatted_details
                    })}>Open Event Selector</button>
                </div>
                {this.renderRemovable(details)}
            </div>
        ) : <div>{output}</div>;
    }

    /**
	 * Render the row based on the given input. The information needed is:
     * field: String. field The data type of given text value, e.g. location, time.
     * iconName: String. iconName The name of FAIcon to be constructed.
     * editing: Boolean. editing Whether the Popup is in editing mode.
     * handleEditResult: Object. handleEditResult Pass handleEditResult behavior from Popup to this object.
     * @param {None}
     * @return {html} Returns a html block of Popup component. 
	 */
    render() {
        const { field, iconName, details, editing } = this.props;
        let content = null;
        switch (field) {
            case 'description':
                content = this.renderDescription(editing, details);
                break;
            case 'time':
                content = this.renderTime(editing, details); 
                break;
            case 'expireDate':
                content = this.renderDate(editing, details); 
                break;
            case 'location':
                content = this.renderLocation(editing, details); 
                break;
            case 'itemList':
                content = this.renderItemList(editing, details);
                break;
            case 'eventList':
                content = this.renderEventList(editing, details);
                break;
        
            default:
                break;
        }

        return (
            <div className='popup-field'>
                <Icon iconName={iconName}/>
                {content}
            </div>
        );
        
    }
}

function mapStateToProps(state){
    return {
        items: state.items['rawItems']
    }
}

export default connect(mapStateToProps, actions)(Row);