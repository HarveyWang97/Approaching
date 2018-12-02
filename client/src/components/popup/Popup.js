import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import swal from 'sweetalert2'
import '../../assets/styles/Popup.css';
import Row from './Row';
import Icon from '../common/Icon';
import config from '../../config';
import {connect} from 'react-redux';
import ls from 'local-storage';
import  * as actions from '../../actions';


/**
 * @classdesc Construct a Popup component that renders given data object. 
 */
class Popup extends Component {
    /**
     * Initialize the state variables based on payload object passed through 
     * this.prop. 
	 * @constructor 
	 * @param {Object} props The properties passed in when the component is 
     * constructed. The component which invokes the popup should pass a payload
     * via this.props.payload, which contains contentType, isAdd, id, and
     * currentLocation which is used to decide what content is used for 
     * rendering. id is used as a key to search the item or event list in reducers to
     * get the details of that item or event.
	 * @returns {void} 
	 */
    constructor(props){
        super(props);

        const { contentType, isAdd, id, currentLocation } = this.props.payload;        
        if (isAdd) {
            this.state = {
                editing: true,
                payload: contentType === 'event' ? {} : {
                    location: currentLocation
                }
            }
        } else {
            // set event popup data
            if (contentType === 'event'){
                const payload = this.props.events.filter(event => event._id === id)[0];
                this.state = {
                    editing: false,
                    payload: payload
                };
            }

            // set item popup data
            else if (contentType === 'item'){
                const payload = this.props.rawItems.filter(item => item._id === id)[0];
                console.log("item payload",payload);
                this.state = {
                    editing: false,
                    payload: payload
                };
            }
        }
    }

    /**
	 * This method flips the current editing state (editing v.s. not editing) 
     * and set the middle area of the popup to scroll to its top.
	 * @param {None}
	 * @returns {void}
	 */
    changeEditingState(){
        ReactDOM.findDOMNode(this).getElementsByClassName('middle')[0].scrollTop = 0;
        this.setState({
            editing: !this.state.editing
        });
    }

    /**
	 * This method sets the value of name to the new input value.
	 * @param {JsonObject} event a specific event that invokes this method, 
     * e.g. editing the input form.
	 * @returns {void} 
	 */
    handleChange(event) {
        const payload = this.state.payload;
        payload.name = event.target.value;
        this.setState({
            payload: payload
        })
    }

