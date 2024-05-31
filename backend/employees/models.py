from django.db import models
from django.conf import settings
import uuid
from django.core.validators import MinLengthValidator, MaxValueValidator, MinValueValidator
import datetime
from project.models import *
    



class Address(BaseModel):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    street          = models.CharField(max_length=255)
    city            = models.CharField(max_length=255)
    country         = models.CharField(max_length=255)
    is_deleted      = models.BooleanField(default=False)
    def __str__(self):
        return self.street + ", " + self.city + ", " + self.country
    
    objects = BaseModelManager()






class Stage(BaseModel):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    state           = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], default=1)
    title           = models.CharField(max_length=50)
    is_deleted      = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.title
    
    objects = BaseModelManager()
    # the stage value represent the state of the employee of hiring process [Application Received: 1, Interview Scheduled: 2, Hired: 3, Not Accepted: 4]

class Employee(BaseModel):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    company         = models.ForeignKey('companies.Company', on_delete=models.DO_NOTHING)
    department      = models.ForeignKey('companies.Department', on_delete=models.DO_NOTHING)
    user            = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING)
    address         = models.OneToOneField(Address, on_delete=models.DO_NOTHING)
    status          = models.CharField(max_length=150)
    phonenumber     = models.CharField(max_length=11, validators=[MinLengthValidator(4)])
    designation     = models.CharField(max_length=255, verbose_name='Position / Title')
    hired_on        = models.DateTimeField(auto_now=False, auto_now_add=False, null=True, blank=True)
    stage           = models.OneToOneField(Stage, null=True, blank=True, on_delete=models.DO_NOTHING)
    is_deleted      = models.BooleanField(default=False)
    
    @property
    def days_employed(self):
        if not self.hired_on:
            return None
        return (self.hired_on - datetime.datetime.today()).days

    def __str__(self):
        return self.user.username
    
    objects = BaseModelManager()