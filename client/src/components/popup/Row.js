import React, { Component } from 'react';
import '../../css/Popup.css';
import Icon from './Icon';
import Select from 'react-select';
import { connect } from 'react-redux';
import  * as actions from '../../actions';
import { isArray } from 'util';
import uuidv4 from 'uuid/v4';

var today = new Date();
var todayISO = today.toISOString().slice(0,16);
var todayDateISO = today.toISOString().slice(0,10);
/**
 * @classdesc Called by Popup to construct a pair of one Icon and one text value. 
 * 
 */
class Row extends Component {
    /**
	 * Currently we manually construct datas for popup to display since we do not have communication with others.
     * Initialize the state variables with corresponding input data.
     * (TO BE DONE) Communication with other front-end components and server.
	 * @constructor
	 * @param {None}
	 * @return {void} 
	 */
    /*
     constructor(props) {
         super(props);
     }
     */

    /**
	 * This method set the value of this row's item to the new input value.
	 * 
	 * @param {JsonObject} event a specific event that invokes this method, e.g. editing the iput form
	 * @return {void} 
	 */
    handleChange(event) {
        const { handleEditResult, field } = this.props;
        if (field === 'time') {
            const time = document.getElementById("timepicker");

            const d = new Date(time.value);
            const mtime = d.getTime();
            console.log("mtime", mtime);
            handleEditResult(field, mtime);
        }
        else if (field === 'expireDate') {
            const time = document.getElementById("datepicker");
            console.log(time.value);
            const d = new Date(time.value);
            const mtime = d.getTime();
            console.log("expire time", mtime);
            handleEditResult(field, mtime);
        }
        else if(field === 'itemList' || field === 'eventList'){
            if(isArray(event)){
                const formatted_data = JSON.stringify(event);
                handleEditResult(field,formatted_data);
            }
            else{
                if(event.target.newItem.value === ''){
                    return;
                }
                let raw_data;
                if(this.props.details === null || this.props.details === undefined || this.props.details.length === 0){
                    raw_data = [];
                }
                else{
                    raw_data = JSON.parse(this.props.details);
                }
                console.log("new added",event.target.newItem.value);
               
                raw_data.push({label:event.target.newItem.value,id:uuidv4()});
                handleEditResult(field,JSON.stringify(raw_data));
            }    
        }
        else {
            handleEditResult(field, event.target.value);
        }
    }

    handleManuallyAddItem(e){
        e.preventDefault();
        this.handleChange(e);
    }


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

    dateConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp*1);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = month + ' ' + date + ' ' + year ;
        return time;
    }

    reformatItemLocation(location) {
        return location ? JSON.parse(location).join(' / ') : '';
    }

    renderDescription(editing, details) {
        return editing ? (
            <input 
                type="text"
                value={details}
                placeholder="Input"
                onChange={this.handleChange.bind(this)}
            />
        ) : <span>{details}</span>;
    }

    renderTime(editing, details) {
        const showTime = this.timeConverter(details);
        const dTime = details ? new Date(details*1-28800000).toISOString().slice(0,16) : null;

        return editing ? (
            <input 
                id="timepicker"
                type="datetime-local"
                min={todayISO}
                max="2030-12-31T00:00"
                defaultValue={dTime}
                onChange={this.handleChange.bind(this)}
            />
        ) : <span>{showTime}</span>;
    }

    renderDate(editing, details) {
        const showTime = details? this.dateConverter(details*1+86400000) : "";
        const dTime = details ? new Date(details*1-28800000+86400000).toISOString().slice(0,10) : null;

        return editing ? (
            <input 
                id="datepicker"
                type="date"
                min={todayDateISO}
                max="2030-12-31"
                defaultValue={dTime}
                onChange={this.handleChange.bind(this)}
            />
        ) : <span>{showTime}</span>;
    }

    renderRemovable(items) {
        let formatted_items;
        let output;
        if(items === undefined || items.length === 0){
            output = (<div/>);
        }
        else {
            formatted_items = JSON.parse(items);
            output = formatted_items.map((item,idx) => {
                return (
                   <li key={idx} >
                        {item.label}
                    </li>
                );
            });
        }
        return output;

    }

    renderLocation(editing, details) {
        const { contentType, items } = this.props;
        if (contentType === 'event') {
            return editing ? (
                <input 
                    type="text"
                    value={details}
                    placeholder="Input"
                    onChange={this.handleChange.bind(this)}
                />
            ) : <span>{details}</span>;
        }
        
        const paths = [];
        const pathsSet = new Set([]);
        
        items.forEach(item => pathsSet.add(item.location));
        pathsSet.forEach(path => paths.push(path));
        paths.forEach((path, index) => paths[index] = {
            label: this.reformatItemLocation(path),
            value: path
        });
        paths.sort((a, b) => a.label - b.label);
        const currentLocation = this.reformatItemLocation(details);
        
        return editing ? (
            // <div className='location-content'>
                <Select
                    className="basic-single"
                    // styles={{ control: (base, _state) => ({...base, minHeight: '20px', height: '20px'})}}
                    classNamePrefix="select"
                    defaultValue={{ label: currentLocation, value: details}}
                    isSearchable={true}
                    name="color"
                    options={paths}
                    maxMenuHeight={100}
                    onChange={data => {
                        const { handleEditResult, field } = this.props;
                        handleEditResult(field, data.value);
                    }}
                />
            // </div>
        ) : <span>{currentLocation}</span>;
    }


    // the itemList is in the format [{lable:xxx,id:xxx}.....] 
    renderItemList(editing, details) {
        let output;
        let formatted_details;
        if(details === undefined || details.length === 0){
            output = (<div/>);
        }
        else{
            formatted_details = JSON.parse(details);
            output = formatted_details.map((item,idx) => {
                return (
                    <div key={idx}>
                        {item.label}
                    </div>
                );
            });
        }

        return editing ? (
            <div style={{marginTop:'10px'}} >
                <form onSubmit={(e) => this.handleManuallyAddItem(e)}>
                    <input 
                        type="text"
                        placeholder="Input"
                        name = "newItem"
                        style={{marginTop:'30px'}}
                    />
                    <button 
                        type="submit" 
                        style={{marginLeft:'10px'}}
                    >
                        add
                    </button>
                </form>
                
                <div style={{marginTop:'10px'}}>
                    <button type="button" onClick={() => this.props.toggleItemSelector({
                                        id:this.props.field._id,
                                        handleSubmit: this.handleChange.bind(this),
                                        formatted_details:formatted_details
                                    })}>Select From Item Board</button>
                </div>
                {this.renderRemovable(details)}
            </div>
        ) : <div style={{marginTop:'10px'}}>{output}</div>;
    }

    renderEventList(editing, details) {
        let output;
        let formatted_details;
        console.log("details: " + details);
        if(details === undefined || details.length === 0){
            output = (<div/>);
        }
        else{
            formatted_details = JSON.parse(details);
            output = formatted_details.map((item,idx) => {
                return (
                    <div key={idx}>
                        {item.label}
                    </div>
                );
            });
        }
        
        return editing ? (
            <span>
                <div style={{marginTop:'5px'}}>
                    <button type="button" onClick={() => this.props.toggleEventSelector({
                                        id:this.props.field._id,
                                        handleSubmit: this.handleChange.bind(this),
                                        formatted_details:formatted_details
                                    })}>Select From Event Board</button>
                </div>
                {this.renderRemovable(details)}
            </span>
        ) : <div>{output}</div>;
    }

    /**
	 * Render the row based on the given input. 
     *
     * @param {String} field The data type of given text value, e.g. location, time.
     * @param {String} iconName The name of FAIcon to be constructed.
     * @param {Boolean} editing Whether the Popup is in editing mode.
     * @param {JsonObject} handleEditResult Pass handleEditResult behavior from Popup to this object.
     * 
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
            <div className='popup_row'>
                <Icon iconName={iconName}/>
                <div className={`row-content row-content-${field}`}>
                    {content}
                </div>
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