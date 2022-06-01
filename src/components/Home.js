import React from 'react'
import {connect} from 'react-redux'
import { useSelector } from 'react-redux'
import Navbar from './Navbar/Navbar';
/**
 * COMPONENT
 */
export const Home = props => {

  const username = useSelector((state) => state.auth.username);
  return (
    <div>
      <h1>Create React Full Stack App</h1>
      {username ? <h3>{`Welcome, ${username}`}</h3> : null}
      
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
