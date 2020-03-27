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
    searchQuery = request.GET.get('searchQuery').strip().lower()
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

def recipe(request):
    # Page that shows the recipe selected from results
    recipeID = request.GET.get('recipeID').strip().lower()
    recipeTitle, recipeText, recipeAuthor = utils.get_recipe_data(recipeID)
    context = {
        'recipeTitle':recipeTitle,
        'recipeText':recipeText,
        'recipeAuthor':recipeAuthor
    }

    return render(request, 'homepage/recipe.html', context)

def login(request):
    # Page used to login
    return HttpResponse("login View")

def cart(request):
    # Cart of the logged in user
    return HttpResponse("cart View")

def newRecipe(request):
    # Page to add a new recipe for a logged-in user
    return HttpResponse("newRecipe View")

def profile(request):
    # User's profile
    return
