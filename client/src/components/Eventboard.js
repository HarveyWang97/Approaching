import React,{Component} from 'react';
import Event from './Event';
import "../css/Dashboard.css";
// import { INSPECT_MAX_BYTES } from 'buffer';
// import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
// import bg from './bg.jpg';
// import tree from './tree.jpeg';
// import th from './th.jpg';
// import swag from './swag.jpg';
import calendar from './calendar.jpeg';
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
                <div style={{marginLeft:'50px',marginBottom:'10px'}}>
                    <text ><b>{this.monthName[month]} {year}</b></text>
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
        return (
            <div>
                <text style={{marginLeft:'60px'}} ><b>{day}</b></text>
    renderDay(month,year,day,eventsData){
        // console.log('day', eventsData);
        const events = eventsData.map(event => {
            return this.renderItem(event._id,event.name,event.time,event.picture);
        }); // iterate an array
        return (
            <div>
                <text style={{marginLeft:'60px'}} ><b>{day}</b></text>
                {events}
            </div>
        );
    }

   /* renderYear(year,items){
        const events = Object.keys(items).map(key=> {
            return this.renderMonth(key,year,items[key]);
        }); // iterate an object
        return events;
    }

    renderMonth(month,year,items){
        const events = items.map(item => {
            return this.renderItem(item.name,item.time,item.picture);
        }); // iterate an array
        return (
            <div>
                <div style={{marginLeft:'50px',marginBottom:'10px'}}>
                    <text ><b>{this.monthName[month]} {year}</b></text>
                </div>
                {events}
            </div>
        );
    }*/

    /**
     * 
     * @param {string} name 
     * @param {string} time 
     * @param {img} picture 
     * @returns {Event} return the specified Event
     * 
     * @function
     */
    renderItem(id, name,time,picture){
        return (
            <Event id={id} name={name} time={time} picture={picture} key={name}/>
        );
    }

    componentDidMount(){
        this.props.fetchEvents('test','test');
    }

    render(){
        /*const data = {
            2018: {
                10: [
                    {
                        "name": "CS Contest",
                        "time": "1pm - 3pm",
                        "location": "Los Angeles",
                        "picture": tree,
                        "description": null 
                    },
                    {
                        "name": "Onsite Interview",
                        "time": "3pm - 5pm",
                        "location": "Menlo Park",
                        "picture": bg,
                        "description": null 
                    }
                ],
                12: [
                    {
                        "name": "Swag Dispense",
                        "time": "10am - 12pm",
                        "location": "Westwood",
                        "picture": swag,
                        "description": null
                    },
                    {
                        "name": "Birthday Party",
                        "time": "6pm",
                        "location": "Midvale Avenue",
                        "picture": tree,
                        "description": null
                    }
                ],
            },
            2019: {

            }
        };
        const events = Object.keys(data).map(key => {
            return this.renderYear(key,data[key]);
        });*/
        let events;
        if (this.props.events == null || this.props.events === false){
            events = null;
        } else {
            events = Object.keys(this.props.events).map(key => {
                return this.renderYear(key,this.props.events[key]);
            });
            console.log("events",this.props.events);
        }
        return (
            <div className="split-right right">  
            <div className="events">          
                <h2 style = {{marginTop:'40px', marginLeft:'50px', color:"green"}}>Events Calendar
                <img style = {{marginLeft:'5px'}} src={calendar} width="30" height="26" />
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