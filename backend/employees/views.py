from .models import *
from .Serializer import *
from rest_framework import response, status
from rest_framework.decorators import api_view, permission_classes
from companies.permissions import *
from rest_framework.permissions import AllowAny
from .forms import employee_form
import json
from accounts.models import User
from companies.models import Company
@api_view(['GET'])
@permission_classes((IsCompanyManagerOrAdmin,))
def GetEmployeeList(request):
    employees = Employee.objects.all()
    emp_serial = EmployeeSerializer(data=employees, many=True)

    if emp_serial.is_valid():
        pass

    return response.Response(
        data={
            'employees': emp_serial.data
        },
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
@permission_classes((AllowAny,))
def GetStages(request):
    stage_serial = BaseStagesSerial(data=Stage.objects.all(), many=True)

    if stage_serial.is_valid():
        pass

    return response.Response(
        data={
            'stages': stage_serial.data,
        },
        status=status.HTTP_200_OK
    )

@api_view(['POST'])
@permission_classes((IsCompanyManagerOrAdmin,))
def create_employee(request):
    body = json.loads(request.body)
    if 'email' not in body:
        return response.Response(
            data={
                'errors':{
                    'email':["email shouldn't be null"]
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    if 'company' not in body:
        return response.Response(
            data={
                'errors':{
                    'company':["company shouldn't be null"]
                }
            },
            status=status.HTTP_400_BAD_REQUEST

        )
    user = User.objects.filter(email=body['email']).first()
    if not user:
        return response.Response(
            data={
                'errors':{
                    'email':["No Active account found with this email"]
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        )
    form = employee_form(body)
    if form.is_valid():
        form = form.save(commit=False)
        form.user = user
        form.company = Company.objects.get(id=body['company'])
        form.save()
        return response.Response(
            {'message':f'Employee {body['email']} Added Successfully'},
            status=status.HTTP_201_CREATED
        )