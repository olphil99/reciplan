from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('results/', views.results, name='results'),
    path('recipe/', views.recipe, name='recipe'),
    path('login/', views.login, name='login'),
    path('cart/', views.cart, name='cart'),
]
