from django.urls import path
from .views import *
app_name = 'employees'

urlpatterns = [
    path("", GetEmployeeList, name="EmployeeList"),
    path("hiring-stages", GetStages, name="HiringStages"),
    path("create", create_employee, name="create_employee"),
]
