import React, { Component } from 'react';
import '../../css/Profile.css';
import ProfileRow from './ProfileRow';
import Icon from './Icon';
import {connect} from 'react-redux';
import  * as actions from '../../actions';
import ls from 'local-storage';
import config from '../../config';
import {Link} from 'react-router-dom';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state = {
            editing: false,
            validEmail: true,
            validReminder: true,
            title: 'Account Settings',
            email: ls.get('email'), 
            reminder: ls.get("reminder") 
        };
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validateReminder(time){
        return !isNaN(time)
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
        // check validity of email input
        if (this.validateEmail(this.state.email))
        {
            this.props.updateEmail(this.state.email, "test", "test");
            this.setState({validEmail: true});
        }
        else{
            this.setState({validEmail: false});
        }

        if (this.validateReminder(this.state.reminder)){
            this.props.updateNotifyTime(this.convertHourstoMs(this.state.reminder).toString(), "test", "test");
            this.setState({validReminder: true});        
        }
        else{
            this.setState({validReminder: false}); 
        }
        
        if (this.state.validEmail  && this.state.validReminder){
            this.changeEditingState();
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
            if (!this.validateEmail(value)){
                this.setState({validEmail: false});
            }
            else{
                this.setState({validEmail: true});
            }
        } 
        if (key == "reminder"){
            this.setState({reminder: value});
            if (!this.validateReminder(value)){
                this.setState({validReminder: false});
            }
            else{
                this.setState({validReminder: true});
            }
        }         
        
    }

    convertHourstoMs(hour){
        return parseFloat(hour) * 3600000
    }


    logout(){
        ls.clear();
        this.props.closePopup();
    }

    /*componentWillReceiveProps(nextProps){
        if(nextProps.user !== this.props.user){
            if (nextProps.user.email !== null){
                this.setState({
                    email: nextProps.user.email
                }); 
            }
        }
    }*/

    render() {
        const data = ["email", "reminder"];

        return (
            <div className='profile' onClick={this.props.closePopup}>
                <div className='profile_inner' onClick={e => e.stopPropagation()}>
                    <div className='top'>
                        <span>
                        <div>
                            <div className='profile_icon'>
                                <Icon iconName='times' onClick={this.props.closePopup} />
                            </div>
        
                            <div className='profile_title'>{this.state.title}</div>
                        </div>
                        </span>
                    </div>
                    <div className='middle'>
                        {data.map(key => {
                            if (key === 'email') {
                                return (
                                    <ProfileRow 
                                         key={key} 
                                         field={key}
                                         iconName={config.icons[key]}
                                         placeholder={"Enter Email Address."}
                                         details={this.state[key]}
                                         editing={this.state.editing}
                                         handleEditResult={this.handleEditResult.bind(this)} 
                                    />
                                );
                            }
                            
                            if (key === 'reminder') {
                                return (
                                    <ProfileRow 
                                         key={key} 
                                         field={key}
                                         iconName={config.icons[key]}
                                         placeholder={"Enter default reminder time."}
                                         details={this.state[key]}
                                         editing={this.state.editing}
                                         handleEditResult={this.handleEditResult.bind(this)} 
                                    />
                                );
                            }
                        })}
                    
                        { this.state.validEmail ?
                            (this.state.validReminder ?
                                <span></span> : <span style={{color:'red'}}>Invalid Reminder Time!</span>
                            ): (this.state.validReminder ?
                                <span style={{color:'red'}}>Invalid Email Address!</span> : <span style={{color:'red'}}>Invalid Email and Reminder Time!</span>)
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
                            <Link to="/" style={{textDecoration: 'none', color:'black'}}>
                                <Icon style={{color:'black'}} iconName='sign-out-alt' onClick={() => this.logout()}/>
                            </Link>
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



