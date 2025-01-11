import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

export default function StudentProfile() {
  const [profile, setProfile] = useState({});
  const [studentProfile, setStudentProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: '',
    address: '',
    enrolled_date: '',
    teacher: '',
    grade: '',
    parent_contact: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const [profileRes, studentProfileRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/asd/profile/'),
          axios.get('http://127.0.0.1:8000/asd/student/profile/')
        ]);

        setProfile(profileRes.data);
        setStudentProfile(studentProfileRes.data);
        setFormData({
          bio: profileRes.data.bio,
          address: profileRes.data.address,
          enrolled_date: studentProfileRes.data.enrolled_date,
          teacher: studentProfileRes.data.teacher,
          grade: studentProfileRes.data.grade,
          parent_contact: studentProfileRes.data.parent_contact
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile data', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://127.0.0.1:8000/asd/logout/', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      // Update profile picture only if there's a new one selected
      if (profilePicture) {
        const pictureData = new FormData();
        pictureData.append('image', profilePicture);
        await axios.post('http://127.0.0.1:8000/asd/profile/picture/', pictureData);
      }

      // Update bio and address on auth/profile/
      await axios.post('http://127.0.0.1:8000/asd/profile/', {
        bio: formData.bio,
        address: formData.address
      });

      // Update enrolled_date, grade, and parent_contact on auth/student/profile/
      await axios.post('http://127.0.0.1:8000/asd/student/profile/', {
        enrolled_date: formData.enrolled_date,
        grade: formData.grade,
        parent_contact: formData.parent_contact
      });

      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { first_name, last_name, email, profile_picture } = profile;
  const { enrolled_date, grade, parent_contact } = studentProfile;

  return (
    <section style={{ backgroundColor: '#eee' }}>
      <Link to="/chat">
        <IoChatboxEllipsesSharp style={{ color: 'blue', fontSize: '2.5rem', position: 'fixed', bottom: '30px', right: '25px' }}/>
      </Link>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">Students Profile</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active><MDBBtn onClick={handleLogout}>Logout</MDBBtn></MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={profile_picture ? `http://127.0.0.1:8000${profile_picture.image}` : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1"><MDBCardText className="text-muted">{`${first_name} ${last_name}`}</MDBCardText></p>
                <p className="text-muted mb-4">Student</p>
                <div className="d-flex justify-content-center mb-2">
                  <label htmlFor="profile_picture" className="btn btn-primary">
                    <MDBIcon icon="upload" className="me-1" /> Update Picture
                    <input type="file" id="profile_picture" style={{ display: 'none' }} onChange={handleImageChange} />
                  </label>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{`${first_name} ${last_name}`}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Bio</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="textarea"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Enrolled Date</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="date"
                        name="enrolled_date"
                        value={formData.enrolled_date}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Grade</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Parent Contact</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBInput
                        type="text"
                        name="parent_contact"
                        value={formData.parent_contact}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow className="d-flex justify-content-end">
                    <MDBBtn type="submit">Update Profile</MDBBtn>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}

