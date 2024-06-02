from rest_framework import serializers
from .models import Company, Department
from employees.Serializer import (
    EmployeeSerializer,
)
from employees.models import Employee


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


class DepartmentSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
    def to_representation(self, instance):
        employee_set = EmployeeSerializer(data=Employee.objects.filter(department=instance.id), many=True)
        
        if employee_set.is_valid():
            pass
        representation = dict()

        # employee data
        representation['id'] = instance.id
        representation['name'] = instance.name
        representation['created_at'] = instance.created_at
        representation['description'] = instance.description
        representation['employee_set'] = employee_set.data
        representation['employees_len'] = instance.employees_len


        return representation


class IncludedCompanySerial(serializers.ModelSerializer):
    class Meta:
        model= Company
        depth=1
        fields=['id', 'name']


class DepartmentListSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
        depth=1
        fields=['id', 'name', 'description']




class DepartmentFormSerial(serializers.ModelSerializer):
    class Meta:
        model= Department
        depth=1
        fields=['id', 'name', 'description']