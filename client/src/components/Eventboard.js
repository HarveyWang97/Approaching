import React,{Component} from 'react';
import EventItem from './EventItem';
import "../css/Dashboard.css";
import { INSPECT_MAX_BYTES } from 'buffer';
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
import bg from './bg.jpg';
import tree from './tree.jpeg';
import th from './th.jpg';
import swag from './swag.jpg';
import calendar from './calendar.jpeg';
import {connect} from 'react-redux';
import  * as actions from '../actions';



/**
 * Class representing the Event Dashboard
 * 
 * @class
 */

class Eventboard extends Component{
    constructor(props){
        super(props);
        
    }

    /**
     * @function
     * @param {number} year 
     * @param {Array<Array<EventItem>>} items 
     * @returns {Array<Array<EventItem>>} return all events in one year
     */
    renderYear(year,items){
        const events = Object.keys(items).map(key=> {
            return this.renderMonth(key,items[key],year);
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

    renderMonth(month,items,year){
        const events = Object.keys(items).map(key => {
            return this.renderDay(month,year,key,items[key]);
        });
        return events;
    }

    /**
     * 
     * @function
     * @param {number} month 
     * @param {number} year 
     * @param {Array<EventItem>} items 
     * @returns {Array<EventItem>} Events in one corresponding month 
     */
    renderDay(month,year,day,items){
        console.log('day',items);
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
     * @returns {EventItem} return the specified EventItem
     * 
     * @function
     */
    renderItem(name,time,picture){
        return (
            <EventItem name={name} time={time} picture = {picture} key={name}/>
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
        if (this.props.events == null || this.props.events == false){
            events = null;
        } else {
            events = Object.keys(this.props.events).map(key => {
                return this.renderYear(key,this.props.events[key]);
            });
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
                            payload: {}
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
        events:state.events
    }
}

export default connect(mapStateToProps,actions)(Eventboard);