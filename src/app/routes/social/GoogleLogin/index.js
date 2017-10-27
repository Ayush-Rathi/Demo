import React, { Component } from 'react';

//Assets
import google from './google.png'

import config from '../config';
import { Redirect } from 'react-router'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, hashHistory} from 'react-router'

  export var login = "default"

class GoogleLogin extends Component{
	
  
    constructor(props) {
        super(props)
    }
    
    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();    
    }
    
    //Triggering login for google
    googleLogin = () => {
        let response = null;
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse )
            }.bind( this ),
            clientid: config.google, //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }
    
    googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    dispatch => {
                        dispatch(push('/dashboard/analytics'))
                    }
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                return
            
            } else if (e.id) {
				
				
                //Profile data
                alert("Successfull login from Sagar-google : "+ e.displayName )
				login = e.displayName;
				 window.location = '/#/dashboard/analytics';
            }
        }.bind(this));
    }
    
    // render(){
        // // return(
            // // <div><img src={google} 
            // // title="google login" alt="google" 
            // // onClick={ () => this.googleLogin() }/>
            // // </div>
        // // )

    // return (

            // <div><img src={google} 
            // title="google login" alt="google" 
            // onClick={ () => this.googleLogin()
			// <Router
			   // history={history}
			  // routes={routes}
			// />
			
	
			// }/>
            // </div>
       
      

    // );
    // }
	
	// render() {
  // // if (this.state.redirect) {
    // // return <Redirect push to="/sample" />;
  // // }

  // return <button onClick={this.googleLogin()} type="button">Button</button>;
// }

 render(){
        return(
            <div><img src={google} 
            title="google login" alt="google" 
            onClick={ () => this.googleLogin() }
			
			/>
            </div>
        )
 }
}

export default GoogleLogin;