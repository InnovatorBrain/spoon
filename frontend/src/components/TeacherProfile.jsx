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
    MDBIcon,
    MDBInput,
    MDBSpinner,
} from 'mdb-react-ui-kit';

export default function TeacherProfile() {
    const [profile, setProfile] = useState({});
    const [teacherProfile, setTeacherProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        bio: '',
        address: '',
        subject: '',
        experience: '',
        qualifications: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                const [profileRes, teacherProfileRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/asd/profile/'),
                    axios.get('http://127.0.0.1:8000/asd/teacher/profile/')
                ]);

                setProfile(profileRes.data);
                setTeacherProfile(teacherProfileRes.data);
                setFormData({
                    bio: profileRes.data.bio || '',
                    address: profileRes.data.address || '',
                    subject: teacherProfileRes.data.subject || '',
                    experience: teacherProfileRes.data.experience || '',
                    qualifications: teacherProfileRes.data.qualifications || '',
                });
            } catch (error) {
                console.error('Failed to fetch profile data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post('http://127.0.0.1:8000/asd/logout/', {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const token = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            if (profilePicture) {
                const pictureData = new FormData();
                pictureData.append('image', profilePicture);
                await axios.post('http://127.0.0.1:8000/asd/profile/picture/', pictureData);
            }

            await axios.post('http://127.0.0.1:8000/asd/profile/', {
                bio: formData.bio,
                address: formData.address,
            });

            await axios.post('http://127.0.0.1:8000/asd/teacher/profile/', {
                subject: formData.subject,
                experience: formData.experience,
                qualifications: formData.qualifications,
            });

            alert('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile', error);
            alert('Failed to update profile');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <MDBSpinner role="status">
                    <span className="visually-hidden">Loading...</span>
                </MDBSpinner>
            </div>
        );
    }

    const { first_name, last_name, email, profile_picture } = profile;

    return (
        <section style={{ backgroundColor: '#f9f9f9' }}>
            <Link to="/chat">
                <IoChatboxEllipsesSharp style={{ color: 'blue', fontSize: '2rem', position: 'fixed', bottom: '30px', right: '25px' }} />
            </Link>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4 text-center">
                            <MDBCardBody>
                                <MDBCardImage
                                    src={previewImage || (profile_picture ? `http://127.0.0.1:8000/asd${profile_picture.image}` : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp')}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                    fluid
                                />
                                <div className="d-flex justify-content-center my-3">
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
                                            <MDBCardText>{`${first_name} ${last_name}`}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText>{email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    {/* Form Inputs */}
                                    {Object.entries(formData).map(([key, value]) => (
                                        <MDBRow key={key}>
                                            <MDBCol sm="3">
                                                <MDBCardText className="text-capitalize">{key}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBInput
                                                    type="text"
                                                    name={key}
                                                    value={value}
                                                    onChange={handleInputChange}
                                                />
                                            </MDBCol>
                                            <hr />
                                        </MDBRow>
                                    ))}
                                    <MDBRow className="d-flex justify-content-end">
                                        <MDBBtn type="submit" disabled={updating}>
                                            {updating ? (
                                                <>
                                                    <MDBSpinner size="sm" role="status" />
                                                    Updating...
                                                </>
                                            ) : 'Update Profile'}
                                        </MDBBtn>
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
