import React from 'react';
import '../css/Header.css';
import { Navbar} from 'reactstrap';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
//import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn:false,
            userID:'',
            name:'',
            email:'',
        }
    }

    responseFacebook = response => {
        console.log(response);
        this.setState({
            isLoggedIn:true,
            userId:response.userID,
            name:response.name,
            email:response.email
        });
        const url = 
        `http://localhost:3000/users/insert?facebookId=${response.userID}&name=${response.name}&email=${response.email}`;
        axios.get(url)
        .then((response) => {
            console.log(response);
        })
        
    };

    render(){
        return (
            <div>
                <Navbar color="dark" className="header" expand="md">
                    <span style={{fontSize:'22px'}}>Approaching</span>
                    <i className="fa fa-user-circle icon" ></i>
                </Navbar>
                <div className="login">
                    <FacebookLogin
                        appId="300879247180866"
                        autoLoad
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
                </div>
            </div>
        );
    }
}




