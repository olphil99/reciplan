import json

from rest_framework import viewsets
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
    searchQuery = '' # request.GET.get('searchQuery').strip().lower() # TODO change the '' to the get request once we have something in the request
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
    # TODO
    #print(request.data)
    if request.method == 'POST':
        username = request.data.get('username').strip().lower()
        password = request.data.get('password').strip() # TODO: hash this password
        #username = 123
        #password = "passcode"
        userAuthenticated = utils.authenticate_user(username, password)
        if userAuthenticated:
            status = 'HTTP_202_ACCEPTED'
        else:
            status = 'HTTP_403_FORBIDDEN'
    context = json.dumps({})
    return Response(context)

@api_view(['GET', 'POST'])
def newUserRegistration(request):
    # Page used to create a new user
    context = json.dumps({})

    if request.method == 'POST':
        #test = request.POST['username']
        #username = request.POST.get("username").strip().lower()
        #password = request.POST.get('password').strip() # TODO: Hash this password
        #name = request.POST.get('name').strip.lower()
        #bio = request.POST.get('bio').strip.lower()
        #location = request.POST.get('location').strip.lower()
        #pictureURL = request.POST.get('pictureURL').strip.lower()

        username = 12333231
        password = "pass"
        name = "nam"
        bio = "by"
        location = "locator"
        pictureURL = "picto"

        isCreated = utils.add_user(username, password, name, bio, location, pictureURL)
        if isCreated:
            status = 'HTTP_201_CREATED'
            status = 201 # status must be int
        else:
            status = 'HTTP_400_BAD_REQUEST'
            status = 400 # status must be int

        return Response(context, status=status)
    return Response(context)

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
            #status = 'HTTP_201_CREATED'
            #status must be integer
            status = 201
        else:
            #status = 'HTTP_400_BAD_REQUEST'
            #status must be integer
            status = 400

        context = json.dumps({})
        return Response(context, status=status)


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def newRecipe(request):
    # Page to add a new recipe for a logged-in user
    context = json.dumps({})
    if request.method == 'POST':
        recipeOwner = '' # TODO: logged in userID
        recipeTitle = request.GET.get('recipeTitle').strip().lower()
        recipeIngredients = request.GET.get('recipeIngredients').strip().lower()
        recipeInstructions = request.GET.get('recipeInstructions').strip().lower()
        recipePictureURL = request.GET.get('recipePictureURL').strip().lower()

        isCreated = utils.add_recipe(recipeOwner, recipeTitle, recipeIngredients, recipeInstructions, recipePictureURL)
        if isCreated:
            status = 'HTTP_201_CREATED'
        else:
            status = 'HTTP_400_BAD_REQUEST'

        return Response(context, status=status)

    return Response(context)

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
