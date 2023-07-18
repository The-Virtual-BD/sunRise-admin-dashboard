import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { baseURL } from "../components/utilities/url";
import { fetchBrand, fetchFAQs } from "./fetching";

export const APPContext = createContext();

const CollectionContext = ({ children }) => {
	const [isViewWork, setIsViewWork] = useState(false);
	const [isViewProducts, setIsViewProducts] = useState(false);
	const [isViewBrand, setIsViewBrand] = useState(false);
	const [isViewFaqs, setIsViewFaqs] = useState(false);
	const [isViewBlogs, setIsViewBlogs] = useState(false);
	const [isViewTeam, setIsViewTeam] = useState(false);
	const [menuOpen, setMenuOpen] = useState(true);
	const [user, setUser] = useState([]);


	// const [user] = useAuthState(auth);
	// const token = window.localStorage.getItem("token");

	

	const { data: faqs, isLoading: faqLoading } = useQuery("faqs",fetchFAQs);
	const { data: brands, isLoading: brandLoading } = useQuery("brands",fetchBrand);
	// console.log(brands)

	


	useEffect(() => {
		const getUserStr = localStorage.getItem("user");
		if (getUserStr) {
			const getUser = JSON.parse(getUserStr);
			//    console.log(getUser);
			setUser(getUser);
		}
	}, []);



	const value = {menuOpen,setMenuOpen,user,setUser,isViewWork,setIsViewWork,isViewProducts,setIsViewProducts,isViewBrand,setIsViewBrand,isViewFaqs,setIsViewFaqs,isViewBlogs,setIsViewBlogs,isViewTeam,setIsViewTeam,faqs,faqLoading,brands,brandLoading};


	return <APPContext.Provider value={value}>{children}</APPContext.Provider>;
};

//Create Hooks for send data
export const useCollection = () => {
	const context = useContext(APPContext);
	return context;
};

export default CollectionContext;
