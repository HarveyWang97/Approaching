import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
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
        return (
            <div>
                <div className="split-left left">
                    <h2>Jane Flex</h2>
                    <p>Some text.</p>
                </div>
          
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