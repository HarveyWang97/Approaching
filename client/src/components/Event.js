import React,{Component} from 'react';
import {connect} from 'react-redux';
import  * as actions from '../actions';

class Event extends Component{
    render() {
        return (
            <div 
                style={{border:'solid 1px', 
                        width:'400px',height:'45px',
                        paddingTop:'10px',
                        marginLeft:'90px',
                        marginBottom:'20px'}}
                onClick={() => this.props.togglePopup({
                    contentType: 'event',
                    isAdd: false,
                    id: this.props.id
                })}
            >
                <div bgcolor="white">
                    <span style={{marginLeft:'10px'}}>{this.props.name}</span>
                    <br />
                    <span style={{marginLeft:'10px'}}>{this.props.time}</span>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Event);
