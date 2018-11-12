import React, { Component } from 'react';
import '../../css/Popup.css';
import Icon from './Icon';

export default class Row extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: this.props.details
        };
    }

    handleChange(event){
        this.setState({
            item: event.target.value
        });
    }

    render() {
        const { field, iconName, details, editing, handleEditResult } = this.props;
        handleEditResult(field, this.state.item);
        return (
            <div className='popup_row'>
                <Icon iconName={iconName}/>
                {editing ? (<input type="text" value={this.state.item} placeholder="Input"
                        onChange={this.handleChange.bind(this)} />)
                        : (<span>{details}</span>)
                }
            </div>
        );
        
    }
}
