import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './TechnicianForm';


function App() {

  const [ manufacturers, setManufacturers ] = useState([]);

  async function getManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/')
    if (response.ok) {
      const { manufacturers } = await response.json();
      setManufacturers(manufacturers);
      // console.log(manufacturers)
    } else {
      console.error('An error occurred fetching the manufacturer data')
    }
  }

  useEffect(() => {
    getManufacturers();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
          </Route>
          <Route path="models">
          </Route>
          <Route path="automobiles">
          </Route>
          <Route path="salespeople">
          </Route>
          <Route path="customers">
          </Route>
          <Route path="sales">
          </Route>
          <Route path='/technicians/new' element={<TechnicianForm />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
