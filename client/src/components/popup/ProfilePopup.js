import React, { Component } from 'react';
import '../../css/Profile.css';
import ProfileRow from './ProfileRow';
import Icon from './Icon';
import {connect} from 'react-redux';
import  * as actions from '../../actions';
import config from '../../config';

class Profile extends Component {
    constructor(props){
        super(props);

        // this.fieldToIcon = {
        // 	reminder: 'bell',
        //     email: 'envelope'
            
        // };
        /*this.data = {
            editing: false,
            data: {
                title: 'Settings',
                email: 'Please enter email.',                
                reminder: '24 h'           
            }
        };*/

        this.state = {
            editing: false,
            validEmail: true,
            title: 'Settings',
            email: 'Please enter email.', 
            reminder: '24' 
        };
        /*for (let key in this.data.data) {
            this.state[key] = this.data.data[key];
        }*/
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
        this.setState(prevState => ({
            editing: !prevState.editing
        }));
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
        if (this.validateEmail(this.state.email))
        {
            this.changeEditingState();
            this.props.updateEmail(this.state.email, "test", "test");
            this.setState({validEmail: true});
        }
        else{
            this.setState({validEmail: false});
        }
        
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
        if (key == "email"){
            this.setState({email: value});
        } 
        if (key == "reminder"){
            this.setState({reminder: value});
        }         
        
    }


    logout(){
        this.props.history.push("/");
    }

    /*componentWillReceiveProps(nextProps){
        if(nextProps.user !== this.props.user){
            this.state["email"] = nextProps.user.email
        }
    }*/

    render() {
        const data = ["email", "reminder"];

        /*return (
            <div className='profile'>
                <div className='profile_inner'>
                    <div className='top' id='top'>
                        <span>
                            <Icon iconName='times' onClick={() => this.props.togglePopup()} />
                            <div className='profile_title'>{this.state.title}</div>
                            
                        </span>
                    </div>
                    <div className='middle'>
                        { Object.keys(data).map(key => (
                            <Row key={key} 
                                field={key}
                                iconName={config.icons[key]}
                                details={this.state[key]}
                                editing={this.state.editing}
                                handleEditResult={this.handleEditResult.bind(this)} />
                        ))}
                    </div>
                    <div className='bottom'>
                        <div className='left'>
                            { this.state.editing ? 
                                (<Icon iconName='save' onClick={this.handleSubmit.bind(this)} />) : 
                                (<Icon iconName='pen' onClick={this.changeEditingState.bind(this)}/>)
                            }
                        </div>
                        <div className='right'>
                            <Icon iconName='trash-alt' />
                        </div>
                    </div>
                </div>
            </div>
        );*/

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
                        {data.map(key => {
                            if (key !== 'title') {
                                return (
                                    <ProfileRow 
                                         key={key} 
                                         field={key}
                                         iconName={config.icons[key]}
                                         details={this.state[key]}
                                         editing={this.state.editing}
                                         handleEditResult={this.handleEditResult.bind(this)} 
                                    />
                                );
                            }
                        })}
                        { this.state.validEmail ?
                            <span></span> : <span style={{color:'red'}}>Invalid Email Address!</span>
                        }
                    </div>
                    <div className='bottom'>
                        <div className='left'>
                            { this.state.editing ? 
                            (<Icon iconName='save' onClick={this.handleSubmit.bind(this)} />)
                            : (<Icon iconName='pen' onClick={this.changeEditingState.bind(this)}/>)
                            }
                            
                        </div>
                        <div className='right'>
                            <Icon iconName='sign-out-alt'/>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

function mapStateToProps(state){
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps,actions)(Profile);



