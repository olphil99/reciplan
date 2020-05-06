from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('results/', views.results, name='results'),
    path('recipe/', views.recipe, name='recipe'),
    path('login/', views.login, name='login'),
    path('cart/', views.cart, name='cart'),
    path('profile/', views.profile, name='profile'),
    path('newRecipe/', views.newRecipe, name='newRecipe'),
    path('newUserRegistration/', views.newUserRegistration, name='newUserRegistration'),
    path('AF1/', views.AF1, name='AF1'),
    path('myRecipes/', views.myRecipes, name='myRecipes'),
    path('favorites/', views.favorites, name='favorites')
]
