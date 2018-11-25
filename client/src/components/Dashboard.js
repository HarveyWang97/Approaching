import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import Itemboard from './Itemboard';
import bground from './bg.jpg';
import {connect} from 'react-redux';
import * as actions from '../actions';
import "../css/Dashboard.css";

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: true
        };
    }

    render() {
        const dashboardStyle = {backgroundImage:`url(${bground})`};
        return (
            <div style={dashboardStyle}>
                <Itemboard />
                <Eventboard />
                {this.props.popup.show ? 
                    <Popup payload={this.props.popup.payload}/>
                    : null
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        popup:state.popup
    }
}

export default connect(mapStateToProps,actions)(Dashboard);