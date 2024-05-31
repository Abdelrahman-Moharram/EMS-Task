from rest_framework import response, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from accounts.permissions import IsEmployee, IsAdmin
from django.contrib.auth import authenticate
from .Serializer import *
from .models import *
from .permissions import *
import json

from .forms import *
# Create your views here.
def to_int(val, default):
    if val:
        try:
            return int(val)
        except:
            pass
    return default

@api_view(['GET'])
@permission_classes((IsEmployee,))
def ListCompanies(request):
    
    try:
        page = to_int(request.GET.get('page'), 0)
        size = to_int(request.GET.get('size'), 10)
        companies = Company.objects.all().order_by('created_at')[page*size : (page+1) * size]
        company_serializer = CompanySerial(data=companies, many=True)

        if company_serializer.is_valid():
            pass


        return response.Response(data={
            "page" : page,
            "size": size,
            "total":int(Company.objects.count()/size) or 1,
            'companies': company_serializer.data,
        },
        status=status.HTTP_200_OK
        )
    except:
        return response.Response(data={
                'message': 'something went wrong please try again later'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
@permission_classes((IsEmployee,))
def CompanyDetails(request, company_id):
    
    company = Company.objects.filter(id=company_id)

    if not company:
        return response.Response(data={
                'message': 'this company is not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
    
    departments = Department.objects.filter(company=company.first())
    
    company_serializer = BaseCompanySerial(data=company, many=True)
    departments_serializer = DepartmentSerial(data=departments, many=True)

    if departments_serializer.is_valid():
            pass

    if company_serializer.is_valid():
        pass
    emp = Employee.objects.filter(user=request.user).first() or False
    if emp:
        emp.company == company
    return response.Response(data={
            'company': company_serializer.data[0],
            'departments': departments_serializer.data,
            'is_employee': emp
        },
        status=status.HTTP_200_OK
        )


@api_view(['GET'])
@permission_classes((IsEmployee,))
def CompanyForm(request, company_id):
    
    company = Company.objects.filter(id=company_id)

    if not company:
        return response.Response(data={
                'message': 'this company is not found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
    
    
    company_serializer = CompanyFormSerial(data=company, many=True)



    if company_serializer.is_valid():
        pass

    return response.Response(data={
            'company': company_serializer.data[0],
        },
            status=status.HTTP_200_OK
        )
 

@api_view(['POST',])
@permission_classes((IsAdmin,))
def CreateCompany(request):
    body = json.loads(request.body)
    form = company_form(body)
    if form.is_valid():
        form = form.save()
        return response.Response(
            {
                'message':f'company {form.name} is created successfully',
                'id': form.id
            }, 
            status=status.HTTP_200_OK
        )
    return response.Response({
        'errors': form.errors.as_data()
    }, status=status.HTTP_400_BAD_REQUEST) 



@api_view(['PUT'])
@permission_classes((IsCompanyManagerOrAdmin,))
def EditCompany(request, company_id):
    company = Company.objects.filter(id=company_id).first()
    if not company:
        return response.Response(
            {
                'message': 'this company not found or may be deleted'
            }, 
            status=status.HTTP_404_NOT_FOUND
        ) 
    body = json.loads(request.body)
    form = company_form(body, instance=company)
    if form.is_valid():
        form = form.save()
        return response.Response(
            {
                'message':f"company {company.name} updated succesfully successfully",
                'id': form.id
            }, 
            status=status.HTTP_200_OK
        )
        
    return response.Response({
        'errors': form.errors.as_data()
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes((IsCompanyManagerOrAdmin,))
def DeleteCompany(request, company_id):
    company = Company.objects.filter(id=company_id).first()
    if not company:
        return response.Response(
            {
                'message': 'this company not found or may be deleted'
            }, 
            status=status.HTTP_404_NOT_FOUND
        ) 

    body = json.loads(request.body)
    if 'password' in body:
        user = authenticate(request, username=request.user.email, password=body['password'])
        if not user:
            return response.Response(
                {
                    'message':"password is incorrect make sure you enter the right one"
                }, 
                status=status.HTTP_400_BAD_REQUEST
            )
        name = company.name
        company.soft_delete()
        return response.Response({'message':f"company {name} deleted succesfully successfully"}, status=status.HTTP_200_OK)
        
    return response.Response({
        'errors':{
            'password':["password shouldn't be null"]
        }
    }, status=status.HTTP_400_BAD_REQUEST)
