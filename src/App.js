import { Route, Routes } from "react-router-dom";
import "tw-elements";
import CollectionContext from "./actions/reducers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "suneditor/dist/css/suneditor.min.css";
import {  QueryClient, QueryClientProvider } from "react-query";

import RequireAuth from "./components/utilities/RequireAuth";

import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import Faqs from "./components/SunRiseDashboard/Faqs/Faqs";
import Login from "./components/Login/Login";
import Blogs from "./components/Dashboard/BlogPages/Blogs";
import BlogDetails from "./components/Dashboard/BlogPages/BlogDetails";
import Brands from "./components/SunRiseDashboard/Brands";
import OurWork from "./components/SunRiseDashboard/Work/OurWork";
import Products from "./components/SunRiseDashboard/Products/Products";
import Teams from "./components/SunRiseDashboard/Team/Teams";
import FaqsEdit from "./components/SunRiseDashboard/Faqs/FaqsEdit";
import ProductsEdit from "./components/SunRiseDashboard/Products/ProductsEdit";
import ProductDetails from "./components/SunRiseDashboard/Products/ProductDetails";
import TeamDetails from "./components/SunRiseDashboard/Team/TeamDetails";
import OurWorkDetails from "./components/SunRiseDashboard/Work/OurWorkDetails";
import Message from "./components/SunRiseDashboard/msg/Message";
import MessageDetails from "./components/SunRiseDashboard/msg/MessageDetails";

const queryClient = new QueryClient();

function App() {

	return (
		<QueryClientProvider client={queryClient}>
			<CollectionContext>
				<Routes>
					<Route
						path="/"
						element={
							<RequireAuth>
								{" "}
								<AdminDashboard />{" "}
							</RequireAuth>
						}
					/>

					<Route
						path="/admin-dashboard"
						element={
							<RequireAuth>
								<AdminDashboard />
							</RequireAuth>
						}
					>
						<Route
							index
							path="/admin-dashboard/dashboard"
							element={<Dashboard />}
						/>

						<Route path="/admin-dashboard/news" element={<Blogs />}></Route>
						<Route
							path="/admin-dashboard/news/:id"
							element={<BlogDetails />}
						></Route>

						<Route path="/admin-dashboard/faqs" element={<Faqs />}></Route>
						<Route
							path="/admin-dashboard/faqs/:id"
							element={<FaqsEdit />}
						></Route>

						<Route
							path="/admin-dashboard/products"
							element={<Products />}
						></Route>
						<Route
							path="/admin-dashboard/products/edit/:id"
							element={<ProductsEdit />}
						></Route>
						<Route
							path="/admin-dashboard/products/view/:id"
							element={<ProductDetails />}
						></Route>

						<Route path="/admin-dashboard/brand" element={<Brands />}></Route>
						<Route
							path="/admin-dashboard/our-work"
							element={<OurWork />}
						></Route>
						<Route
							path="/admin-dashboard/our-work/:id"
							element={<OurWorkDetails />}
						></Route>

						<Route path="/admin-dashboard/teams" element={<Teams />}></Route>
						<Route
							path="/admin-dashboard/teams/:id"
							element={<TeamDetails />}
						></Route>


						<Route path="/admin-dashboard/message" element={<Message />}></Route>
						<Route
							path="/admin-dashboard/message/:id"
							element={<MessageDetails />}
						></Route>
					</Route>

					<Route path="/sign-in" element={<Login />}></Route>
				</Routes>

				<ToastContainer />
			</CollectionContext>
		</QueryClientProvider>
	);
}

export default App;
