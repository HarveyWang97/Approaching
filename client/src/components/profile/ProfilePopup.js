import React, { Component } from 'react';
import '../../assets/styles/Profile.css';
import ProfileRow from './ProfileRow';
import Icon from '../common/Icon';
import {connect} from 'react-redux';
import  * as actions from '../../actions';
import ls from 'local-storage';
import config from '../../config';
import {Link} from 'react-router-dom';


/**
 * @classdesc Construct a Profile component that renders given data object. 
 */
class Profile extends Component {
    /**
     * Initialize the state variables used in constructing the Profile component. 
     * The first four are manually set as flag and constant. The last two are retrieved 
     * from this.prop to get user profile.
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
        this.state = {
            editing: false,
            validEmail: true,
            validReminder: true,
            title: 'Account Settings',
            email: this.props.userProfile.email, 
            reminder: this.convertMstoHours(this.props.userProfile.notifyTime)
        };
    }

    /**
     * If the component receives a new props object that is different from current one,
     * replace the name state with the name in the new props object.
     * @param {Object} nextProps The new props.
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.userProfile.email !== this.props.userProfile.email){
            this.setState({email:nextProps.userProfile.email});
        }

        if(nextProps.userProfile.notifyTime !== this.props.userProfile.notifyTime){
            this.setState({reminder:this.convertMstoHours(nextProps.userProfile.notifyTime)});
        }
    }

    /**
     * Override the React function to fetch user profile from local storage during didMount stage.
     * @return {void}
     */
    componentDidMount(){
        const facebookId = ls.get('facebookId');
        const accessToken = ls.get('accessToken');
        this.props.fetchProfile(facebookId,accessToken);
    }

    /**
	 * Validate the format of email from the user input.
	 *
	 * @param {String} email
	 * @return {Boolean} Returns whether the input email address is valid or not.
	 *
	 * @example
	 *
	 *     validateEmail("test@ucla.edu")
	 */
    validateEmail(email) {
        var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    /**
	 * Validate the format of reminder time from the user input.
	 *
	 * @param {String} time The reminder time
	 * @return {Boolean} Returns whether time is a non-negative floating number.
	 *
	 * @example
	 *
	 *     validateReminder("24.32")
	 */
    validateReminder(time){
        return (!isNaN(time)) && (parseFloat(time) >= 0);
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
     * It also invokes the validation methods for email and reminder time and change the flag correspondingly.
	 *It also connects with the backend to send updated data.
     * 
	 * @param {None}
	 * @return {void} 
	 *
	 * @example
	 *
	 *     handleSubmit()
	 */

    handleSubmit() {
        const facebookId = ls.get('facebookId');
        const accessToken = ls.get('accessToken');

        let ve;
        let vr;
        // check validity of email input
        if (this.validateEmail(this.state.email))
        {
            ve = true;
            this.setState({validEmail: true});
        }
        else{
            ve = false;
            this.setState({validEmail: false});
        }

        if (this.validateReminder(this.state.reminder)){
            vr = true
            this.setState({validReminder: true});        
        }
        else{
            vr = false;
            this.setState({validReminder: false}); 
        }
        
        if (ve  && vr){
            this.props.updateEmail(this.state.email, facebookId, accessToken)
            .then(() => this.props.updateNotifyTime(this.convertHourstoMs(this.state.reminder).toString(), facebookId, accessToken))
            .then(() => this.props.fetchProfile(facebookId,accessToken))
            .then( () => {
                this.changeEditingState();
            });
            
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
        if (key === "email"){
            this.setState({email: value});
        } 
        if (key === "reminder"){
            this.setState({reminder: value});
        }         
        
    }

    /**
	 * Convert reminder time in hours to milliseconds for communication with backend.
	 * @param {String} hour
	 * @return {Float} ms
	 *
	 * @example
	 *
	 *     convertHourstoMs("24");
	 */
    convertHourstoMs(hour){
        return parseFloat(hour) * 3600000
    }

    /**
	 * Convert reminder time in milliseconds to hours for communication with backend.
	 * @param {String} sec
	 * @return {Float} hours
	 *
	 * @example
	 *
	 *     convertMstoHours("3600000");
	 */
    convertMstoHours(sec){
        return parseFloat(sec) / 3600000
    }


    /**
	 * Log out current user, clear local storage of that user, and close the profile popup.
	 * @param {None} 
	 * @return {None} 
	 *
	 */
    logout(){
        ls.clear();
        this.props.closePopup();
    }

    /**
     * Render the profile popup.
     * @param {None}
     * @return {html} Returns a html block of profile component. 
     */
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
                            
                            else {
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
        user:state.auth,
        userProfile:state.userProfile
    }
}

export default connect(mapStateToProps,actions)(Profile);



