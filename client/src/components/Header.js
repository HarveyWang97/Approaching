import React,{Component} from 'react';
import '../css/Header.css';
import { Navbar} from 'reactstrap';
import ProfilePopup from './popup/ProfilePopup';
import Icon from './popup/Icon'


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            showPopup: false
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


    render(){
        return (
            <div>
                <Navbar color="dark" className="header" expand="md">
                    <span style={{fontSize:'22px'}}>Approaching</span>
                    <div className="icon">
                        <Icon iconName='user-circle' onClick={this.setPopupState.bind(this)}/>
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

export default Header;




