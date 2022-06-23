import React from 'react';
import { Link } from 'react-router-dom';

const Wine = () => {
  return(
    <div>
      <div className='wine'>
      <h1>Wine Pairings & Recommendations </h1>
      <Link to='/wine/recommend-wine'><button> I have a dish, recommend a wine. </button></Link>
      <Link to='/wine/recommend-dish'><button> I have the wine, recommend a dish. </button></Link>
      <Link to='/wine/recommend-brand'><button> Recommend a brand of wine. </button></Link>
      </div>
    </div>
  )
}


export default Wine;

