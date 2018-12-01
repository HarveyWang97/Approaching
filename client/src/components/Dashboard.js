import React,{Component} from 'react';
import Eventboard from './Eventboard';
import Popup from './popup/Popup';
import Itemboard from './itemboard/Itemboard';
import PictureEditor from './PictureEditor';
import ItemSelector from './ItemSelector';
import EventSelector from './EventSelector';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ls from 'local-storage';
import "../assets/styles/Dashboard.css";

/**
 * @classdesc This class renders the dashboard page which contains six components: 
 * Itemboard, Eventboard, Popup, PictureEditor, ItemSelector, EventSelector.
 * Only Itemboard and Eventboard will be displayed all the time,
 * other components will have their corresponding switches to set display on and off.
 */
class Dashboard extends Component {
    /**
     * Override the React function to redirect to login page during didMount stage.
     * @return {void}
     */
    componentDidMount(){
        if(ls.get('username') === null || ls.get('username') === undefined){
            this.props.history.push('/');
        }
    }

    /**
     * Render the dashboard page.
     * @return {html} Return html block for dashboard page.
     * */
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
                {this.props.eventSelector.show ? 
                    <EventSelector payload={this.props.eventSelector.payload}/>
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
        itemSelector:state.itemSelector,
        eventSelector:state.eventSelector
    }
}

export default connect(mapStateToProps,actions)(Dashboard);