import React,{Component} from 'react';
import '../css/Header.css';
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
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    setPopupState(){
        this.setState({
            showPopup: true
        });
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


    render(){
        return (
            <div>
                <Navbar color='dark' className='header-container' expand='md'>
                    <div className='header'>
                        <span className='header-logo'>Approaching</span>
                        <div className='header-user'>
                            <Icon iconName='user-circle' onClick={this.togglePopup.bind(this)}/>
                            <span className='header-user-name'>{ls.get('username')}</span>
                        </div>
                    </div>
                </Navbar>
                {this.state.showPopup ? 
                    <ProfilePopup
                        closePopup={this.togglePopup.bind(this)}
                    />
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




