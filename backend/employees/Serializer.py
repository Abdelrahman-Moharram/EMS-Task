from rest_framework import serializers
from .models import Employee, Stage
from accounts.models import User

class IncludedUserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        depth=1
        fields= ['id','username', 'email', 'role']


class BaseStagesSerial(serializers.ModelSerializer):
    class Meta:
        model= Stage
        depth=1
        fields= ['id','name']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model= Employee
        # depth=1
        # fields= ['id','user','status','phonenumber','designation','hired_on',]
    
    def to_representation(self, instance):
        
        representation = dict()

        # employee data
        representation['id']                = instance.id
        representation['phonenumber']       = instance.phonenumber
        representation['designation']       = instance.designation
        representation['hired_on']          = instance.hired_on

        # user data 
        representation['user_id']           = instance.user.id
        representation['username']          = instance.user.username
        representation['email']             = instance.user.email
        representation['role']              = str(instance.user.role)
        representation['departmentName']    = str(instance.department)
        representation['companyName']       = str(instance.company)
        representation['days_employed']     = instance.days_employed


        return representation