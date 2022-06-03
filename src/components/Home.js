import React from 'react';
import { useSelector } from 'react-redux';

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


export default Home
