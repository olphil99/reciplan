### Description
ReciPlan is a recipe-based social media platform with many amazing features. Users can create a recipe and store it under their profile. They can also favorite other user's recipes and share them with their friends. The profile view includes other features, such as profile picture, name, and bio. Additionally, users can search for recipes and add them to their cart. Upon entering the cart view, the user can generate a custom grocery list that combines all the ingredients and amounts to allow for convenience. The recipe view also includes the option to convert units into smaller or larger quantities, based on how many servings you want to make tonight! Users will login with our password encrypted login, and they alone will have the option to update or delete their own recipes.

### Usefulness
‘MyRecipes’ is somewhat of a similar application. There, you can upload your own recipes and rate other user's on a 5-star scale. However, they do not have a social media aspect, nor the grocery list generation feature. Furthermore, our webapp will be mobile responsive, designed to be able to seamlessly make it into a standalone application.
The conversion of incredient amounts based off of serving size would also be a special function, as we have not seen it on existing recipe websites.
Realness: We will start by populating our application with the Recipe box dataset which is scraped from sources such as Food Network, All Recipes, Epicurious. We will also include options for users to add new recipes and to make the grocery list.

### Basic functions
- Ability for users to create recipes by entering ingredients and amounts
- Methods to edit/delete a recipe, edit/delete a user's profile, and to update a user's starred/favorite recipes
- The recipe search function on the side bar
- SQL Join: User Profiles with Favorites with Recipes to generate the data for the profile view
- Store pictures of recipes and user icons

### Advanced functions
#### SQL Function 1
User Profiles
- UserID, Name, PictureURL, Bio, Favorites, etc.
- Has a column for Cart that contains RecipeIDs (from the MongoDB)
Cart
- RecipeIDs, Date, UserID
- Trigger for every SELECT, if last update Date was > 30 days ago, return empty cart
- Password encryption before storing/retrieving
- SQL Join on the User Profiles and Cart table followed by a query to the MongoDB for recipe information

Cart stores array of RecipeIDs that we use in a MongoDB find to return information to generate grocery lists

User Profiles stores an array of RecipeIDs that we use in a MongoDB find to display the recipe information on the page

#### NoSql (MongoDB) Function 2
- Storing Recipe JSON Objects
- Grocery list functionality that scans the cart and combines the quantities of ingredients from those recipes
- Function to separate amounts from ingredients in scraped data
- Function to convert amounts into different sizes and units in order to show smaller/larger serving sizes
