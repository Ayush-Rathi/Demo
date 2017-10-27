import React from 'react'
import ToggleShortcut from './ToggleShortcut'


import {connect} from 'react-redux';
import {login} from '../../../routes/social/GoogleLogin/index'


class LoginInfo extends React.Component {

  componentWillMount() {
	console.log("Params" + window.location.href);
  }

  render() {
    return (

      <div>
			    <span>
			        <ToggleShortcut>
			            <img src={this.props.picture} alt="me"
                       className="online"/><span>{ window.location.href  }</span><i className="fa fa-angle-down"/>
			        </ToggleShortcut>
			     </span>
      </div>
    )
  }
}

//const mapStateToProps = (state)=>(state.user)

export default (LoginInfo)