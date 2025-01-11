from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import CustomUser, ProfilePicture, StudentProfile, TeacherProfile
from .models import Lecture

class CustomUserAdmin(BaseUserAdmin):
    list_display = ["id", "email", "first_name", "last_name", "is_admin", "is_student", "is_teacher", ]
    list_filter = ["is_admin", "is_student", "is_teacher"]  # Add filter for is_student and is_teacher
    list_editable = ["is_admin"]
    list_per_page = 10
    fieldsets = [
        ("Quran Reasonate User's Credentials", {"fields": ["email", "password"]}),
        ("Personal Info", {"fields": ["first_name", "last_name"]}),
        ("Permissions", {"fields": ["is_admin", "is_student", "is_teacher"]}),  # Add fields to permissions
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": [
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                    "is_student",  # Add is_student field to the add form
                    "is_teacher",  # Add is_teacher field to the add form
                ],
            },
        ),
    ]
    search_fields = ["first_name__startswith", "last_name__startswith", "email"]
    ordering = ["id", "first_name", "last_name"]
    filter_horizontal = []

class ProfilePictureAdmin(admin.ModelAdmin):
    list_display = ["id", "custom_user", "image"]
    list_per_page = 10
    search_fields = ["custom_user__email"]

class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "user_email", "user_first_name", "user_last_name", "enrolled_date", "parent_contact"]
    list_per_page = 10
    search_fields = ["user__email"]

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "Email"

    def user_first_name(self, obj):
        return obj.user.first_name
    user_first_name.short_description = "First Name"

    def user_last_name(self, obj):
        return obj.user.last_name
    user_last_name.short_description = "Last Name"

class TeacherProfileAdmin(admin.ModelAdmin):
    list_display = ["id", "user_email", "user_first_name", "user_last_name", "subject", "experience", "qualifications"]
    list_per_page = 10
    search_fields = ["user__email"]

    def user_email(self, obj):
        return obj.user.email
    user_email.short_description = "Email"

    def user_first_name(self, obj):
        return obj.user.first_name
    user_first_name.short_description = "First Name"

    def user_last_name(self, obj):
        return obj.user.last_name
    user_last_name.short_description = "Last Name"

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ProfilePicture, ProfilePictureAdmin)
admin.site.register(StudentProfile, StudentProfileAdmin)
admin.site.register(TeacherProfile, TeacherProfileAdmin)

admin.site.unregister(Group)



@admin.register(Lecture)
class LectureAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'start_time', 'expiry_time']
    search_fields = ['title']
