from django.contrib import admin
from .models import Firm,Individual,TempFile_indi,TempFile_firm
# Register your models here.
admin.site.register(Firm)
admin.site.register(Individual)
admin.site.register(TempFile_indi)
admin.site.register(TempFile_firm)