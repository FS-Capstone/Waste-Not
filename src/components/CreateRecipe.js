/*
- Probably going to store these recipes on the database (create recipe model?) so need to use redux store
- Need a POST api route on server for input data (refer to JPFP)
- also need to render resulting recipe in some kind of nice format after submitting the recipe.
 - or maybe first option is the create the recipe, second option after the render of results is to save it? idk.

- need to create recipe model (check with scott) (maybe a property createdByUser?)
- need reducer and thunks 
- need api post route for input fields 

on User model:
createdRecipes: [ 
    {title: recipe1, author: janae, cuisine: italian, ingredients: [rice, onions, garlic, etc (or string?!)], instructions: string, createdByUser: true},
    {title: recipe2, etc...}, 
    {title: recipe3, etc....} 
]
*/


/* 

// Create Your Own Recipe 
// make a put instead? 
router.post('/recipes/createRecipe', async (req, res, next) => {
    try {
   
    const newRecipe = {
        title: req.body.title,
        author: req.body.author, // meh...
        cuisine: req.body.cuisine,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        createdByUser: true,
        // pantryId? 
    }
    res.send(await Recipe.create(newRecipe))
    }
    catch(ex){
        next(ex)
    }
});

// actually maybe I need to make a PUT route in user apis to 
// update the specific property (User.createdRecipes)
*/