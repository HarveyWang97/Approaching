import React,{Component} from 'react';
import config from '../config';
import {connect} from 'react-redux';
import  * as actions from '../actions';

class Event extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div 
                style={{border:'solid 1px', 
                        width:'400px',height:'265px',
                        paddingTop:'0px',
                        marginLeft:'90px',
                        marginBottom:'20px'}}
                onClick={() => this.props.togglePopup({
                    contentType: 'event',
                    isAdd: false,
                    id: this.props.id
                })}
            >

                <img src={this.props.picture} width="400" height="220" />
                <br />
                <body bgcolor="white">
                <text style={{marginLeft:'10px'}}>{this.props.name}</text>
                <br />
                <text style={{marginLeft:'10px'}}>{this.props.time}</text>
                </body>
            </div>
        );
    }
}

export default connect(state => {}, actions)(Event);
