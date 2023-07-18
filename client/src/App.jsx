import './App.css';
import axios from 'axios';
import { Route, Routes } from "react-router-dom";
import RegisterPage from './page/RegisterPage';
import LoginPage from './page/LoginPage';
import AccountPage from './page/AccountPage';
import Layout from '../layout/Layout';
import IndexPage from './page/IndexPage';
import ListingCard from './components/listing/ListingCard';
import DetailPlace from './components/listing/DetailPlace';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';


axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;



function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<ListingCard />} />
        {/* <Route index element={<IndexPage />} /> */}
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/account/:subpage?' element={<AccountPage />} />
        <Route path='/account/:subpage/:action' element={<AccountPage />} />
        <Route path='/category/:categoty?' element={<ListingCard />} />
        <Route path='/places/:id' element={<DetailPlace />} />
      </Route>
    </Routes>

  );
}

export default App;
