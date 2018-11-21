import React, { Component } from 'react';
import '../../css/Profile.css';
import Row from './Row';
import Icon from './Icon';

class Profile extends Component {
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

    /**
	 * The changeEditingState() changes the current editing state to another.
	 * either from editing to not-editing, or vice versa.
	 *
	 * @param {None} 
	 * @return {void} 
	 *
	 * @example
	 *
	 *     changeEditingState()
	 */

    changeEditingState(){
        this.setState({
            editing: !this.state.editing
        });
    }

    /**
	 * The handleSubmit() invokes the changeEditingState() on user clicks and logs the change.
	 *
	 * @param {None}
	 * @return {void} 
	 *
	 * @example
	 *
	 *     handleSubmit()
	 */

    handleSubmit() {
        this.changeEditingState();
    }

    /**
	 * The handleEditResult(key, value) sets the data field of the state with the key = "key" to have value = "value"
	 * @param {String| String} key value
	 * @return {None} 
	 *
	 * @example
	 *
	 *     handleEditResult(key, value)
	 */
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
                            <div className='profile_title'>{this.state.title}</div>
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

export default Profile;