    /**
	 * This method handles the onClic of the submit button in edit mode.
     * If the current inputs of all fields are valid, this method sends an
     * insert/update item/event request to the server, based on the type of
     * popup and whether or not it's invoked by an item/event board add button.
     * It also toggles the editing state. If any input is invalid, the editing
     * state won't change, and a warning alert appears.
	 * @param {None}
	 * @returns {void}
	 */
    handleSubmit() {
        const facebookId = ls.get('facebookId');
        const accessToken = ls.get('accessToken');
        const { contentType, isAdd } = this.props.payload;
        const { name, location, time } = this.state.payload;
        if (contentType === 'item') {
            if (name && location) {
                this.changeEditingState();
                if (isAdd) {
                    this.props.insertItem(this.state.payload, facebookId, accessToken).then(
                        () => this.props.fetchItems(facebookId, accessToken)
                    );
                    this.props.togglePopup();
                } else {
                    this.props.updateItem(this.state.payload, facebookId, accessToken).then(
                        () => this.props.fetchItems(facebookId, accessToken)
                    );
                }
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    html: 'Please fill in the item <b>name</b> and <b>location</b>!'
                });
            }
        } else {
            if (name && time) {
                this.changeEditingState();
                console.log("payload time", time);
                if (isAdd) {
                    this.props.insertEvent(this.state.payload, facebookId, accessToken).then(
                        () => this.props.fetchEvents(facebookId, accessToken)
                    );
                    this.props.togglePopup();
                } else {
                    this.props.updateEvent(this.state.payload, facebookId, accessToken).then(
                        () => this.props.fetchEvents(facebookId, accessToken)
                    );
                }
            } else {
                swal({
                    type: 'error',
                    title: 'Oops...',
                    html: 'Please fill in the event <b>name</b> and <b>time</b>!'
                });
            }
        }
    }

    /**
	 * This method asks the server to delete the current item/event.
	 * @param {None}
	 * @returns {void}
	 */
    handleDelete() {
        const facebookId = ls.get('facebookId');
        const accessToken = ls.get('accessToken');
        const { contentType } = this.props.payload;
        const { _id } = this.state.payload;
        if (contentType === 'item') {
            this.props.deleteItem(_id, facebookId, accessToken).then(
                () => this.props.fetchItems(facebookId, accessToken)
            );
            this.props.togglePopup();
        } else {
            this.props.deleteEvent(_id, facebookId, accessToken).then(
                () => this.props.fetchEvents(facebookId, accessToken)
            );
            this.props.togglePopup();
        }
    }

    /**
	 * This method is used to be passed to Popup's child components to give
     * them the ability to update the this.state.payload of Popup after being
     * editted.
	 * @param {String} key the target in this.state.payload that shuold be updated
	 * @param {String} value the new value.
     * @returns {void} 
	 */
    handleEditResult(key, value) {
        const payload = this.state.payload;
        payload[key] = value;
        this.setState({
            payload: payload
        });
    }

    /**
	 * Render the popup based on input data type and value. 
	 * @param {none}
     * @returns {html} Returns an html block of Popup component. 
	 */
    render() {
        const { payload } = this.state;
        const displayPicture = (payload && payload.picture && payload.picture.startsWith('data:image')) ? {
            backgroundImage: "url('" + payload.picture.replace(/(\r\n|\n|\r)/gm, "+") + "')"
        } : null;

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className='top' id='top' style={displayPicture}>
                        <Icon iconName='times' onClick={() => this.props.togglePopup()} />
                        <div className='popup-name-bar'>
                            { this.state.editing ? 
                                (<input className='popup-name' 
                                        type="text"
                                        value={payload.name} 
                                        placeholder="Input item name here"
                                        onChange={this.handleChange.bind(this)} />) : 
                                (<div className='popup-name'>{payload.name}</div>)
                            }
                        </div>
                        { this.state.editing ? 
                            <div
                                className='upload-picture-guide'
                                onClick={() => this.props.togglePictureEditor({
                                    handleSubmit: this.handleEditResult.bind(this)
                                })}
                            >
                                Click Here to Upload a Picture ...
                            </div> :
                            null
                        }
                    </div>
                    <div className='middle'>
                        { config.fields[this.props.payload.contentType].map(key => (
                            <Row
                                key={key} 
                                contentType={this.props.payload.contentType}
                                field={key}
                                iconName={config.icons[key]}
                                details={payload[key]}
                                editing={this.state.editing}
                                handleEditResult={this.handleEditResult.bind(this)} />
                        ))}
                    </div>
                    <div className='bottom'>
                        {   this.props.payload.isAdd?
                                (
                                <div className='editModeIcon'>
                                    <Icon iconName='save' onClick={this.handleSubmit.bind(this)} />
                                </div>    
                                ) :
                                ( 
                                <React.Fragment>
                                <div className='left'>
                                    { this.state.editing ? 
                                        (<Icon iconName='save' onClick={this.handleSubmit.bind(this)} />) : 
                                        (<Icon iconName='pen' onClick={this.changeEditingState.bind(this)}/>)
                                    }
                                </div>
                                <div className='right'>
                                    <Icon iconName='trash-alt' onClick={this.handleDelete.bind(this)} />
                                </div>
                                </React.Fragment>
                                )
                        }
                    </div>
                </div>
            </div>
        ); 
    }
}

function mapStateToProps(state){
    return {
        user: state.auth,
        payload: state.popup.payload,
        events: state.events.rawEvents,
        rawItems: state.items.rawItems
    }
}

export default connect(mapStateToProps, actions)(Popup);
