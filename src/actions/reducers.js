import { createContext, useContext, useEffect, useState } from "react";

export const APPContext = createContext();

const CollectionContext = ({ children }) => {
	const [isViewWork, setIsViewWork] = useState(false);
	const [isViewProducts, setIsViewProducts] = useState(false);
	const [isViewBrand, setIsViewBrand] = useState(false);
	const [isViewFaqs, setIsViewFaqs] = useState(false);
	const [isViewBlogs, setIsViewBlogs] = useState(false);
	const [menuOpen, setMenuOpen] = useState(true);
	const [user, setUser] = useState([]);

	const value = {
		menuOpen,
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
		setIsViewBlogs,
	};

	useEffect(() => {
		const getUserStr = localStorage.getItem("user");
		if (getUserStr) {
			const getUser = JSON.parse(getUserStr);
			//    console.log(getUser);
			setUser(getUser);
		}
	}, []);

	return <APPContext.Provider value={value}>{children}</APPContext.Provider>;
};

//Create Hooks for send data
export const useCollection = () => {
	const context = useContext(APPContext);
	return context;
};

export default CollectionContext;

/* const [user] = useAuthState(auth);
	const token = window.localStorage.getItem("token");

	//Fetch Collections
	const fetchCollections = async () => {
		const res = await fetch(`${baseUrl}/collections`);
		const data = await res.json();
		return data?.data;
	};

	//Fetch Products
	const fetchProducts = async () => {
		const res = await fetch(`${baseUrl}/sales`);
		const data = await res.json();
		return data?.data;
	};

	const { data: collection, isLoading: loading } = useQuery(
		"collections",
		fetchCollections
	);
	const { data: products, isLoading: loadingProducts } = useQuery(
		"products",
		fetchProducts
	); */
