# Generated by Django 5.1.4 on 2025-01-11 03:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_customuser_is_student_and_more'),
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='is_student',
        ),
        migrations.RemoveField(
            model_name='tutorprofile',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='tutorprofile',
            name='introduction',
        ),
        migrations.RemoveField(
            model_name='tutorprofile',
            name='profile_image',
        ),
        migrations.RemoveField(
            model_name='tutorprofile',
            name='subject_teaching',
        ),
        migrations.AddField(
            model_name='customuser',
            name='dob',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='customuser',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='profile_images/'),
        ),
        migrations.AddField(
            model_name='tutorprofile',
            name='intro',
            field=models.TextField(default='notprovided'),
        ),
        migrations.AddField(
            model_name='tutorprofile',
            name='subject',
            field=models.CharField(default='notprovided', max_length=100),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='groups',
            field=models.ManyToManyField(related_name='customuser_groups', to='auth.group'),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='is_tutor',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='user_permissions',
            field=models.ManyToManyField(related_name='customuser_permissions', to='auth.permission'),
        ),
        migrations.AlterField(
            model_name='tutorprofile',
            name='cv',
            field=models.FileField(default='notprovided', upload_to='cv_files/'),
        ),
        migrations.AlterField(
            model_name='tutorprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='tutor_profile', to='accounts.customuser'),
        ),
        migrations.DeleteModel(
            name='StudentProfile',
        ),
    ]
