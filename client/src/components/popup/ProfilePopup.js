import React, { Component } from 'react';
import '../../css/Profile.css';
import Row from './Row';
import Icon from './Icon';

export default class Profile extends Component {
    constructor(props){
        super(props);

        this.fieldToIcon = {
        	reminder: 'bell',
        	name: 'user',
            email: 'envelope'
            
        };
        this.data = {
            editing: false,
            data: {
                title: 'Settings',
                name: 'Joe Bruin',
                email: 'JoeBruin@ucla.edu',                
                reminder: '24 h'           
            }
        };

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
            <div className='profile'>
                <div className='profile_inner'>
                    <div className='top'>
                        <div>
                            <Icon iconName='times' onClick={this.props.closePopup} />
                            <div className='title'>{this.state.title}</div>
                        </div>
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
                            <Icon iconName='sign-out-alt' />
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}




