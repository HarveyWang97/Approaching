import React,{Component} from 'react';
import Event from './Event';
import "../assets/styles/Dashboard.css";
import calendar from '../assets/images/eventCalendar.png';
import {connect} from 'react-redux';
import  * as actions from '../actions';



/**
 * Class representing the Event Dashboard
 * 
 * @class
 */

class Eventboard extends Component{
    /**
     * @function
     * @param {number} year 
     * @param {Object} eventsData 
     * @returns {Array<Array<Event>>} return all events in one year
     */
    renderYear(year,eventsData){
        const events = Object.keys(eventsData).map(key=> {
            return this.renderMonth(key,eventsData[key],year);
        }); // iterate an object
        return events;
    }

    /**
     * mapping numbered month to English-spelling month
     */

    monthName = {
        1:"January",
        2:"February",
        3:"March",
        4:"April",
        5:"May",
        6:"June",
        7:"July",
        8:"August",
        9:"September",
        10:"October",
        11:"November",
        12:"December"
    }

    renderMonth(month,eventsData,year){
        const events = Object.keys(eventsData).map(key => {
            return this.renderDay(month,year,key,eventsData[key]);
        });
        return (
            <div>
                <div style={{marginLeft:'50px',marginBottom:'10px', color:'#5b5a57'}}>
                    <b>{this.monthName[month]} {year}</b>
                </div>
                {events}
            </div>
        );
    }

    /**
     * 
     * @function
     * @param {number} month 
     * @param {number} year 
     * @param {Object} eventsData 
     * @returns {Array<Event>} Events in one corresponding month 
     */

    renderDay(month,year,day,eventsData){
        // console.log('day', eventsData);
        const events = eventsData.map(event => {
            return this.renderItem(event._id,event.name,event.time);
        }); // iterate an array
        return (
            <div>
                 <b style={{marginLeft:'60px', float:'left', color:'#61605d', paddingTop:'5px'}}>{day}</b>
                {events}
            </div>
        );
    }

   

    /**
     * 
     * @param {string} name 
     * @param {string} time 
     * @param {img} picture 
     * @returns {Event} return the specified Event
     * 
     * @function
     */
    renderItem(id, name,time){
        return (
            <Event key={id} id={id} name={name} time={time}/>
        );
    }

    componentDidMount(){
        this.props.fetchEvents('test','test');
    }

    render(){
        let events;
        if (this.props.events == null || this.props.events === false){
            events = null;
        } else {
            events = Object.keys(this.props.events).map(key => {
                return this.renderYear(key, this.props.events[key]);
            });
            console.log("events",this.props.events);
        }
        return (
            <div className="split-right right">
            <div className="events">
                <h2 style = {{marginTop:'40px', marginLeft:'50px', color:"#61605d"}}>Events Calendar
                <img style = {{marginLeft:'7px'}} src={calendar} width="23" height="23" alt="calendarIcon"/>
                </h2>
                {events}
           </div>
                <div className="footer">
                    <i className="fa fa-plus add"
                        onClick={() => this.props.togglePopup({
                            contentType: 'event',
                            isAdd: true,
                            id: null
                        })}
                    />
                </div>
        
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        user:state.auth,
        events:state.events.structuredEvents
    }
}

export default connect(mapStateToProps,actions)(Eventboard);