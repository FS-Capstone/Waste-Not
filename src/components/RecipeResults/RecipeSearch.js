import React from 'react';

import AdvancedSearch from './AdvancedSearch';
import SearchResults from './SearchResults';
import { Box } from '@mui/system';

const RecipeSearch = () => {

  return(
    <Box sx={{marginBotom:'2rem'}} className='top-level-page'>
      <AdvancedSearch/>
      <SearchResults/>
    </Box>
  )
};

export default RecipeSearch;