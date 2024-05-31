from rest_framework.permissions import BasePermission
from employees.models import Employee


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
                if request.user.role == "Manager" and  emp.company.id == view.kwargs['company_id']:
                    return True
        except:
            pass
        
        return False