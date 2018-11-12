import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/Header.css';
import {insertUser} from '../Request.js';
import {connect} from 'react-redux';
import * as actions from '../actions';

class LoginButton extends Component{
    responseFacebook = response => {
        console.log(response);
        this.setState({
            isLoggedIn:true,
            userId:response.userID,
            name:response.name,
            email:response.email,
            accessToken:response.accessToken
        });
        //console.log("here");
        insertUser(response);
        console.log("state ", this.state, "  props ", this.props);
        this.props.fetchUser({userId:response.userID,name:response.name,email:response.email});
        this.props.history.push('/dashboard');
    };

    

    render(){
        let content;
        if(this.props.user != null && this.props.user != null){
            content = this.props.user.email;
        }

        return (
            <div className="login">
                <FacebookLogin
                    appId="300879247180866"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                />
                {content}
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