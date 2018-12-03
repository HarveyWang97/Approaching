import React,{Component} from 'react';
import '../assets/styles/Header.css';
import { Navbar} from 'reactstrap';
import ProfilePopup from './profile/ProfilePopup';
import Icon from './common/Icon'
import {connect} from 'react-redux';
import ls from 'local-storage';
import  * as actions from '../actions';

/**
 * @classdesc This class renders the header component for both login and dashboard page.
 */
class Header extends Component{
    /**
     * Initialize the state of showPopup with false, i.e. popup not shown.
     * Initialize the user name with an empty string since we do not have it yet.
     * @param {Object} props No props needed.
     * @return {void}
     */
    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
            name: ""
        };
    }

    /**
     * If user is not logged in, then the popup should not be shown, 
     * i.e. showPopup always set to false.
     * Otherwise, flip the state of showPopup.
     * @return {void}
     */
    togglePopup() {
        if(!this.userLoggedIn()){
            this.setState({
                showPopup: false
            }); 
            return; 
        }
        this.setState({
            showPopup: !this.state.showPopup
        });  
    }

    /**
     * Set the showPopup state to true, i.e. display the popup.
     */
    setPopupState(){
        this.setState({
            showPopup: true
        });
    }

    /**
     * If the component receives a new props object that is different from current one,
     * replace the name state with the name in the new props object.
     * @param {Object} nextProps The new props.
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.user !== this.props.user){
            this.setState(
                {
                    name: nextProps.user.name
                }
            );
        }
    }

    /**
     * Detect if a user is logged in.
     * @return {Boolean} true if a user is logged in, false otherwise.
     */
    userLoggedIn()
    {
       // return (ls.get('username') !== undefined && ls.get('username') !== null)
    }


    /**
     * Render the header component.
     * @return {html} Return html block for header component.
     */
    render(){
        return (
            <div>
                <Navbar color='dark' className='header-container' expand='md'>
                    <div className='header'>
                        <span className='header-logo'>Approaching</span>
                        <div className='header-user' onClick={this.togglePopup.bind(this)}>
                            <Icon iconName='user-circle'/>
                            {/*<span className='header-user-name'>
                                {(ls.get('username') === undefined || ls.get('username') === null) ? "a" : ls.get('username')}
        </span>*/}
                            
                        </div>
                    </div>
                </Navbar>
                {this.state.showPopup ? (this.userLoggedIn() ? 
                    <ProfilePopup
                        closePopup={this.togglePopup.bind(this)}
                    /> : null)
                    : null
                }
                
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps,actions)(Header);




