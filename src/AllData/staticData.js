import { AiFillHome, AiOutlineApartment } from 'react-icons/ai';
import {  BsFileTextFill } from 'react-icons/bs';
import {  SiWheniwork } from 'react-icons/si';
import {  GiDeliveryDrone } from 'react-icons/gi';
import {  FaQuora } from 'react-icons/fa';


export const sidebarMenu = [
    {
        id: 1,
        name: "Overview",
        icon: <AiFillHome />,
        path: "/admin-dashboard/dashboard"
    },
    {
        id: 2,
        name: "Our Work",
        icon: <SiWheniwork />,
        path: "/admin-dashboard/our-work"
    },
    {
        id: 3,
        name: "Products",
        icon: <GiDeliveryDrone />,
        path: "/admin-dashboard/products"
    },
    {
        id: 4,
        name: "Brands",
        icon: <AiOutlineApartment />,
        path: "/admin-dashboard/brand"
    },
    {
        id: 5,
        name: "Blogs",
        icon: <BsFileTextFill />,
        path: "/admin-dashboard/blogs"
    },
    {
        id: 6,
        name: "Faqs",
        icon: <FaQuora />,
        path: "/admin-dashboard/faqs"
    },
   
];



