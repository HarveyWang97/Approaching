import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import Itemboard from './Itemboard';
import bground from './bg.jpg';
import "../css/Dashboard.css";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
        };
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    render(){
        const dashboardStyle = {backgroundImage:`url(${bground})`};
        return (
            <div style={dashboardStyle}>
                <Itemboard />       
                <Eventboard />
                {this.state.showPopup ? 
                    <Popup
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }
}