import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import See_teachers from './pages/See_teachers';
import Pricing from './pages/Pricing';
import Company from './pages/Company';
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/see-teachers' element={<See_teachers />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/company' element={<Company />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
