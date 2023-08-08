import React, { useState } from "react";
import { useCollection } from "../../../actions/reducers";
import SunEditor from "suneditor-react";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const Products = () => {
	const { isViewProducts } = useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{isViewProducts ? <AddProduct /> : <ViewProducts />}
		</div>
	);
};

export default Products;

const AddProduct = () => {
	const location = useLocation();
	const [proName, setProName] = useState("");
	const [proCategory, setProCategory] = useState("");
	const [proImg, setProImg] = useState(null);
	const [proDesc, setProDesc] = useState("");

	const [submitting, setSubmitting] = useState(false);

	//Handle Product Add Form
	const handleProductForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const productForm = new FormData();
			productForm.append("proName", proName);
			productForm.append("proCategory", proCategory);
			productForm.append("proImg", proImg);
			productForm.append("proDesc", proDesc);

			const url = `${baseURL}/products/create`;
			axios
				.post(url, productForm)
				.then((res) => {
					console.log(res);
					toast.success("Products Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Products Added Failed");
			setSubmitting(false);
		};

		location.reload();
	};

	// console.log(submitting);

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Product</h3>

					<form
						onSubmit={handleProductForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									onChange={(e) => setProName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
									onChange={(e) => setProCategory(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								onChange={(e) => setProImg(e.target.files[0])}
								required
								className="file-input  w-full bg-bgclr"
							/>
						</div>

						<div className="w-full">
							<SunEditor
								setOptions={{
									buttonList: [
										["undo", "redo"],
										[
											"bold",
											"underline",
											"italic",
											"strike",
											"subscript",
											"superscript",
										],
										["fontColor", "hiliteColor"],
										["indent", "outdent"],
										["align", "horizontalRule", "list", "table"],
										["link"],
										["fullScreen", "showBlocks", "codeView"],
										["preview", "print"],
									],
								}}
								lang="en"
								width="100%"
								height="100%"
								placeholder="Enter Description..."
								autoFocus={true}
								onChange={(content) => {
									setProDesc(content);
								}}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<button
							disabled={submitting}
							type="submit"
							className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							{submitting ? "Adding..." : "Add"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const ViewProducts = () => {
	const { products, productsLoading } = useCollection();
	const navigate = useNavigate();
	const location=useLocation();

	if (productsLoading) {
		return <p>Loading...</p>;
	};

	if (!productsLoading && products.length === 0) {
		return <p className="text-center text-lg">No Product Available</p>;
	};
	const sortProducts = [...products].reverse();

	const handleProductView = (id) => {
		navigate(`/admin-dashboard/products/view/${id}`);
	};

	const handleEditBtn = (id) => {
		navigate(`/admin-dashboard/products/edit/${id}`);
	};

	//Handle Delete Post
	const handleDeleteProduct = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/products/${id}`)
				.then((response) => {
					// console.log(`Deleted post with ID ${id}`);
					toast.success("Deleted successfully!");
				})
				.catch((error) => {
					// console.error(error);
					toast.error("Deleted Failed!");
				});
		};
		location.reload();
	};

	const PRODUCTS_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Name",
				accessor: "proName",
				sortType: "basic",
				Cell: ({ row }) => {
					const { proName } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{proName.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Category",
				accessor: "proCategory",
				sortType: "basic",
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { _id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleProductView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleEditBtn(_id)}>
								<div className="w-8 h-8 rounded-md bg-primary  text-white grid items-center justify-center">
									<FiEdit className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeleteProduct(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
									<AiFillDelete className="text-lg  text-white" />
								</div>
							</button>
						</div>
					);
				},
			},
		];
	};

	return (
		<div>
			<div className="text-primary p-3">
				{products.length && (
					<Table
						columns={PRODUCTS_COLUMNS()}
						data={sortProducts}
						headline={"All Products"}
					/>
				)}
			</div>
		</div>
	);
};
