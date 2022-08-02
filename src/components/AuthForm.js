import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import { useNavigate } from 'react-router-dom'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { Box, useTheme } from '@mui/system'
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props;
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <div 
      className='top-level-page' 
      style={{
        display:'flex', 
        justifyContent:'center',
        backgroundImage:'url("/images/Background15.jpg")',
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
        minHeight:'100vh',
        boxSizing:'border-box'
        }}>
      <Paper
        sx={{
          // height:'fit-content',
          display:'flex',
          width:'50vw',
          justifyContent:'space-between',
          minHeight: '50vh',
          height: 'fit-content',
          opacity: .95,
          overflow: 'hidden',

        }}
      >
        <Box backgroundColor={theme.palette.primary.light} style={{width:'50%', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <Typography variant='h4' color='white' sx={{textAlign:'center' }}>{name === 'login' ? 'LOG IN.' : 'SIGN UP.'}</Typography>
        </Box>
        
        
        <form 
          onSubmit={(event) => handleSubmit(event, navigate)} 
          name={name}
          style={{
            display:'flex', 
            flexDirection:'column', 
            alignItems:'center', 
            width:'50%', 
            justifyContent:'center', 
            margin:'2em',
            boxShadow:'border-box'}}
        >
          
          <div style={{width: '100%'}} >
            <Typography variant='h6'>Username</Typography>
            <TextField name="username" type="text" sx={{width: '100%'}}/>
          </div>
          <div style={{width: '100%'}} >
            <Typography variant='h6'>Password</Typography>
            <TextField name="password" type="password" sx={{width: '100%'}} />
          </div>
          {name === 'signup' ? 
            <div style={{width: '100%'}} >
              <Typography variant='h6'>Email</Typography>
              <TextField name="email" type="email" sx={{width: '100%'}}/>
            </div>
            :
            null
          }
          
          {/* <div> */}
            <a href='/googleOauth' style={{width: '100%'}}><Button sx={{margin:'2em 0 2em 0', width:'100%'}} type="button"  variant='outlined'>Sign in through Google</Button></a>
            <Button sx={{margin:'0 0 2em 0 ', width:'100%'}} type="submit" variant='contained' >{displayName}</Button>
            
          {/* </div> */}
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </Paper>
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
