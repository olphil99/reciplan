# A place to write helper functions and SQL queries to aid functions such as:
#   finding a recipe, adding a recipe to the database, adding a recipe to cart
import json

def find_recipes(query):
    # returns a list of recipes that match the query
    # runs a SQL query against our DB to find the closest matches
    # input: query is a lower-case string
    return [{'recipeName':'pasta'}, {'recipeName':'rice'}] # Mocked the data for now 

def get_recipe_data(recipeID):
    # returns recipeTitle, recipeText, recipeAuthor
    # input: recipeID
    # Write SQL/MongoDB query here to find the recipe data
    return '', '', ''
