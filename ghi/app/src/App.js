import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturersList from './ManufacturersList';
import AddManufacturerForm from './ManufacturerForm';
import ModelsList from './ModelsList';
import AddModelForm from './ModelForm';
import AutomobilesList from './AutomobilesList';
import AddAutomobileForm from './AutomobileForm';
import SalespeopleList from './SalespeopleList';
import AddSalespeopleForm from './SalespersonForm';
import SalesList from './SalesList';
import AddSaleForm from './SaleForm';
import CustomersList from './CustomersList';
import TechnicianForm from './TechnicianForm';
import AddCustomerForm from './CustomerForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';



function App(props) {

  const [ manufacturers, setManufacturers ] = useState([]);
  const [ models, setModels ] = useState([]);
  const [ autos, setAutomobiles ] = useState([]);
  const [ salespeople, setSalespeople ] = useState([]);
  const [ customers, setCustomers ] = useState([]);
  const [ sales, setSales ] = useState([]);
  const [ appointments, setAppointments] = useState([]);
  const [ inventory, setInventory ] = useState([]);

  async function getInventory() {
      const response = await fetch('http://localhost:8100/api/automobiles/');
      if (response.ok) {
        const { inventory } = await response.json();
        setInventory(inventory);
      } else {
      console.error('could not get inventory data');
    }
  }

  async function getAppointments() {
    const response = await fetch('http://localhost:8080/api/appointments/');
    if (response.ok) {
      const { appointments } = await response.json();
      setAppointments(appointments);
    } else {
      console.error('could not get appointment data');
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
      const { autos } = await response.json();
      setAutomobiles(autos);
    } else {
      console.error('An error occurred fetching the automobiles data')
    }
  }

  async function getSalespeople() {
    const response = await fetch('http://localhost:8090/api/salespeople/')
    if (response.ok) {
      const { salespeople } = await response.json();
      setSalespeople(salespeople);
      // console.log(salespeople)
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
      // console.log(sales)
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
    getAppointments();
    getInventory();


  }, [])
  if (props.technicians === undefined) {
    return null;
  }

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route index element={<TechnicianList technicians={props.technicians} />} />
            <Route path="new" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList inventory={inventory} appointments={appointments} />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route path="history" element={<ServiceHistory appointments={appointments}/>} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturersList manufacturers={manufacturers} getManufacturers={getManufacturers}/>} />
            <Route path="create" element={<AddManufacturerForm getManufacturers={getManufacturers}/>} />
          </Route>
          <Route path="models">
            <Route index element={<ModelsList models={models} getModels={getModels}/>} />
            <Route path="create" element={<AddModelForm manufacturers={manufacturers} getModels={getModels} />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobilesList autos={autos} getAutomobiles={getAutomobiles}/>} />
            <Route path="create" element={<AddAutomobileForm models={models} getAutomobiles={getAutomobiles} />} />
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
            <Route index element={<SalesList salespeople={salespeople} sales={sales} getSales={getSales} getAutomobiles={getAutomobiles}/>} />
            <Route path="create" element={<AddSaleForm autos={autos} customers={customers} salespeople={salespeople} getSales={getSales} getAutos={getAutomobiles}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
