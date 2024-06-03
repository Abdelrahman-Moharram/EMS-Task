from django.urls import path
from .views import *
app_name = 'employees'

urlpatterns = [
    path("", GetEmployeeList, name="EmployeeList"),
    path("hiring-stages", GetStages, name="HiringStages"),
    path("<str:employee_id>", GetEmployeeDetails, name="EmployeeDetails"),
    path("companies/<str:company_id>/create", create_employee, name="create_employee"),
    path("companies/<str:company_id>/update", update_employee, name="update_employee"),
    path("companies/<str:company_id>/<str:employee_id>/delete", delete_employee, name="delete_employee"),
    path("<str:employee_id>/form", EmployeeForm, name="form_employee"),
]