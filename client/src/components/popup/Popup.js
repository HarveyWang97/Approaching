import React, { Component } from 'react';
import '../../css/Popup.css';
import Row from './Row';
import Icon from './Icon';

export default class Popup extends Component {
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

    changeEditingState(){
        this.setState({
            editing: !this.state.editing
        });
    }

    handleChange(event){
        this.setState({
            title: event.target.value
        });
    }

    handleSubmit(event) {
        this.changeEditingState();
        console.log(this.state);
    }

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


