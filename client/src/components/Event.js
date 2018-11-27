import React,{Component} from 'react';
import {connect} from 'react-redux';
import  * as actions from '../actions';

class Event extends Component{
    render() {
        const { id, name, time, togglePopup } = this.props;
        const timeObject = new Date(Number(time));
        const hour = timeObject.getHours();
        const minute = timeObject.getMinutes();
        const processedTime = `${hour > 9 ? hour : `0${hour}`}:${minute > 9 ? minute : `0${minute}`}`;      

        return (
            <div 
                style={{border:'solid 1px', 
                        width:'400px',height:'45px',
                        paddingTop:'10px',
                        marginLeft:'90px',
                        marginBottom:'20px'}}
                onClick={() => togglePopup({
                    contentType: 'event',
                    isAdd: false,
                    id: id
                })}
            >
                <div bgcolor="white">
                    <span style={{marginLeft:'10px'}}>{name}</span>
                    <br />
                    <span style={{marginLeft:'10px'}}>{processedTime}</span>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Event);
