from django.db import models
from employees.models import Employee
import uuid
from project.models import *

    
class Company(BaseModel):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name            = models.CharField(max_length=150)
    created_at      = models.DateTimeField(auto_now=False, auto_now_add=True)
    description     = models.TextField(null=True, blank=True)

    objects = BaseModelManager()

    def __str__(self):
        return self.name
    
    @property
    def departments_len(self):
        return Department.objects.filter(company_id=self.id).count()
    
    @property
    def employees_len(self):
        return Employee.objects.filter(company_id=self.id).count()
    
    

    
    
class Department(BaseModel):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name            = models.CharField(max_length=150)
    company         = models.ForeignKey('companies.Company', on_delete=models.DO_NOTHING)
    created_at      = models.DateTimeField(auto_now=False, auto_now_add=True)
    description     = models.TextField(null=True, blank=True)
    objects = BaseModelManager()

    @property
    def employees_len(self):
        return Employee.objects.filter(department_id=self.id).count()
    
    def __str__(self):
        return self.name
    
    
