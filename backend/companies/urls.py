from django.urls import path
from .views import (
    ListCompanies,
    CompanyDetails,
    CreateCompany,
    CompanyForm,
    EditCompany,
    DeleteCompany
)


urlpatterns = [
    path("", ListCompanies, name="companies"),
    path("create", CreateCompany, name="create_company"),
    path("<str:company_id>/", CompanyDetails, name="company"),
    path("<str:company_id>/base", CompanyForm, name="company_base"),
    path("<str:company_id>/edit", EditCompany, name="company_update"),
    path("<str:company_id>/delete", DeleteCompany, name="company_delete"),
    
    
]
