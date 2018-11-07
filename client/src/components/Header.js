import React,{Component} from 'react';
import '../css/Header.css';
import { Navbar} from 'reactstrap';
import LoginButton from './LoginButton';

class Header extends Component{
    constructor(props){
        super(props);
    }


    render(){
        return (
            <div>
                <Navbar color="dark" className="header" expand="md">
                    <span style={{fontSize:'22px'}}>Approaching</span>
                    <i className="fa fa-user-circle icon" ></i>
                </Navbar>
            </div>
        );
    }
}

export default Header;




