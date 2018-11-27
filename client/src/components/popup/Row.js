import React, { Component } from 'react';
import '../../css/Popup.css';
import Icon from './Icon';

var today = new Date();
var todayISO = today.toISOString().slice(0,16);
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
    // constructor(props) {
    //     super(props);
    // }

    /**
	 * This method set the value of this row's item to the new input value.
	 * 
	 * @param {JsonObject} event a specific event that invokes this method, e.g. editing the iput form
	 * @return {void} 
	 */
    handleChange(event) {
        const { handleEditResult, field } = this.props;
        if(field === 'time' || field === 'expireDate'){
            const time = document.getElementById("datepicker");
            const d = new Date(time.value);
            const mtime = d.getTime();
            console.log("time",mtime);
            handleEditResult(field,mtime);
        }
        else{
            handleEditResult(field, event.target.value);
        }
        
    }

    submitDate(e){
        e.preventDefault();
        const time = document.getElementById("datepicker");
        var d = new Date(time.value);
        var mtime = d.getTime();
        console.log("time",mtime);
    }

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp*1);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours() < 10 ? ('0'+a.getHours()) : a.getHours();
        var min = a.getMinutes() < 10 ? ('0'+a.getMinutes()) : a.getMinutes();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
        return time;
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
        const { iconName, details, editing } = this.props;
        var showTime;
        var dTime;
        if (this.props.field === "time") { 
            showTime = this.timeConverter(details); 
            dTime = details ? new Date(details*1-28800000).toISOString().slice(0,16) : null; 
        }

        return (
            <div className='popup_row'>
                <Icon iconName={iconName}/>
                {editing && this.props.field !== "time" ? (<input type="text" value={details} placeholder="Input"
                        onChange={this.handleChange.bind(this)} />)
                        : (editing && this.props.field === "time" ? null : (this.props.field === "time" ? <span>{showTime}</span> : <span>{details}</span>))
                }
                {
                    this.props.field == "time" && editing ? 
                    (<input id="datepicker" type="datetime-local" min={todayISO} max="2030-12-31T00:00" defaultValue={dTime} onChange={this.handleChange.bind(this)}/>) : null
                }
                {
                    this.props.field === "itemList" & editing ? (<button type="button" style={{marginLeft:'5px'}}>Add</button>) : null
                }
                {
                    this.props.field === "itemList" & editing ? (<div style={{marginTop:'5px', marginLeft:'38px'}}><button type="button">Select From Item Board</button></div>) : null
                }
            </div>
        );
        
    }
}

export default Row;