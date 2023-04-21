from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    plateNumber = models.CharField(max_length=255)
    registrationStatus = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    make = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    agencyLocation = models.CharField(max_length=255)
