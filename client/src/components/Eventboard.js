import React,{Component} from 'react';
import EventItem from './Eventitem';
import "../css/Dashboard.css";

export default class Eventboard extends Component{
    constructor(props){
        super(props);
        
    }

    renderYear(year,items){
        const events = Object.keys(items).map(key=> {
            return this.renderMonth(key,items[key]);
        }); // iterate an object
        return events;
    }

    renderMonth(month,items){
        const events = items.map(item => {
            return this.renderItem(item.name,item.time);
        }); // iterate an array
        return (
            <div>
                <text style={{marginLeft:'50px'}}>{month}</text>
                {events}
            </div>
        );
    }

    renderItem(name,time){
        return (
            <EventItem name={name} time={time} key={name}/>
        );
    }

    render(){
        const data = {
            2018: {
                10: [
                    {
                        "name": "Contest",
                        "time": "10/26/2018",
                        "location": "Los Angeles",
                        "description": null 
                    },
                    {
                        "name": "Onsite Interview",
                        "time": "10/28/2018",
                        "location": "Menlo Park",
                        "description": null 
                    }
                ],
                12: [
                    {
                        "name": "Swag Dispense",
                        "time": "12/3/2018",
                        "location": "Westwood",
                        "description": null
                    },
                    {
                        "name": "Birthday Party",
                        "time": "12/8/2018",
                        "location": "Midvale Avenue",
                        "description": null
                    }
                ],
            },
            2019: {

            }
        };
        const events = Object.keys(data).map(key => {
            return this.renderYear(key,data[key]);
        });
        return (
            <div className="split-right right">  
            <div className="events">          
                <h2 style = {{marginTop:'40px', marginLeft:'90px'}}>Events</h2>
                {/*arr.map(item => {
                    return <EventItem title={item.title} />
                })*/}
               {/* <text style={{marginLeft:'50px'}} >Nov 2018 </text>
                <EventItem />     
                <EventItem width="100px"/>
                <text style={{marginLeft:'50px'}} >Dec 2018 </text>
            <EventItem /> */}
                {events}
           </div>

                <div className="footer">
                    <i className="fa fa-plus add" ></i>
                </div>
        
            </div>
        );
    }
}