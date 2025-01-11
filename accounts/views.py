from django.contrib.auth import authenticate, logout
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import status, viewsets
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, DjangoModelPermissionsOrAnonReadOnly
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser as User, ProfilePicture, StudentProfile, TeacherProfile
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
from .models import Lecture
from .serializers import LectureSerializer, AllUserSerializer

from .serializers import (
    UserSerializer,
    UserProfileSerializer,
    CustomPasswordResetSerializer,
    SendPasswordResetEmailSerializer,
    UserPasswordResetSerializer,
    ProfilePictureSerializer,
    StudentProfileSerializer,
    TeacherProfileSerializer,
    TeacherCardSerializer,
    EnrollmentSerializer,
    TeacherStudentManagementSerializer,
    StudentDetailSerializer

)

"""
Generate Token Manually
"""
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }

class TokenValidationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Token is valid"}, status=status.HTTP_200_OK)

class UserSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(
                {"token": token, "message": "User created successfully"},
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response(
                {"token": token, "message": "Login successful"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):
        if request.user.is_authenticated:
            return Response(
                {"message": "You are authenticated!"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED
            )

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfilePictureView(APIView):
    queryset = ProfilePicture.objects.all()
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        image_data = request.data.get("image")

        if image_data is None:
            return Response(
                {"error": "Image data is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Check if the user already has a profile picture
            existing_profile_picture = ProfilePicture.objects.get(custom_user=user)
            # Delete the existing profile picture
            existing_profile_picture.delete()
        except ProfilePicture.DoesNotExist:
            pass  # If the user doesn't have a profile picture, do nothing
        
        # Save the new profile picture
        profile_picture_data = {"custom_user": user.id, "image": image_data}
        serializer = ProfilePictureSerializer(data=profile_picture_data)

        if serializer.is_valid():
            serializer.validated_data["custom_user_id"] = user.id
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomPasswordResetView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        serializer = CustomPasswordResetSerializer(
            data=request.data, context={"user": request.user}
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Password reset successfully"}, status=status.HTTP_200_OK
            )
        return Response(
            {"error": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
        )

"""
Reset Password Email
"""
class SendPasswordResetEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"message": "Password reset email sent successfully"},
                status=status.HTTP_200_OK,
            )

class UserPasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token, format=None):
        serializer = UserPasswordResetSerializer(
            data=request.data, context={"uid": uidb64, "token": token}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Password reset successfully"}, status=status.HTTP_200_OK
            )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""
Student and Teacher Profile Views
"""
class StudentProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        student_profile = StudentProfile.objects.filter(user=request.user).first()
        if student_profile:
            serializer = StudentProfileSerializer(student_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Student profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = StudentProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        student_profile = StudentProfile.objects.filter(user=request.user).first()
        if not student_profile:
            return Response({"error": "Student profile not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = StudentProfileSerializer(student_profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        teacher_profile = TeacherProfile.objects.filter(user=request.user).first()
        if teacher_profile:
            serializer = TeacherProfileSerializer(teacher_profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Teacher profile not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, format=None):
        serializer = TeacherProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save(user=request.user)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, format=None):
        teacher_profile = TeacherProfile.objects.filter(user=request.user).first()
        if not teacher_profile:
            return Response({"error": "Teacher profile not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TeacherProfileSerializer(teacher_profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AllTeachersView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        teachers = TeacherProfile.objects.all()
        serializer = TeacherCardSerializer(teachers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
# kkkkkkkkkkkkkkkkkkkkkkkkkkk

class AllUsersAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = AllUserSerializer

class AllTeacherImagesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        profile_pictures = ProfilePicture.objects.all()
        serializer = ProfilePictureSerializer(profile_pictures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Enrolled Status Count
class StudentEnrollmentView(APIView):
    permission_classes = [IsAuthenticated]

class AllTeacherImagesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        profile_pictures = ProfilePicture.objects.all()
        serializer = ProfilePictureSerializer(profile_pictures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

# Enrolled Status Count
class StudentEnrollmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = EnrollmentSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Enrollment successful"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class TeacherAddStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TeacherStudentManagementSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.add_student()
            return Response({"message": "Student added successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeacherRemoveStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = TeacherStudentManagementSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.remove_student()
            return Response({"message": "Student removed successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    
class TeacherStudentsListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            teacher = request.user.teacher_profile
            students = teacher.students.all()
            serializer = StudentDetailSerializer(students, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except TeacherProfile.DoesNotExist:
            return Response({"error": "Teacher profile not found"}, status=status.HTTP_404_NOT_FOUND)

class AutoEnrollStudentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, teacher_id):
        try:
            student = request.user.student_profile
            teacher = TeacherProfile.objects.get(id=teacher_id)

            if student in teacher.students.all():
                return Response({"message": "Student is already enrolled with this teacher."}, status=status.HTTP_400_BAD_REQUEST)

            teacher.students.add(student)
            teacher.save()

            return Response({"message": "Student enrolled successfully."}, status=status.HTTP_200_OK)

        except TeacherProfile.DoesNotExist:
            return Response({"error": "Teacher not found."}, status=status.HTTP_404_NOT_FOUND)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student profile not found."}, status=status.HTTP_404_NOT_FOUND)




class UploadLectureView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        title = request.data.get('title')
        start_time = request.data.get('start_time')
        if not title or not start_time:
            return Response({'error': 'Title and start time are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            start_time = datetime.fromisoformat(start_time)
        except ValueError:
            return Response({'error': 'Invalid start time format. Use ISO format (YYYY-MM-DDTHH:MM:SS).'}, status=status.HTTP_400_BAD_REQUEST)
        
        expiry_time = start_time + timedelta(hours=1)
        
        lecture = Lecture.objects.create(title=title, start_time=start_time, expiry_time=expiry_time)
        serializer = LectureSerializer(lecture)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class LectureListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        lectures = Lecture.objects.all()
        serializer = LectureSerializer(lectures, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)