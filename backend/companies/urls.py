from django.urls import path
from .views import (
    ListCompanies,
    CompanyDetails,
    CreateCompany,
    CompanyForm,
    EditCompany,
    DeleteCompany,

    AllDepartmentsList,

    CompanyDepartmentsList,
    CreateDepartment,
    EditDepartment,
    DeleteDepartment,
    DepartmentDetails,
    DepartmentBase

)


urlpatterns = [
    path("api/companies/", ListCompanies, name="companies"),
    path("api/companies/create", CreateCompany, name="create_company"),
    path("api/companies/<str:company_id>/", CompanyDetails, name="company"),
    path("api/companies/<str:company_id>/base", CompanyForm, name="company_base"),
    path("api/companies/<str:company_id>/edit", EditCompany, name="company_update"),
    path("api/companies/<str:company_id>/delete", DeleteCompany, name="company_delete"),
    path("api/companies/<str:company_id>/departments", CompanyDepartmentsList, name="companydepartments"),

    path("api/departments/", AllDepartmentsList, name="departments"),
    path("api/companies/<str:company_id>/departments", CompanyDepartmentsList, name="companydepartments"),
    path("api/companies/<str:company_id>/departments/create", CreateDepartment, name="companydepartments"),
    path("api/companies/<str:company_id>/departments/<str:department_id>/", DepartmentDetails, name="companydepartments"),
    path("api/companies/<str:company_id>/departments/<str:department_id>/base", DepartmentBase, name="companydepartments"),
    path("api/companies/<str:company_id>/departments/<str:department_id>/edit", EditDepartment, name="companydepartments"),
    path("api/companies/<str:company_id>/departments/<str:department_id>/delete", DeleteDepartment, name="companydepartments"),
    
    
]
