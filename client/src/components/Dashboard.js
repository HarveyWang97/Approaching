import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Itemboard from './Itemboard';
import "../css/Dashboard.css";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Itemboard />       
                <Eventboard />
            </div>
        );
    }
}