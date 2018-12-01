import React,{Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import '../assets/styles/Header.css';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ls from 'local-storage';

 /**
  * @classdesc Create a login button that get user logged in with facebook.
  */
class LoginButton extends Component{
    /**
     * Initialize the state of responseFacebook.
     * @constructor
     * @param {Object} props No props needed.
     */
    constructor(props){
        super(props);
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    /**
     * Override the React function to redirect to dashboard during didMount stage.
     * @return {void}
     */
    componentDidMount(){
        if(ls.get('username') !== undefined && ls.get('username') !== null){
            this.props.history.push('/dashboard');
        }
    }

    /**
     * This function gets the response from the facebook, stores user information in Redux, and redirect to the dashboard page.
     * @param {Object} response response sent back by facebook, contains user information (e.g. userId, email, name).
     * @return {void}
     */
    responseFacebook (response)  {
        this.props.insertUser(response)
        .then(() => {
            // record the user information in the local storage
        ls.set('username',response.name);

         //default reminder time manually set to 24 hours
         ls.set('reminder', "24");
 
         ls.set('accessToken',response.accessToken);
         ls.set('facebookId',response.userID);
          
        this.props.fetchUser({facebookId:response.userID,accessToken:response.accessToken, name:response.name, email:response.email});
       this.props.fetchItems(response.userID,response.accessToken)
        .then(() => this.props.fetchEvents(response.userID,response.accessToken))
        .then(() => this.props.history.push('/dashboard'));
    });
    }

    /**
     * Render the login page with facebook login button.
     * @return {html} Returns a html block of login component. 
     */
    render(){
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

