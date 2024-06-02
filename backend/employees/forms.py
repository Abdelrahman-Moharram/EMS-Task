from django import forms
from .models import Employee

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
    
    def clean_address(self, *args, **kwargs):
        address = self.cleaned_data.get('address')
        if not len(address.strip()):
            raise forms.ValidationError("Employee address shouldn't be null or empty")
        return address.strip()

    def clean_designation(self, *args, **kwargs):
        designation = self.cleaned_data.get('designation')
        return designation.strip()
    