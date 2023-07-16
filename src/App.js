import { Route, Routes } from 'react-router-dom';
import 'tw-elements';
import CollectionContext from './actions/reducers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'suneditor/dist/css/suneditor.min.css';

import RequireAuth from './components/utilities/RequireAuth';


import AdminDashboard from './components/Dashboard/AdminDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import Faqs from './components/SunRiseDashboard/Faqs';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Blogs from './components/Dashboard/BlogPages/Blogs';
import BlogDetails from './components/Dashboard/BlogPages/BlogDetails';
import Brands from './components/SunRiseDashboard/Brands';
import OurWork from './components/SunRiseDashboard/OurWork';
import Products from './components/SunRiseDashboard/Products';
import Teams from './components/SunRiseDashboard/Teams';

function App() {
  
 
  
  return (
    <CollectionContext>
      
      <Routes>
        <Route path="/" element={<RequireAuth> <AdminDashboard /> </RequireAuth>  } />

        <Route path="/admin-dashboard" element={<RequireAuth> <AdminDashboard /> </RequireAuth>  }>

          <Route index path="/admin-dashboard/dashboard" element={<Dashboard />} />

          <Route path='/admin-dashboard/news' element={<Blogs />}></Route>
          <Route path='/admin-dashboard/news/:id' element={<BlogDetails />}></Route>

          <Route path='/admin-dashboard/faqs' element={<Faqs />}></Route>
          <Route path='/admin-dashboard/brand' element={<Brands />}></Route>
          <Route path='/admin-dashboard/our-work' element={<OurWork />}></Route>
          <Route path='/admin-dashboard/products' element={<Products />}></Route>
          <Route path='/admin-dashboard/teams' element={<Teams />}></Route>
        </Route>

        <Route path='/profile' element={<RequireAuth> <Profile /></RequireAuth> }></Route>
        <Route path='/sign-in' element={<Login />}></Route>
      </Routes>

      <ToastContainer />
    </CollectionContext>
  );
}

export default App;
