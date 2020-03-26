from django.shortcuts import render
from django.http import HttpResponse
from . import utils

def index(request):
    # Has a search bar, log-in button
    if request.method == 'POST':
        query = request.POST['query']
        return HttpResponseRedirect('/results/?query={0}'.format(query))
    return render(request, 'homepage/homepage.html', context)

def results(request):
    # Page that shows list of search results
    query = request.GET.get('query').strip().lower()
    searchResults = utils.find_recipes(query)
    context = {
        'query':query,
        'searchResults':searchResults
    }

    if request.method == 'POST':
        selectedRecipeID = request.POST['selectedRecipe']
        return HttpResponseRedirect('/recipe/?recipeID={0}'.format(selectedRecipeID))

    return render(request, 'homepage/results.html', context)

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
