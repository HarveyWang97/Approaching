import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import AddEventPopup from './popup/AddEventPopup';
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

   /* togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }*/

    render(){
        const dashboardStyle = {backgroundImage:`url(${bground})`};
        return (
            <div style={dashboardStyle}>
                <Itemboard />       
                <Eventboard />
                {this.props.showAddEventPopup ? 
                    <AddEventPopup/>
                    : null
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        showAddEventPopup:state.addEventPopup
    }
}

export default connect(mapStateToProps,actions)(Dashboard);