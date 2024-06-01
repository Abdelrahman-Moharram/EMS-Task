from django import forms
from .models import Company, Department


class company_form(forms.ModelForm):
    
    class Meta:
        model = Company
        fields = [
            'name',
            'description',
        ]
    
    def clean_name(self, *args, **kwargs):
        name = self.cleaned_data.get('name')
        
        if not len(name.strip()):
            raise forms.ValidationError("Company Name shouldn't be null or empty")
               
        return name.strip()
    
    def clean_description(self, *args, **kwargs):
        description = self.cleaned_data.get('description')
        if not len(description.strip()):
            raise forms.ValidationError("Company Description shouldn't be null or empty")
        return description.strip()



class department_form(forms.ModelForm):
    
    class Meta:
        model = Department
        fields = [
            'name',
            # 'company',
            'description',
        ]
    
    def clean_name(self, *args, **kwargs):
        name = self.cleaned_data.get('name')
        if not len(name.strip()):
            raise forms.ValidationError("Department Name shouldn't be null or empty")
        return name.strip()

    def clean_description(self, *args, **kwargs):
        description = self.cleaned_data.get('description')
        if not len(description.strip()):
            raise forms.ValidationError("Department Description shouldn't be null or empty")
        return description.strip()
    