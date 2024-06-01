from rest_framework import serializers
from .models import Company, Department




class IncludedDepartmentSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
        fields=['id', 'name']



class CompanyFormSerial(serializers.ModelSerializer):
    class Meta:
        model= Company
        depth=1
        fields=['id', 'name', 'description']

class BaseCompanySerial(serializers.ModelSerializer):
    class Meta:
        model= Company
        depth=1
        fields=['id', 'name', 'created_at', 'description', 'departments_len', 'employees_len']
    
class CompanySerial(serializers.ModelSerializer):
    department_set = IncludedDepartmentSerial(many=True)
    class Meta:
        model= Company
        depth=1
        fields=['id', 'name', 'created_at', 'description', 'departments_len', 'employees_len', 'department_set']




class IncludedCompanySerial(serializers.ModelSerializer):
    class Meta:
        model= Company
        depth=1
        fields=['id', 'name']


class DepartmentListSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
        depth=1
        fields=['id', 'name', 'created_at', 'description']


class DepartmentSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
        depth=1
        fields=['id', 'name', 'created_at', 'description', 'employees_len']

class DepartmentFormSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
        depth=1
        fields=['id', 'name', 'description']