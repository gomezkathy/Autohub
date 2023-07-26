import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import AddManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import AddModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';
import SalespeopleList from './SalespeopleList';
import AddSalespeopleForm from './SalespersonForm';
import SalesList from './SalesList';
import CustomersList from './CustomersList';
import TechnicianForm from './TechnicianForm';
import AddCustomerForm from './CustomerForm';


function App() {

  const [ manufacturers, setManufacturers ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ automobiles, setAutomobiles ] = useState([]);
  const [ salespeople, setSalespeople ] = useState([]);
  const [ customers, setCustomers ] = useState([]);
  const [ sales, setSales ] = useState([]);
  const[ technicians, setTechnicians]  = useState([]);

  async function getTechnicians () {
    const response = await fetch('http://localhost:8100/api/automobiles/');

    if (response.ok) {
      const { technicians } = await response.json();
      setTechnicians(technicians);
    } else {
      console.error ('error occured fetch technician data');
    }
  }

  async function getManufacturers() {
    const response = await fetch('http://localhost:8100/api/manufacturers/')
    if (response.ok) {
      const { manufacturers } = await response.json();
      setManufacturers(manufacturers);
    } else {
      console.error('An error occurred fetching the manufacturer data')
    }
  }

  async function getModels() {
    const response = await fetch('http://localhost:8100/api/models/')
    if (response.ok) {
      const { models } = await response.json();
      setModels(models);
    } else {
      console.error('An error occurred fetching the models data')
    }
  }

  async function getAutomobiles() {
    const response = await fetch('http://localhost:8100/api/automobiles/')
    if (response.ok) {
      const { automobiles } = await response.json();
      setAutomobiles(automobiles);
      // console.log(automobiles)
    } else {
      console.error('An error occurred fetching the automobiles data')
    }
  }

  async function getSalespeople() {
    const response = await fetch('http://localhost:8090/api/salespeople/')
    if (response.ok) {
      const { salespeople } = await response.json();
      setSalespeople(salespeople);
    } else {
      console.error('An error occurred fetching the salespeople data')
    }
  }

  async function getCustomers() {
    const response = await fetch('http://localhost:8090/api/customers/')
    if (response.ok) {
      const { customers } = await response.json();
      setCustomers(customers);
    } else {
      console.error('An error occurred fetching the customer data')
    }
  }

  async function getSales() {
    const response = await fetch('http://localhost:8090/api/sales/')
    if (response.ok) {
      const { sales } = await response.json();
      setSales(sales);
      console.log(sales)
    } else {
      console.error('An error occurred fetching the sales data')
    }
  }

  useEffect(() => {
    getManufacturers();
    getModels();
    getAutomobiles();
    getSalespeople();
    getCustomers();
    getSales();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturersList manufacturers={manufacturers} getManufacturers={getManufacturers}/>} />
            <Route path="create" element={<AddManufacturerForm getManufacturers={getManufacturers}/>} />
          </Route>
          <Route path="models">
            <Route index element={<ModelsList models={models} getModels={getModels}/>} />
            <Route path="create" element={<AddModelForm manufacturers={manufacturers} getModels={getModels} />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobilesList automobiles={automobiles} getAutomobiles={getAutomobiles}/>} />
          </Route>
          <Route path="salespeople">
            <Route index element={<SalespeopleList salespeople={salespeople} getSalespeople={getSalespeople}/>} />
            <Route path="create" element={<AddSalespeopleForm getSalespeople={getSalespeople}/>} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomersList customers={customers} getCustomers={getCustomers}/>} />
            <Route path="create" element={<AddCustomerForm getCustomers={getCustomers}/>} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList sales={sales} getSales={getSales}/>} />
          </Route>
          <Route path='/technicians/new' element={<TechnicianForm />} ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
