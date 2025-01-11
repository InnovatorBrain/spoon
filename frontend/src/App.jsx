import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import StudentProfile from './components/StudentProfile';
import TeacherProfile from './components/TeacherProfile';
import See_teachers from './pages/See_teachers';
import Pricing from './pages/Pricing';
import Company from './pages/Company';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoutes from './PrivateRoute';
import Wc from './components/Wc';



function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Athenticated Users */}
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<div className="Dashboard-main-container">okies</div>} />
            <Route path='/student-pro' element={<><StudentProfile /><Wc /></>} />
            <Route path='/teacher-pro' element={<><TeacherProfile /><Wc /></>} />
          </Route>
          <Route path='/' element={<><Home /> <Wc /></>} />
          <Route path='/see-teachers' element={<><See_teachers /><Wc /></>} />
          <Route path='/pricing' element={<><Pricing /><Wc /></>} />
          <Route path='/company' element={<><Company /><Wc /></>} />
          <Route path='/signup' element={<><Signup /><Wc /></>} />
          <Route path='/login' element={<><Login /><Wc /></>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
