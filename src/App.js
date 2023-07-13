import { Route, Routes } from 'react-router-dom';
import 'tw-elements';
import { useEffect,  useState } from 'react';
import { APPContext} from './actions/reducers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import RequireAuth from './components/utilities/RequireAuth';
import './App.css';

import AdminDashboard from './components/Dashboard/AdminDashboard';
import Dashboard from './components/Dashboard/Dashboard';
import Faqs from './components/SunRiseDashboard/Faqs';
import Header from './components/SharedPage/Header';

import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Blogs from './components/Dashboard/BlogPages/Blogs';

import BlogDetails from './components/Dashboard/BlogPages/BlogDetails';

import Brands from './components/SunRiseDashboard/Brands';
import OurWork from './components/SunRiseDashboard/OurWork';
import Products from './components/SunRiseDashboard/Products';

function App() {
  const [isViewWork, setIsViewWork] = useState(false);
  const [isViewProducts, setIsViewProducts] = useState(false);
  const [isViewBrand, setIsViewBrand] = useState(false);
  const [isViewFaqs, setIsViewFaqs] = useState(false);
  const [isViewBlogs, setIsViewBlogs] = useState(false);
 



 

  const [menuOpen, setMenuOpen] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    const getUserStr=localStorage.getItem("user");
       if(getUserStr){
         const getUser= JSON.parse(getUserStr);
         //    console.log(getUser);
            setUser(getUser);
       }
  },[]);





  
  // console.log(user)


  // const [data, dispatch] = useReducer(initialState);
  const value = {  isViewWork, setIsViewWork, menuOpen, setMenuOpen,user, setUser,}

  
  return (
    <APPContext.Provider value={value}>
      
      <Routes>
        <Route path="/" element={<RequireAuth> <AdminDashboard /> </RequireAuth>  } />

        <Route path="/admin-dashboard" element={<RequireAuth> <AdminDashboard /> </RequireAuth>  }>

          <Route index path="/admin-dashboard/dashboard" element={<Dashboard />} />


          <Route path='/admin-dashboard/blogs' element={<Blogs />}></Route>
          <Route path='/admin-dashboard/blogs/:id' element={<BlogDetails />}></Route>

          <Route path='/admin-dashboard/faqs' element={<Faqs />}></Route>
          <Route path='/admin-dashboard/brand' element={<Brands />}></Route>
          <Route path='/admin-dashboard/our-work' element={<OurWork />}></Route>
          <Route path='/admin-dashboard/products' element={<Products />}></Route>

         

        </Route>

        <Route path='/profile' element={<RequireAuth> <Profile /></RequireAuth> }></Route>
        <Route path='/sign-in' element={<Login />}></Route>
      </Routes>
      <ToastContainer />

    </APPContext.Provider>
  );
}

export default App;
