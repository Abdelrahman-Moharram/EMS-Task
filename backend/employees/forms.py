from django import forms
from .models import Employee
import re
class employee_form(forms.ModelForm):
    
    class Meta:
        model = Employee
        fields = [
            'company',
            'department',
            'address',
            'phonenumber',
            'designation',
            'stage',
        ]
    def clean_phonenumber(self, *args, **kwargs):
        phonenumber = self.cleaned_data.get('phonenumber')
        reg = re.findall('^01[0125][0-9]{8}$', phonenumber)
        if len(reg) > 0:
            return phonenumber
        raise forms.ValidationError(f"phone {phonenumber} is invalid please enter the right one")
 
    def clean_address(self, *args, **kwargs):
        address = self.cleaned_data.get('address')
        if not len(address.strip()):
            raise forms.ValidationError("Employee address shouldn't be null or empty")
        return address.strip()

    def clean_designation(self, *args, **kwargs):
        designation = self.cleaned_data.get('designation')
        return designation.strip()
    