# Generated by Django 5.0.6 on 2024-06-02 04:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0007_alter_stage_fulfilled_next_alter_stage_rejected_next'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='stage',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='employees.stage'),
        ),
    ]