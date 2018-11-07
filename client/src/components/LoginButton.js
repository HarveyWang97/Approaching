import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/Header.css';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from '../actions';

class LoginButton extends Component{
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
        }); // insert into database
        this.props.fetchUser({userId:response.userID,name:response.name,email:response.email});
        
    };



    render(){
        return (
            <div className="login">
                <FacebookLogin
                    appId="300879247180866"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        user:state.auth
    }
}

export default connect(mapStateToProps,actions)(LoginButton);

/*let content;
        if(this.props.user != null && this.props.user!=false){
            content = (
                <div className="login">
                    <FacebookLogin
                        appId="300879247180866"
                        autoLoad
                        fields="name,email,picture"
                        callback={this.responseFacebook}
                    />
                </div>
            );
        }
        else{
            content = (
                <div style={{textAlign:'center'}}>
                    Welcome back
                </div>
            );
        }*/