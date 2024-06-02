# Generated by Django 5.0.6 on 2024-06-02 02:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_alter_employee_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stage',
            old_name='title',
            new_name='name',
        ),
        migrations.AddField(
            model_name='stage',
            name='fulfilled_next',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='fulfilled_next_step', to='employees.stage'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stage',
            name='rejected_next',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='rejected_next_step', to='employees.stage'),
            preserve_default=False,
        ),
    ]