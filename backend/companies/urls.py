from django.urls import path
from .views import (
    ListCompanies,
    ListCompaniesSelectList,
    CompanyDetails,
    CreateCompany,
    CompanyForm,
    EditCompany,
    DeleteCompany,
    AllDepartmentsList,

    GetCompanyEmployees,

    CompanyDepartmentsList,
    CreateDepartment,
    EditDepartment,
    DeleteDepartment,
    DepartmentDetails,
    DepartmentBase,


    GetDepartmentEmployees,

    CompanyDepartmentsSelectList

)


urlpatterns = [
    path("api/companies/", ListCompanies, name="companies"),
    path("api/companies/select-list", ListCompaniesSelectList, name="companies-selectlist"),
    path("api/companies/create", CreateCompany, name="create_company"),
    path("api/companies/<str:company_id>/", CompanyDetails, name="company"),
    path("api/companies/<str:company_id>/base", CompanyForm, name="company_base"),
    path("api/companies/<str:company_id>/edit", EditCompany, name="company_update"),
    path("api/companies/<str:company_id>/delete", DeleteCompany, name="company_delete"),
    path("api/companies/<str:company_id>/departments", CompanyDepartmentsList, name="companydepartments"),
    path("api/companies/<str:company_id>/departments_select", CompanyDepartmentsSelectList, name="companydepartments"),
    
    path("api/companies/<str:company_id>/departments/create", CreateDepartment, name="companydepartments"),

    path("api/companies/<str:company_id>/employees", GetCompanyEmployees, name='Department_Employees'),

    path("api/departments/", AllDepartmentsList, name="departments"),
    path("api/departments/<str:department_id>/", DepartmentDetails, name="companydepartments"),
    path("api/departments/<str:department_id>/base", DepartmentBase, name="companydepartments"),
    path("api/departments/<str:department_id>/edit", EditDepartment, name="companydepartments"),
    path("api/departments/<str:department_id>/delete", DeleteDepartment, name="companydepartments"),
    
    path("api/departments/<str:department_id>/employees", GetDepartmentEmployees, name='Department_Employees')
]
