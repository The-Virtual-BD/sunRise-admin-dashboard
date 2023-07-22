import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { fetchBrand, fetchFAQs, fetchNews, fetchProducts, fetchTeam, fetchWork } from "./fetching";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

export const APPContext = createContext();

const CollectionContext = ({ children }) => {
	const [isViewWork, setIsViewWork] = useState(false);
	const [isViewProducts, setIsViewProducts] = useState(false);
	const [isViewBrand, setIsViewBrand] = useState(false);
	const [isViewFaqs, setIsViewFaqs] = useState(false);
	const [isViewBlogs, setIsViewBlogs] = useState(false);
	const [isViewTeam, setIsViewTeam] = useState(false);
	const [menuOpen, setMenuOpen] = useState(true);

	const [user] = useAuthState(auth);
	const token = window.localStorage.getItem("token");

	const { data: faqs, isLoading: faqLoading } = useQuery("faqs",fetchFAQs);
	const { data: brands, isLoading: brandLoading } = useQuery("brands",fetchBrand);
	const { data: products, isLoading: productsLoading } = useQuery("products",fetchProducts);
	const { data: news, isLoading: newsLoading } = useQuery("news",fetchNews);
	const { data: team, isLoading: teamLoading } = useQuery("team",fetchTeam);
	const { data: work, isLoading: workLoading } = useQuery("work",fetchWork);

	const value = {menuOpen,setMenuOpen,user,token,  isViewWork,setIsViewWork,isViewProducts,setIsViewProducts,isViewBrand,setIsViewBrand,isViewFaqs,setIsViewFaqs,isViewBlogs,setIsViewBlogs,isViewTeam,setIsViewTeam,faqs,faqLoading,brands,brandLoading,products,productsLoading,news,newsLoading,team,teamLoading,work,workLoading};

	return <APPContext.Provider value={value}>{children}</APPContext.Provider>;
};

//Create Hooks for send data
export const useCollection = () => {
	const context = useContext(APPContext);
	return context;
};

export default CollectionContext;
