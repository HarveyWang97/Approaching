import React,{Component} from 'react';
import EventItem from './Eventitem';
import "../css/Dashboard.css";

export default class Eventboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="split-right right">            
                <h2 style = {{marginTop:'40px',marginLeft:'90px'}}>Events</h2>
                <EventItem />
                <div className="footer">
                    <i className="fa fa-plus add" ></i>
                </div>
            </div>
        );
    }
}