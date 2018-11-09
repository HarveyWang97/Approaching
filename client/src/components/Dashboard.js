import React,{Component} from 'react';
import Eventboard from './Eventboard';
import "../css/Dashboard.css";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div class="split-left left">
                    <h2>Jane Flex</h2>
                    <p>Some text.</p>
                </div>
          
                <Eventboard />
            </div>
        );
    }
}