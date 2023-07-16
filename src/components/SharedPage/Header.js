import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { APPContext, useCollection } from '../../actions/reducers';
import { sidebarMenu } from '../../AllData/staticData';
import useToken from '../utilities/useToken';
import useUser from '../utilities/useUser';
import blankUser from '../../images/blank_user.png';
import { baseURL } from '../utilities/url';

import logo2 from '../../images/logo.png'


const Header = () => {
 


    const {menuOpen,
		setMenuOpen,
		user,
		setUser,
		isViewWork,
		setIsViewWork,
		isViewProducts,
		setIsViewProducts,
		isViewBrand,
		setIsViewBrand,
		isViewFaqs,
		setIsViewFaqs,
		isViewBlogs,
		setIsViewBlogs,isViewTeam, setIsViewTeam}=useCollection();



    const [token, setToken] = useToken();
    const location = useLocation();
    const currentPath = location.pathname;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    // const userImg=`${baseURL}/${user?.photo}`;

    // const [image, setImage] = useState(userImg || blankUser);
    const [profile, setProfile] = useState(false);

    // const access_token=window.localStorage.getItem("token")
    // const access_user=window.localStorage.getItem("user")


    //Handle Logout
    const handleLogout = () => {
        const url = `${baseURL}/api/logout`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setUser('');
                setOpen(false)
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                navigate('/sign-in');
            });
    };
    // console.log(user)



    return (
        <>
       
       
            <div>
                <div className='w-full text-primary flex items-center gap-3 justify-between h-20 px-3 lg:px-5 lg:py-3  bg-white shadow-lg border-b-[1px] border-bgclr'>


                    {/* <img src={"/assets/Virtual BD Logo.png"} alt="talents" className="my-5 hidden lg:block" /> */}

                    <div className='flex items-center gap-5'>
                        <Link to={"/admin-dashboard/dashboard"}>
                            <img src={logo2} alt="talents" className="my-5 block" />
                        </Link>

                        {
                            (currentPath !== "/sign-in" && currentPath !== "/profile") && <>{
                                !menuOpen
                                    ?
                                    <span onClick={() => setMenuOpen(!menuOpen)} className='w-8 h-10 rounded-md cursor-pointer bg-bgclr hidden lg:flex items-center justify-center'><IoIosArrowForward className='text-2xl font-bold text-blue' /></span>

                                    :
                                    <span onClick={() => setMenuOpen(!menuOpen)} className='w-8 h-10 rounded-md cursor-pointer bg-bgclr hidden lg:flex items-center justify-center'><IoIosArrowBack className='text-2xl font-bold text-blue' /></span>

                            }</>
                        }

                    </div>

                    <div>
                        {/* Work Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/our-work" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsViewWork(false)}
                                    className={`${(!isViewWork) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Work</button>

                                <button
                                    onClick={() => setIsViewWork(true)}
                                    className={`${isViewWork ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Work</button>

                            </div>
                        }

                        {/*Product Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/products" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsViewProducts(false)}
                                    className={`${(!isViewProducts) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Products</button>

                                <button
                                    onClick={() => setIsViewProducts(true)}
                                    className={`${isViewProducts ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Product</button>

                            </div>
                        }

                        {/*Brand Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/brand" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsViewBrand(false)}
                                    className={`${(!isViewBrand) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Brand</button>

                                <button
                                    onClick={() => setIsViewBrand(true)}
                                    className={`${isViewBrand ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Brand</button>

                            </div>
                        }


                        {/*news Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/news" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsViewBlogs(false)}
                                    className={`${(!isViewBlogs) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View News</button>

                                <button
                                    onClick={() => setIsViewBlogs(true)}
                                    className={`${isViewBlogs ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add News</button>

                            </div>
                        }


                        {/*faqs Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/faqs" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsViewFaqs(false)}
                                    className={`${(!isViewFaqs) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View FAQs</button>

                                <button
                                    onClick={() => setIsViewFaqs(true)}
                                    className={`${isViewFaqs ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add FAQs</button>

                            </div>
                        }

                        {/*Team Sub Menu */}
                        {
                            currentPath === "/admin-dashboard/teams" && <div className='lg:flex items-center gap-4 justify-center hidden'>
                                <button
                                    onClick={() => setIsViewTeam(false)}
                                    className={`${(!isViewTeam) ? "text-blue" : ""} text-sm lg:text-lg font-semibold hover:text-blue  `}>View Member</button>

                                <button
                                    onClick={() => setIsViewTeam(true)}
                                    className={`${isViewTeam ? "text-blue" : ""} text-sm lg:text-lg  font-semibold  hover:text-blue `}>Add Member</button>

                            </div>
                        }

                       


                    </div>




                    {
                        (token) ?
                            <div className='hidden lg:flex items-center gap-2'>
                                <div className='text-end'>
                                    <h3 className='text-lg font-bold'>{user?.first_name}</h3>
                                    <p className='text-sm font-semibold'>{user?.profession}</p>
                                </div>



                                <div className="flex justify-center">
                                    <div>
                                        <div className="dropdown relative">
                                            <button type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                {
                                                    user?.photo?
                                                    <img src={`${baseURL}/${user?.photo}`} alt="admin" srcSet="" style={{ width: "50px", height: "50px", borderRadius: "100%" }} onClick={() => setProfile(!profile)} />:
                                                    <img src={blankUser} alt="admin" srcSet="" style={{ width: "50px", height: "50px", borderRadius: "100%" }} onClick={() => setProfile(!profile)} />
                                                }
                                            </button>
                                            <ul className="dropdown-menu w-36 absolute bg-white text-base z-50 float-left py-1.5 list-none text-left rounded-lg shadow-lg mt-1  hidden  m-0 bg-clip-padding border-none "
                                                aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                    <Link to={"/profile"} className="dropdown-item text-sm py-1.5 px-4 block w-full  whitespace-nowrap  bg-transparent text-primary hover:bg-bgclr text-center font-bold">Profile</Link > </li>
                                                <li>
                                                    <button className="dropdown-item text-sm py-1.5 px-4  block w-full  whitespace-nowrap  bg-transparent text-primary hover:bg-bgclr font-bold" onClick={handleLogout}>Logout </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div> : ""
                    }




                    {/* Menu Icon for Responsive*/}
                    <button
                        onClick={() => setOpen(!open)}
                        className="block lg:hidden text-blue"
                    >
                        {!open ? (
                            <AiOutlineMenu className="text-3xl" />
                        ) : (
                            <AiOutlineClose className="text-3xl" />
                        )}
                    </button>



                </div>

                <div className='lg:hidden block  '>
                    {open ? (
                        <div className="bg-blue text-white  rounded w-60  py-3 z-10 absolute top-0 left-0  overflow-y-auto overflow-x-hidden ">
                            {/* <img src="/assets/admin.png" alt="admin" srcSet="" /> */}
                            <div className='flex flex-col lg:hidden  text-center '>
                                <h3 className='text-lg font-bold'>{user.first_name}</h3>
                                <p className='text-sm'>{user.profession}</p>
                            </div>


                            {/* Work Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/our-work" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsViewWork(false)
                                            setOpen(!open)
                                        }}
                                        className={`${(!isViewWork) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View Work</button>

                                    <button
                                        onClick={() => {
                                            setIsViewWork(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isViewWork ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Work</button>

                                </div>
                            }

                            {/* Product Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/products" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsViewProducts(false)
                                            setOpen(!open)
                                        }}
                                        className={`${(!isViewProducts) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View Work</button>

                                    <button
                                        onClick={() => {
                                            setIsViewProducts(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isViewProducts ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Work</button>

                                </div>
                            }


                            {/* Brand Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/brand" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsViewBrand(false)
                                            setOpen(!open)
                                        }}
                                        className={`${(!isViewBrand) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View Brand</button>

                                    <button
                                        onClick={() => {
                                            setIsViewBrand(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isViewBrand ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Brand</button>

                                </div>
                            }


                            {/* News Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/news" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsViewBlogs(false)
                                            setOpen(!open)
                                        }}
                                        className={`${(!isViewBlogs) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View News</button>

                                    <button
                                        onClick={() => {
                                            setIsViewBlogs(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isViewBlogs ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add News</button>

                                </div>
                            }


                            {/* Faqs Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/faqs" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsViewFaqs(false)
                                            setOpen(!open)
                                        }}
                                        className={`${(!isViewFaqs) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View FAQs</button>

                                    <button
                                        onClick={() => {
                                            setIsViewFaqs(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isViewFaqs ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add FAQs</button>

                                </div>
                            }


                            {/* Teams Sub Menu */}
                            {
                                currentPath === "/admin-dashboard/teams" && <div className='flex flex-col items-start  justify-start  mt-5 mb-2 border-b-[1px] border-white lg:hidden'>
                                    <button
                                        onClick={() => {
                                            setIsViewTeam(false)
                                            setOpen(!open)
                                        }}
                                        className={`${(!isViewTeam) ? "text-blue bg-white" : ""} text-sm text-start w-full px-5 py-2  font-semibold hover:text-blue hover:bg-white`}>* View Member</button>

                                    <button
                                        onClick={() => {
                                            setIsViewTeam(true)
                                            setOpen(!open)
                                        }}
                                        className={`${isViewTeam ? "text-blue bg-white" : ""} text-sm text-start px-5 py-2 w-full font-semibold  hover:text-blue hover:bg-white `}>* Add Member</button>

                                </div>
                            }


                      




                            <ul className="  flex flex-col  items-start ease-in">
                                {
                                    sidebarMenu.map(singleMenu => <li key={singleMenu.id} onClick={() => setOpen(!open)}
                                        className={`w-full hover:text-blue hover:bg-white  px-5 py-2 rounded-sm
                             ${currentPath === singleMenu.path ? "text-blue bg-white" : ""} `} >
                                        <Link to={singleMenu.path}>
                                            <div className='flex items-center justify-start'>
                                                {singleMenu.icon}
                                                <span className='ml-2'> {singleMenu.name}</span>
                                            </div>
                                        </Link>

                                        <div>

                                        </div>
                                    </li>)
                                }

                                <li className='w-full hover:text-blue hover:bg-white  px-5 py-2 rounded-sm cursor-pointer' onClick={handleLogout}>
                                    <div className='flex items-center justify-start'>
                                        <AiOutlineLogout /> <span className='ml-2'> Logout</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                </div>


            </div>
        </>
    );
};

export default Header;