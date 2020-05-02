import json
import sqlite3

def main():
    # Put all reciples in the following dict key: recipeID, val: dict{title:, ingredients:, instructions:, picture_link:,}
    recipes = {}
    for filename in ['recipes_raw/recipes_raw_nosource_ar.json', 'recipes_raw/recipes_raw_nosource_epi.json', 'recipes_raw/recipes_raw_nosource_fn.json']:
        # Loading recipe keys
        with open(filename, 'r') as f:
            recipes_raw = json.load(f)
        recipes.update(recipes_raw)

    print("Number of recipes found: ", len(recipes))

    """recipeID = "94V2SSnZJgoSjVtl6U.eIFLpM.8eui6"
    print(type(recipeID))
    print(type(recipes[recipeID]["title"]))
    print(type(recipes[recipeID]["ingredients"]))
    print(type(recipes[recipeID]["instructions"]))
    print(type(recipes[recipeID]["picture_link"]))"""


    # add to db
    conn = sqlite3.connect('../django/reciplan/db.sqlite3')
    c = conn.cursor()
    c.execute("DELETE FROM api_recipes") # NOTE: empties the table

    for recipeID in list(recipes.keys()):
        try:
            print("Adding ", recipeID)
            recipes[recipeID]["instructions"] = cleanup_recipe_instructions(recipes[recipeID]["instructions"]) # removes the word "ADVERTISEMENT"
            recipes[recipeID]["ingredients"] = cleanup_recipe_ingredients(recipes[recipeID]["ingredients"]) # removes the word "ADVERTISEMENT" and makes the list into a string
            recipes[recipeID]["picture_link"] = '' # making it an empty string because we do not have the corresponding pictures
            c.execute("INSERT INTO api_recipes VALUES (?,?,?,?,?)", [recipeID, recipes[recipeID]["title"], recipes[recipeID]["ingredients"], recipes[recipeID]["instructions"], recipes[recipeID]["picture_link"]])
        except:
            if len(recipes[recipeID]) == 0 or :
                print("Empty recipeID")
            else:
                print("Unknown Failure")
                print("recipeID:", recipeID)
                print("recipes[recipeID]: ", recipes[recipeID])
                print("May be an empty or None instructions/ingredients")
                # c.execute("INSERT INTO api_recipes VALUES (?,?,?,?,?)", [recipeID, recipes[recipeID]["title"], recipes[recipeID]["ingredients"], recipes[recipeID]["instructions"], recipes[recipeID]["picture_link"]])
                # exit()

    # Save (commit) the changes
    conn.commit()
    conn.close()

def cleanup_recipe_instructions(instructions):
    # input string
    # output string
    return instructions.replace('ADVERTISEMENT', '')

def cleanup_recipe_ingredients(ingredients):
    # input list
    # output string
    ret = ''
    for item in ingredients:
        ret += ", " + item.replace('ADVERTISEMENT', '')
    return ret[2:] # removes the leading ", "

main()
