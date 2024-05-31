from django.contrib import admin
from .models import (
    Address,
    Employee,
    Stage
)
# Register your models here.
admin.site.register(Address)
admin.site.register(Employee)
admin.site.register(Stage)