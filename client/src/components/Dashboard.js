import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import Itemboard from './Itemboard';
import "../css/Dashboard.css";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            showPopup: true
        };
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
    }

    render(){
        return (
            <div>
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