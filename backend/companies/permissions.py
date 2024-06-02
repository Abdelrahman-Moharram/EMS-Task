from rest_framework.permissions import BasePermission
from employees.models import Employee
from .models import Department


class IsCompanyManagerOrAdmin(BasePermission):
    message = "accessing this data is only for stuff"
    def has_permission(self, request, view):
        try:
            if not request.user.is_authenticated:
                return False
            if request.user.role.name == "Admin":
                return True
            else:
                emp = Employee.objects.filter(user=request.user).first()
                if not emp:
                    return False
                
                if request.user.role.name == "Manager" :
                    if 'company_id' in view.kwargs:
                        if emp.company.id == view.kwargs['company_id']:
                            return True
                    elif 'department_id' in  view.kwargs:
                        if Department.objects.filter(id=view.kwargs['department_id']).first().company == emp.company:
                            return True
        except:
            pass
        
        return False



class IsCompanyEmployeeOrAdmin(BasePermission):
    message = "accessing this data is only for stuff"
    def has_permission(self, request, view):
        try:
            if not request.user.is_authenticated:
                return False
            if request.user.role.name == "Admin":
                return True
            else:
                emp = Employee.objects.filter(user=request.user).first()
                if not emp:
                    return False
                
                if request.user.role.name in ["Manager", 'Employee'] :
                    if 'company_id' in view.kwargs:
                        if emp.company.id == view.kwargs['company_id']:
                            return True
                    elif 'department_id' in  view.kwargs:
                        if Department.objects.filter(id=view.kwargs['department_id']).first().company == emp.company:
                            return True
        except:
            pass
        
        return False