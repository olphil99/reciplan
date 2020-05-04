import json

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from . import utils, serializers

@api_view(['GET', 'POST'])
def index(request):
    # Has a search bar, log-in button
    if request.method == 'GET':
        mock_data = {
            'name':'Andromeda',
            'class':'CS411',
            'teamNumber':37
        }

        return Response(json.dumps(mock_data))
    elif request.method == 'POST':
        searchQuery = request.POST['searchQuery']
        # TODO: How do I send POST['searchQuery'] along to the results page with React

@api_view(['GET', 'POST'])
def results(request):
    # Page that shows list of search results
    print(request.method)
    if request.method == 'GET':
        searchQuery = request.query_params.get('searchVal').strip().lower() # request.GET.get('searchQuery').strip().lower() # TODO change the '' to the get request once we have something in the request
        searchResults = utils.find_recipes(searchQuery)
        searchResults = json.dumps(searchResults)
        context = {
            'searchQuery':searchQuery,
            'searchResults':searchResults
        }
        context = json.dumps(context)

    # What happens when you select a recipe
    if request.method == 'POST':
        selectedRecipeID = request.POST['selectedRecipe']
        # TODO: how to handle post requests with React

    return Response(context)

@api_view(['GET', 'POST'])
def recipe(request):
    # Page that shows the recipe selected from results
    recipeID = '' # request.GET.get('recipeID').strip().lower()
    recipeAuthor, recipeTitle, recipeIngredients, recipeInstructions, recipePictureURL = utils.get_recipe_data(recipeID)
    context = {
        'recipeAuthor':recipeAuthor,
        'recipeTitle':recipeTitle,
        'recipeIngredients':recipeIngredients,
        'recipeInstructions':recipeInstructions,
        'recipePictureURL':recipePictureURL
    }

    return Response(context)

@api_view(['GET', 'POST'])
def login(request):
    # Page used to login
    stat = status.HTTP_403_FORBIDDEN
    user = None
    if request.method == 'POST':
        username = request.data.get('username').strip().lower()
        password = request.data.get('password').strip() # TODO: hash this password
        user = utils.authenticate_user(username, password)
        if user != None:
            stat = status.HTTP_202_ACCEPTED
        else:
            stat = status.HTTP_403_FORBIDDEN
    return Response(user, stat)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def newUserRegistration(request):
    stat = status.HTTP_403_FORBIDDEN
    # CREATE USER
    if request.method == 'POST':
        #test = request.POST['username']
        username = request.data.get("username").strip().lower()
        password = request.data.get('password').strip() # TODO: Hash this password
        name = request.data.get('name').strip().lower()
        bio = request.data.get('bio').strip().lower()
        location = request.data.get('location').strip().lower()
        pictureURL = request.data.get('pictureURL').strip().lower()

        isCreated = utils.add_user(username, password, name, bio, location, pictureURL)
        if isCreated:
            stat = status.HTTP_201_CREATED
        else:
            stat = status.HTTP_400_BAD_REQUEST
    # UPDATE USER
    elif request.method == 'PUT':
        username = request.data.get("username").strip().lower()
        password = request.data.get('password').strip() # TODO: Hash this password
        name = request.data.get('name').strip().lower()
        bio = request.data.get('bio').strip().lower()
        location = request.data.get('location').strip().lower()
        pictureURL = request.data.get('pictureURL').strip().lower()

        isUpdated = utils.update_user(username, password, name, bio, location, pictureURL)
        if isUpdated:
            stat = status.HTTP_200_OK
        else:
            stat = status.HTTP_400_BAD_REQUEST
    # DELETE USER
    elif request.method == 'DELETE':
        isDeleted = utils.delete_user(request.data) # this one only sends in username
        if isDeleted:
            stat = status.HTTP_200_OK
        else:
            stat = status.HTTP_400_BAD_REQUEST
    # return status based on previous actions or HTTP_403_FORBIDDEN
    return Response(request.data, stat)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def cart(request):
    # Cart of the logged in user
    if request.method == 'GET': # retreive items of cart
        loggedInUser = '' # TODO: logged in userID
        cartItems, cartDateUpdated = utils.get_cart_data(loggedInUser)
        context = {'cartItems':cartItems, 'cartDateUpdated':cartDateUpdated}
        context = json.dumps(context)
        return Response(context)
    elif request.method == 'POST': # deleting an item from cart
        #recipeID = request.POST.get('recipeToRemove').strip().lower()
        #testing
        recipeID = 'xvhiw'
        isDeleted = utils.delete_from_cart(recipeID)
        if isDeleted:
            status = status.HTTP_201_CREATED
        else:
            status = status.HTTP_400_BAD_REQUEST

        context = json.dumps({})
        return Response(context, status=status)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def newRecipe(request):
    # Page to add a new recipe for a logged-in user
    context = json.dumps({})
    stat = status.HTTP_400_BAD_REQUEST
    if request.method == 'POST':
        recipeOwner = request.data.get('recipeOwner') # TODO: logged in userID
        recipeTitle = request.data.get('recipeTitle').strip().lower()
        recipeIngredients = str(request.data.get('recipeIngredients')).strip().lower()
        recipeInstructions = request.data.get('recipeInstructions').strip().lower()
        recipePictureURL = request.data.get('recipePictureURL').strip().lower()

        isCreated = utils.add_recipe(recipeOwner, recipeTitle, recipeIngredients, recipeInstructions, recipePictureURL)
        if isCreated:
            stat = status.HTTP_201_CREATED
        #return Response(context, status=stat)

    return Response(context, status=stat)

@api_view(['GET', 'POST'])
def profile(request):
    # User's profile
    context = json.dumps({})
    userAuthenticated = True # TODO: add some way to autheticate user
    if userAuthenticated:
        loggedInUser = 1 # TODO: logged in userID
        name, bio, location, pictureURL, listOfRecipeNames = utils.get_user_metadata(loggedInUser)

        context = json.dumps({'name':name, 'bio':bio, 'location':location, 'pictureURL':pictureURL, 'listOfRecipeNames':listOfRecipeNames})

    return Response(context)

@api_view(['GET', 'POST'])
def AF1(request):
    # Advanced Function 1
    # Kind of a leaderboard
    # Count the number of recipes from the same location favorited by all users

    leaderboard = utils.af1() # dict[location]:num recipes favorited from that area
    return Response(json.dumps(leaderboard))

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def myRecipes(request):
    if request.method == 'GET':
        user = request.query_params.get('username')
        answer = utils.get_user_recipes(user)
        answer = json.dumps(answer)
        context = {
            'recipe_list': answer
        }
        context = json.dumps(context)
        return Response(context)
    elif request.method == 'PUT': 
        user = request.query_params.get('username')
    elif request.method == 'DELETE':
        recipeid = request.data.get('recipe')
    # To help pull and modify the recipes that I own
    #leaderboard = utils.af1() # dict[location]:num recipes favorited from that area
    return Response(json.dumps(leaderboard))