# A place to write helper functions and SQL queries to aid functions such as:
#   finding a recipe, adding a recipe to the database, adding a recipe to cart
import json

def find_recipes(query):
    # returns a list of recipes that match the query
    # runs a SQL query against our DB to find the closest matches
    # input: query is a lower-case string
    return [{'recipeName':'pasta'}, {'recipeName':'rice'}] # Mocked the data for now

def get_recipe_data(recipeID):
    # returns recipeAuthor, recipeTitle, recipeIngredients, recipeInstructions, recipePictureURL
    # input: recipeID
    # Write SQL/MongoDB query here to find the recipe data
    return '', '', '', '', ''

def add_recipe(recipeOwner, recipeTitle, recipeIngredients, recipeInstructions, recipePictureURL):
    # Adds a new recipe to MongoDB
    # return True if successful, false if unsuccessful
    return True

def get_cart_data(userID):
    # Returns cartItems (list of recipeNames), cartDateUpdated for loggen-in user userID
    return [], ''

def delete_from_cart(recipeID):
    # Remove given recipeID from Cart Table
    # return True if successful, false if unsuccessful
    return True

def authenticate_user(username, password):
    # check if username password combination exists
    # return true or false accordingly
    return False

def add_user(username, password, name, bio, location, pictureURL):
    # add a new user to User table
    # return true if successful, false if unsuccessful
    return False

def get_user_metadata(loggedInUser):
    # returns name, bio, location, pictureURL, listOfRecipeNames of the loggedInUser
    return '', '', '', '', ''
