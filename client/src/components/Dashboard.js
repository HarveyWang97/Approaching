import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import Itemboard from './Itemboard';
import PictureEditor from './PictureEditor';
import ItemSelector from './ItemSelector';
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
        return (
            <div className='dashboard'>
                <Itemboard />
                <Eventboard />
                {this.props.popup.show ? 
                    <Popup payload={this.props.popup.payload}/>
                    : null
                }
                {this.props.pictureEditor.show ? 
                    <PictureEditor payload={this.props.pictureEditor.payload}/>
                    : null
                }
                {this.props.itemSelector.show ? 
                    <ItemSelector payload={this.props.itemSelector.payload}/>
                    : null
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        popup: state.popup,
        pictureEditor: state.pictureEditor,
        itemSelector:state.itemSelector
    }
}

export default connect(mapStateToProps,actions)(Dashboard);