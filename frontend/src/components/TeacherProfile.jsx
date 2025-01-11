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
    MDBInput,
} from 'mdb-react-ui-kit';

export default function TeacherProfile() {
    const [profile, setProfile] = useState({});
    const [teacherProfile, setteacherProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        bio: '',
        address: '',
        subject: '',
        experience: '',
        qualifications: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const [profileRes, studentProfileRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/asd/profile/'),
                    axios.get('http://127.0.0.1:8000/asd/teacher/profile/')
                ]);

                setProfile(profileRes.data);
                setteacherProfile(studentProfileRes.data);
                setFormData({
                    bio: profileRes.data.bio,
                    address: profileRes.data.address,
                    subject: studentProfileRes.data.subject,
                    experience: studentProfileRes.data.experience,
                    qualifications: studentProfileRes.data.qualifications,
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

            await axios.post('http://127.0.0.1:8000/asd/teacher/profile/', {
                subject: formData.subject,
                experience: formData.experience,
                qualifications: formData.qualifications
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
    const { subject, experience, qualifications } = teacherProfile;

    return (
        <section style={{ backgroundColor: '#eee' }}>
            <Link to="/chat">
                <IoChatboxEllipsesSharp style={{ color: 'blue', fontSize: '2rem', position: 'fixed', bottom: '30px', right: '25px' }} />
            </Link>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol>
                        <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                            <MDBBreadcrumbItem>
                                <a href='/'>Home</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem>
                                <a href="#">Teacher Profile</a>
                            </MDBBreadcrumbItem>
                            <MDBBreadcrumbItem><MDBBtn onClick={handleLogout}>Logout</MDBBtn></MDBBreadcrumbItem>
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
                                <p className="text-muted mb-4">Teacher</p>
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
                                            <MDBCardText>Subject</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Your Experience</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput
                                                type="text"
                                                name="experience"
                                                value={formData.experience}
                                                onChange={handleInputChange}
                                            />
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Qualifications</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBInput
                                                type="text"
                                                name="qualifications"
                                                value={formData.qualifications}
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

