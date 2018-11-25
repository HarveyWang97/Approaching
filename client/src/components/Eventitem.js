import React,{Component} from 'react';
import {connect} from 'react-redux';
import  * as actions from '../actions';

class EventItem extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const { name, time, picture } = this.props;
        const payload = { name: name, time: time, picture: picture };
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
                    payload: payload
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

function mapStateToProps(state){
    return {
    }
}

export default connect(mapStateToProps,actions)(EventItem);