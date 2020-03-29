from . import models
from rest_framework import serializers

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
      model = models.Users
      fields = ('userID', 'name', 'bio', 'location', 'pictureURL')

class UserFavoritesSerializer(serializers.ModelSerializer):
    class Meta:
      model = models.UserFavorites
      fields = ('userID', 'recipeID')

class OwnsRecipesSerializer(serializers.ModelSerializer):
    class Meta:
      model = models.OwnsRecipes
      fields = ('userID', 'recipeID')

class CartsSerializer(serializers.ModelSerializer):
    class Meta:
      model = models.Carts
      fields = ('userID', 'recipeID', 'dateUpdated')
