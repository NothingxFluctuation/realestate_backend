from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Firm(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Company_name =  models.CharField(max_length=100)
    number = models.IntegerField()
    Cr_number = models.FileField(upload_to='Cr/', default=False)
    profile = models.ImageField(upload_to='profile/Firm/', default=False)
 
    def __str__(self):
        return self.Company_name

class Individual(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile = models.ImageField(default='user.svg',upload_to='profile/Individual/',blank=True)
 
    def __str__(self):
        return self.user.first_name 

class TempFile_indi(models.Model):
    username = models.IntegerField()
    profile = models.ImageField(upload_to='profile/Individual/',default=False)
class TempFile_firm(models.Model):
    username = models.IntegerField()
    profile = models.ImageField(default='user.svg', upload_to='profile/Firm/',blank=True)
    Cr_number = models.FileField(upload_to='Cr/', default=False)
    

   