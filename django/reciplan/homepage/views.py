from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    # Has a log in button, search bar 
    return render(request, 'homepage/homepage.html')

def results(request):
    # Page that shows list of results
    return HttpResponse("results View")

def recipe(request):
    # Page that shows the recipe select from results
    return HttpResponse("recipe View")

def login(request):
    # Page that you use to login
    return HttpResponse("login View")

def cart(request):
    # Cart of the logged in user
    return HttpResponse("cart View")
