import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/Header.css';
// import autumn from './autumn.jpg';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ls from 'local-storage';

 /**
  * @classdesc Create a login button that get user logged in with facebook.
  */
class LoginButton extends Component{
    constructor(props){
        super(props);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    componentDidMount(){
        if(ls.get('username') !== undefined && ls.get('username') !== null){
            this.props.history.push('/dashboard');
        }
    }



    /**
     * This function gets the response from the facebook, stores user information in Redux, and redirect to the dashboard page
     * @param {JsonObject} response response sent back by facebook, contains information such as userId,email,name....
     * @return {void}
     */
    responseFacebook (response)  {
        this.props.insertUser(response);
        // record the user information in the local storage
        ls.set('username',response.name);
        ls.set('accessToken',response.accessToken);
        ls.set('facebookId',response.userID);
        ls.set('email',response.email);

        //defualt reminder time manually set to 24 hours
        ls.set('reminder', "24");

        this.props.fetchUser({facebookId:response.userID,accessToken:response.accessToken, name:response.name, email:response.email});
        this.props.history.push('/dashboard');
    }

    render(){
        // let content;
        // if(this.props.user != null && this.props.user != null){
        //     content = this.props.user.email;
        // }

        return (                 
                    <div className="login">
                        <div className="login-btn">                                           
                            <FacebookLogin
                                appId="300879247180866"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.responseFacebook}
                            />
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

export default connect(mapStateToProps,actions)(LoginButton);

