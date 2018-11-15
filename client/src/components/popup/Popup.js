import React, { Component } from 'react';
import '../../css/Popup.css';
import Row from './Row';
import Icon from './Icon';

export default class Popup extends Component {
    /**
	 * Currently we manually construct datas for popup to display since we do not have communication with others.
     * Initialize the state variables with corresponding input data.
     * (TO BE DONE) Communication with other front-end components and server.
	 * @constructor 
	 * @param {None}
	 * @return {void} 
	 */
    constructor(props){
        super(props);

        this.fieldToIcon = {
            description: 'file-alt',
            time: 'clock',
            location: 'map-marker-alt',
            itemList: 'list-ul',
            eventList: 'calendar-alt'
        };
        this.data = {
            type: 'event',
            editing: false,
            data: {
                title: 'Christmas Party',
                description: 'xxxxx',
                time: '18-12-09',
                location: 'paris',
                itemList: 'TBD'
            }
        };
        // this.data = {
        //     type: 'item',
        //     editing: true,
        //     data: {
        //         title: 'Chocolate',
        //         description: 'xxxxx',
        //         location: 'Kitchen>Cupboard',
        //         time: '18-12-09',
        //         eventList: 'TBD'
        //     }
        // };

        this.state = {
            editing: this.data.editing,
        };
        for (let key in this.data.data) {
            this.state[key] = this.data.data[key];
        }
    }

    /**
	 * This method flips the current editing state.
	 * either from editing to not-editing, or vice versa.
	 * @param {None} 
	 * @return {void} 
	 *
	 */
    changeEditingState(){
        this.setState({
            editing: !this.state.editing
        });
    }

     /**
	 * This method set the value of title to the new input value.
	 *
	 * @param {object} event a specific event that invokes this method, e.g. editing the iput form
	 * @return {void} 
	 */
    handleChange(event){
        this.setState({
            title: event.target.value
        });
    }

    /**
	 * This method invokes the changeEditingState() on clicking of submit button.
     * In the future it will send the changed data to server and reducer.
	 *
	 * @param {None}
	 * @return {void}
	 */
    handleSubmit() {
        this.changeEditingState();
    }

    /**
	 * This method set the value of each key to the new given value.
	 *
	 * @param {object} event a specific event that invokes this method, e.g. editing the iput form
	 * @return {void} 
	 */
    handleEditResult(key, value) {
        this.state[key] = value;
    }

    render() {
        const data = this.data.data;
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className='top'>
                        <span>
                            <Icon iconName='times' onClick={this.props.closePopup} />
                            {this.state.editing? 
                            (<input className='title' type="text" value={this.state.title} placeholder="Input item name here"
                            onChange={this.handleChange.bind(this)} />)
                            : (<div className='title'>{this.state.title}</div>)
                            }
                        </span>
                    </div>
                    <div className='middle'>
                        {Object.keys(data).map(key => {
                            if (key !== 'title') {
                                return (
                                    <Row key={key} 
                                         field={key}
                                         iconName={this.fieldToIcon[key]}
                                         details={this.state[key]}
                                         editing={this.state.editing}
                                         handleEditResult={this.handleEditResult.bind(this)} />
                                );
                            }
                        })}
                    </div>
                    <div className='bottom'>
                        <div className='left'>
                            { this.state.editing ? 
                            (<Icon iconName='save' onClick={this.handleSubmit.bind(this)} />)
                            : (<Icon iconName='pen' onClick={this.changeEditingState.bind(this)}/>)
                            }
                        </div>
                        <div className='right'>
                            <Icon iconName='trash-alt' />
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}


