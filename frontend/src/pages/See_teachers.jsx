import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

export default function See_teachers() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredTeachers, setFilteredTeachers] = useState([]); // State for filtered teachers

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const [teachersResponse, imagesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/asd/teachers/'),
          axios.get('http://127.0.0.1:8000/asd/teacher-images/')
        ]);

        const imagesMap = imagesResponse.data.reduce((map, image) => {
          map[image.custom_user] = `http://127.0.0.1:8000${image.image}`;
          return map;
        }, {});

        const teachersWithImages = teachersResponse.data.map(teacher => ({
          ...teacher,
          image: imagesMap[teacher.id] || 'https://via.placeholder.com/150'
        }));

        setTeachers(teachersWithImages);
        setFilteredTeachers(teachersWithImages); // Initialize filteredTeachers with all teachers
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchTeachers();
  }, []);

  // Function to handle search
  const handleSearch = () => {
    const filtered = teachers.filter(teacher => 
      `${teacher.user_first_name} ${teacher.user_last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="flex-grow-1 py-5">
        
        {/* Search Bar */}
        <MDBRow className="justify-content-center mb-4">
          <MDBCol md="6">
            <MDBInput
              label="Search by Teacher Name"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
          </MDBCol>
          <MDBCol md="2">
            <MDBBtn color="primary" onClick={handleSearch}>Search</MDBBtn> {/* Search Button */}
          </MDBCol>
        </MDBRow>
        
        <MDBRow className="justify-content-center align-items-center h-100">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map(teacher => (
              <MDBCol key={teacher.id} md="12" xl="4" className="mb-4">
                <MDBCard style={{ borderRadius: '15px' }}>
                  <MDBCardBody className="text-center">
                    <div className="mt-3 mb-4">
                      <MDBCardImage
                        src={teacher.image}
                        className="rounded-circle"
                        fluid
                        style={{ width: '100px' }}
                      />
                    </div>
                    <MDBTypography tag="h4">
                      {teacher.user_first_name} {teacher.user_last_name}
                    </MDBTypography>
                    <MDBCardText className="text-muted mb-4">
                      {teacher.user_email} <br />
                      {teacher.subject ? `Subject: ${teacher.subject}` : 'Subject: N/A'} <br />
                      {teacher.experience !== null ? `Experience: ${teacher.experience} years` : 'Experience: N/A'} <br />
                      {teacher.qualifications ? `Qualifications: ${teacher.qualifications}` : 'Qualifications: N/A'}
                    </MDBCardText>
                    <a href={`mailto:${teacher.user_email}`}>
                      <MDBBtn rounded size="lg">
                        Mail Me
                      </MDBBtn>
                    </a>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))
          ) : (
            <p>No teachers found.</p>
          )}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
