from django.core.mail import EmailMessage
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, smart_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from .models import CustomUser as User, ProfilePicture, StudentProfile, TeacherProfile, Lecture
from .utils import Util
from datetime import date
from django.contrib.auth.tokens import PasswordResetTokenGenerator

"""
Customized User Model
"""


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "password", "confirm_password", "is_student", "is_teacher"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        if data["password"] != data.pop("confirm_password"):
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
            username=validated_data["email"],  
            password=validated_data["password"],
            is_student=validated_data.get("is_student", False),
            is_teacher=validated_data.get("is_teacher", False),
        )
        return user


"""
Pending
"""


class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def send_verification_email(self, user):
        current_site = get_current_site(self.context["request"])
        mail_subject = "Activate your account"
        message = render_to_string(
            "registration/verification_email.html",
            {
                "user": user,
                "domain": current_site.domain,
                "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                "token": default_token_generator.make_token(user),
            },
        )
        to_email = self.validated_data["email"]
        email = EmailMessage(mail_subject, message, to=[to_email])
        email.send()

    def validate_email(self, value):
        try:
            user = User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def save(self, **kwargs):
        email = self.validated_data["email"]
        user = User.objects.get(email=email)
        self.send_verification_email(user)


class ProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfilePicture
        fields = ["custom_user", "image"]
        read_only_fields = ["custom_user"]


"""
We can add bio, address and much much more as we need later to get more profile data
"""


class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = ProfilePictureSerializer(required=False)

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email", "profile_picture", "bio", "address", "student_profile", 'teacher_profile']
        read_only_fields = ["email"]

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.bio = validated_data.get("bio", instance.bio)
        instance.address = validated_data.get("address", instance.address)

        profile_picture_data = validated_data.pop("profile_picture", None)
        if profile_picture_data:
            profile_picture = instance.profile_picture
            if profile_picture:
                profile_picture.image = profile_picture_data.get("image", profile_picture.image)
                profile_picture.save()
            else:
                ProfilePicture.objects.create(custom_user=instance, **profile_picture_data)

        instance.save()
        return instance




"""
Password Change Serializer
"""


class CustomPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=128, style={"input_type": "password"}, write_only=True)
    confirm_password = serializers.CharField(max_length=128, style={"input_type": "password"}, write_only=True)

    class Meta:
        fields = ["password", "confirm_password"]

    def create(self, validated_data):
        user = self.context["user"]
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate(self, attrs):
        password = attrs.get("password")
        confirm_password = attrs.get("confirm_password")
        user = self.context.get("user")
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")
        user.set_password(password)
        user.save()
        return attrs


"""
Send Email to Reset Password
"""


class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, required=True)

    class Meta:
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            link = f"http://localhost:3000/reset-password-Email/{uid}/{token}"
            print(f"Password Reset Link: {link}")

            # Formatting the email body
            recipient_name = user.first_name
            recipient_username = user.username
            sender_name = "CropShield Support"
            sender_position = ""
            sender_contact = "cropshields@gmail.com"
            body = self.format_body(
                recipient_name,
                recipient_username,
                link,
                sender_name,
                sender_position,
                sender_contact,
            )

            mail_subject = "Password Reset Request"
            data = {
                "email_subject": mail_subject,
                "email_body": body,
                "to_email": user.email,
            }
            Util.send_email(data)
            return attrs
        else:
            raise serializers.ValidationError("User with this email does not exist.")

    def create(self, validated_data):
        return {}

    def format_body(self, recipient_name, recipient_username, link, sender_name, sender_position, sender_contact):
        body = f"""
🌾 AI and Blockchain-Based Crop Insurance 🌱 

Dear {recipient_name},

We hope this message finds you well. At CropShield we are committed to protecting your personal information.                    

You have recently initiated a password reset request for your account {recipient_username} on our innovative platform, the "AI and Blockchain-Based Crop Insurance System." To proceed, please follow the link provided below:

{link}
If you have any questions or require further assistance, feel free to contact us at cropshields@gmail.com. Your satisfaction is our top priority.

Warm regards,
{sender_name}
{sender_position}
"""
        return body


"""
Through Email Password Reset
"""


