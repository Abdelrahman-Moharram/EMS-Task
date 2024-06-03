from .models import *
from .Serializer import *
from rest_framework import response, status
from rest_framework.decorators import api_view, permission_classes
from companies.permissions import *
from accounts.permissions import IsAdmin
from rest_framework.permissions import AllowAny, IsAuthenticated
from .forms import employee_form
import json
from accounts.models import User
from companies.models import Company

@api_view(['GET'])
@permission_classes((IsAdmin,))
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
@permission_classes((IsAuthenticated,))
def GetEmployeeDetails(request, employee_id):
    try:
        if not employee_id:
            return response.Response(
                data={'message':'Employee id is invalid'},
                status=status.HTTP_400_BAD_REQUEST
            )
        employee = Employee.objects.filter(id=employee_id).first()
        if not employee:
            return response.Response(
                data={'message':'this Employee is not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        employee_serial =  EmployeeSerializer(data=[employee], many=True)

        if employee_serial.is_valid():
            pass

        return response.Response(
            data={
                'employee': employee_serial.data[0]
            },
            status=status.HTTP_200_OK
        )
    except:
        return response.Response(
            data={'message':'something went wrong please try again'},
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes((AllowAny,))
def GetStages(request):
    body = json.loads(request.body)
    print(body)
    if not body['stage']:
        stage_serial = BaseStagesSerial(data=Stage.objects.filter(state=1), many=True)
    
    else:
        stage = Stage.objects.filter(id=body['stage']).first()
        if not stage or stage.name == 'Hired':
            stages = Stage.objects.all()
            stage_serial = BaseStagesSerial(data=stages, many=True)
        else:
            stages =[]
            if stage.fulfilled_next:
                stages.append(stage.fulfilled_next)
            if stage.rejected_next:
                stages.append(stage.rejected_next)
            stage_serial = BaseStagesSerial(data=stages, many=True)
        

    if stage_serial.is_valid():
        pass

    return response.Response(
        data={
            'stages': stage_serial.data,
        },
        status=status.HTTP_200_OK
    )



@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def EmployeeForm(request, employee_id):
    try:
        emp = Employee.objects.filter(id=employee_id)
        if not len(emp):
            return response.Response(
                data={'message':'this employee is not found'},
                status=status.HTTP_404_NOT_FOUND 
            )
        emp_serial = EmployeeFormSerial(data=emp, many=True)
        if emp_serial.is_valid():
            pass

        return response.Response(
            data={
                'employee': emp_serial.data[0]
            },
            status=status.HTTP_200_OK
        )
    except:
        return response.Response(
            data={
                'message': 'something went wrong please try again'
            },
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(['POST'])
@permission_classes((IsCompanyManagerOrAdmin,))
def create_employee(request, company_id):
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
        form.company = Company.objects.get(id=company_id)
        form.save()
        return response.Response(
            {'message':f'Employee {body['email']} Added Successfully'},
            status=status.HTTP_201_CREATED
        )
    return response.Response(
            {'errors':form.errors.as_data()},
            status=status.HTTP_400_BAD_REQUEST
        ) 


@api_view(['PUT'])
@permission_classes((IsCompanyManagerOrAdmin,))
def update_employee(request, company_id):
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
    
    
    employee = Employee.objects.filter(id=body['id']).first()
    if not employee:
            return response.Response(
                data={'message':'this employee is not found'},
                status=status.HTTP_404_NOT_FOUND 
            )
    if employee.user.email != body['email']:
        return response.Response(
            data={
                'errors':{
                    'email':["can't change employee email in patch please delete this employee and create new one with the new email"]
                }
            },
            status=status.HTTP_400_BAD_REQUEST
        ) 
    form = employee_form(body, instance=employee)
    if form.is_valid():
        form = form.save()
        return response.Response(
            {'message':f'Employee {body['email']} updated Successfully'},
            status=status.HTTP_200_OK
        )
    return response.Response(
            {'errors':form.errors.as_data()},
            status=status.HTTP_400_BAD_REQUEST
        ) 



@api_view(['DELETE'])
@permission_classes((IsCompanyManagerOrAdmin,))
def delete_employee(request, company_id, employee_id):
    try:
        emp = Employee.objects.filter(id=employee_id).first()

        if not emp:
            return response.Response(
                data={'message': 'this employee is not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        name = emp.user.username
        emp.delete()
        return response.Response({'message':f"Employee {name} deleted succesfully!"}, status=status.HTTP_200_OK)
    
    except:
        return response.Response(
            data={
                'message': 'something went wrong please try again later'
            },
            status=status.HTTP_400_BAD_REQUEST
        )
