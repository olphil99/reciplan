import json

from django.shortcuts import render
from django.http import HttpResponse

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

    if request.method == 'POST':
        selectedRecipeID = request.POST['selectedRecipe']
        # TODO: how to handle post requests with React

    return Response(context)

@api_view(['GET', 'POST'])
def recipe(request):
    # Page that shows the recipe selected from results
    recipeID = request.GET.get('recipeID').strip().lower()
    recipeTitle, recipeText, recipeAuthor = utils.get_recipe_data(recipeID)
    context = {
        'recipeTitle':recipeTitle,
        'recipeText':recipeText,
        'recipeAuthor':recipeAuthor
    }

    return render(request, 'api/recipe.html', context)

@api_view(['GET', 'POST'])
def login(request):
    # Page used to login
    context = json.dumps({})
    return Response(context)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def cart(request):
    # Cart of the logged in user
    context = json.dumps({})
    return Response(context)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def newRecipe(request):
    # Page to add a new recipe for a logged-in user
    context = json.dumps({})
    return Response(context)

@api_view(['GET', 'POST'])
def profile(request):
    # User's profile
    context = json.dumps({})
    return Response(context)