class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={"input_type": "password"}, write_only=True)
    confirm_password = serializers.CharField(max_length=255, style={"input_type": "password"}, write_only=True)

    def validate(self, attrs):
        try:
            password = attrs.get("password")
            confirm_password = attrs.get("confirm_password")
            uid = self.context.get("uid")
            token = self.context.get("token")
            if password != confirm_password:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError("Token is not Valid or Expired")
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise serializers.ValidationError("Token is not Valid or Expired")

    def create(self, validated_data):
        return {}


"""
Student and Teacher Profile Serializers
"""

class StudentProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = StudentProfile
        fields = ['id', 'user', 'enrolled_date', 'teacher', 'grade', 'parent_contact']

    def create(self, validated_data):
        user = validated_data.pop('user')
        student_profile, created = StudentProfile.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(student_profile, attr, value)
            student_profile.save()
        return student_profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.set_password(user_data.get('password'))
        user.save()

        instance.enrolled_date = validated_data.get('enrolled_date', instance.enrolled_date)
        instance.teacher = validated_data.get('teacher', instance.teacher)
        instance.grade = validated_data.get('grade', instance.grade)
        instance.parent_contact = validated_data.get('parent_contact', instance.parent_contact)
        instance.save()
        return instance


class TeacherProfileSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())


    class Meta:
        model = TeacherProfile
        fields = ['id', 'user', 'subject', 'experience', 'qualifications']

    def create(self, validated_data):
        user = validated_data.pop('user')
        student_profile, created = TeacherProfile.objects.get_or_create(user=user, defaults=validated_data)
        if not created:
            for attr, value in validated_data.items():
                setattr(student_profile, attr, value)
            student_profile.save()
        return student_profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user
        user.first_name = user_data.get('first_name', user.first_name)
        user.last_name = user_data.get('last_name', user.last_name)
        user.email = user_data.get('email', user.email)
        user.set_password(user_data.get('password'))
        user.save()

        instance.subject = validated_data.get('subject', instance.subject)
        instance.experience = validated_data.get('experience', instance.experience)
        instance.qualifications = validated_data.get('qualifications', instance.qualifications)
        instance.save()
        return instance


class TeacherCardSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name')
    user_last_name = serializers.CharField(source='user.last_name')
    user_email = serializers.EmailField(source='user.email')

    class Meta:
        model = TeacherProfile
        fields = ['id', 'user_first_name', 'user_last_name', 'user_email', 'subject', 'experience', 'qualifications']

class AllUserSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(source='profile_picture.image', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'profile_image']






# Enrolled Status Count
class EnrollmentSerializer(serializers.Serializer):
    teacher_id = serializers.IntegerField()

    def validate_teacher_id(self, value):
        if not TeacherProfile.objects.filter(id=value).exists():
            raise serializers.ValidationError("Teacher not found.")
        return value

    def create(self, validated_data):
        user = self.context['request'].user
        teacher_id = validated_data['teacher_id']
        student_profile = user.student_profile
        teacher_profile = TeacherProfile.objects.get(id=teacher_id)
        student_profile.teacher = teacher_profile
        student_profile.enrollment_status = True  # Mark as enrolled
        student_profile.save()
        return student_profile

class TeacherStudentManagementSerializer(serializers.Serializer):
    student_username = serializers.CharField()

    def validate_student_username(self, value):
        if not User.objects.filter(username=value, is_student=True).exists():
            raise serializers.ValidationError("Student not found.")
        return value

    def add_student(self):
        teacher = self.context['request'].user.teacher_profile
        student_username = self.validated_data['student_username']
        student_profile = StudentProfile.objects.get(user__username=student_username)
        student_profile.teacher = teacher
        student_profile.enrollment_status = True
        student_profile.enrolled_date = date.today() 
        student_profile.save()
        return student_profile

    def remove_student(self):
        teacher = self.context['request'].user.teacher_profile
        student_username = self.validated_data['student_username']
        student_profile = StudentProfile.objects.get(user__username=student_username)
        if student_profile.teacher == teacher:
            student_profile.teacher = None
            student_profile.enrollment_status = False
            student_profile.save()
        else:
            raise serializers.ValidationError("Student not enrolled with this teacher.")
        return student_profile





class StudentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = ['id', 'user', 'enrolled_date', 'grade', 'parent_contact', 'enrollment_status']
        depth = 1  # This will include nested user details


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['id', 'title', 'start_time', 'expiry_time']