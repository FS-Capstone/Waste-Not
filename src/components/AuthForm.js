import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { useNavigate } from 'react-router-dom'


/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props;
  const navigate = useNavigate();
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event, navigate)} name={name}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        {name === 'signup' ? 
          <div>
            <label htmlFor='email'>
              <small>Email</small>
            </label>
            <input name="email" type="email"/>
          </div>
          :
          null
        }
        
        <div>
          <button type="submit">{displayName}</button>
          <a href='/googleOauth'><button type="button">Sign in through Google</button></a>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = (dispatch) => {
  
  return {
    handleSubmit: async function handleSubmit(evt, navigate) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      const email = evt.target.email?.value;
      try{
        await dispatch(authenticate({username, password, formName, navigate, email}));

      }
      catch(error){
        console.log(error);
      }
      
      
      
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
