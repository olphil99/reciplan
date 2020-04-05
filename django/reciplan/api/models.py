from django.db import models

# Each class corresponds to a new table in the sqlite3 database
class Users(models.Model):
    userID = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    bio = models.CharField(max_length=250)
    location = models.CharField(max_length=30)
    pictureURL = models.URLField()
    password = models.CharField(max_length=20, null=False)

class UserFavorites(models.Model):
    userID = models.ForeignKey(Users, on_delete=models.CASCADE, primary_key=True)
    recipeID = models.CharField(max_length=50)

    # workaround because Django doesnt have support for composite keys https://shashankvivek.in/2014/11/11/make-primary-key-with-two-or-more-field-in-django/
    class Meta:
        unique_together = (('userID', 'recipeID'),)

class OwnsRecipes(models.Model):
    userID = models.ForeignKey(Users, on_delete=models.CASCADE, primary_key=True)
    recipeID = models.CharField(max_length=50)

    # workaround because Django doesnt have support for composite keys https://shashankvivek.in/2014/11/11/make-primary-key-with-two-or-more-field-in-django/
    class Meta:
        unique_together = (('userID', 'recipeID'),)

class Carts(models.Model):
    userID = models.OneToOneField(Users, on_delete=models.CASCADE, primary_key=True, db_column='userID')
    recipeIDs = models.CharField(max_length=1000) # Can't find a way to store a list of items so we can just store the list as text and then write a python helper function to parse it when we extract it
    dateUpdated = models.DateTimeField()


# References:
# Difference between Django ForeignKey, ManyToMany, OneToOne:
# https://stackoverflow.com/questions/25386119/whats-the-difference-between-a-onetoone-manytomany-and-a-foreignkey-field-in-d
# https://stackoverflow.com/questions/20909713/django-raw-query-must-include-the-primary-key