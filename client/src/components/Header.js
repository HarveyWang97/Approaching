import React,{Component} from 'react';
import '../assets/styles/Header.css';
import { Navbar} from 'reactstrap';
import ProfilePopup from './popup/ProfilePopup';
import Icon from './popup/Icon'
import {connect} from 'react-redux';
import ls from 'local-storage';
import  * as actions from '../actions';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: false,
            name: ""
        };
    }

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

    setPopupState(){
        this.setState({
            showPopup: true
        });
    }

    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user !== this.props.user){
            this.setState(
                {
                    name: nextProps.user.name
                }
            );
        }
    }

    userLoggedIn()
    {
        return (ls.get('username') !== undefined && ls.get('username') !== null)
    }


    render(){
        return (
            <div>
                <Navbar color='dark' className='header-container' expand='md'>
                    <div className='header'>
                        <span className='header-logo'>Approaching</span>
                        <div className='header-user' onClick={this.togglePopup.bind(this)}>
                            <Icon iconName='user-circle'/>
                            <span className='header-user-name'>{ls.get('username')}</span>
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




