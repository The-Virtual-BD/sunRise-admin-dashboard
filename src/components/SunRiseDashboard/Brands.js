import React, { useState } from "react";
import { useCollection } from "../../actions/reducers";
import { useForm } from "react-hook-form";
import { baseURL } from "../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const Brands = () => {
	const { isViewBrand } = useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{isViewBrand ? <AddBrand /> : <ViewBrand />}
		</div>
	);
};

export default Brands;

const AddBrand = () => {
	const [name, setName] = useState("");
	const [img, setImg] = useState(null);

	//Handle Add Brand Form
	const handleBrandAddForm = (e) => {
		e.preventDefault();

		try {
			const brandForm = new FormData();
			brandForm.append("brandName", name);
			brandForm.append("brandImg", img);

			const url = `${baseURL}/brand/create`;
			axios
				.post(url, brandForm)
				.then((res) => {
					console.log(res);
					toast.success("Brand Added Successfully");
					e.target.reset();
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Brand Added Failed");
		}
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Brand</h3>

					<form
						onSubmit={handleBrandAddForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4"
					>
						<div className="form-control w-full ">
							<input
								type="text"
								placeholder="Brand Name"
								onChange={(e) => setName(e.target.value)}
								required
								className="input  w-full  bg-bgclr"
							/>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								accept=".png, .jpg, .jpeg, .svg"
								onChange={(e) => setImg(e.target.files[0])}
								required
								className="file-input  w-full bg-bgclr"
							/>
						</div>

						<button
							type="submit"
							className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							Add
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const ViewBrand = () => {
	const { brands, brandLoading } = useCollection();
	if (brandLoading) {
		return <p>Loading...</p>;
	}

	// console.log(brands);

	//Handle Delete Btn
	const handleDeleteBtn = (id) => {
		const procced = window.confirm("You want to delete?");
		if (procced) {
			axios
				.delete(`${baseURL}/brand/${id}`)
				.then((response) => {
					// console.log(`Deleted post with ID ${id}`);
					toast.success("Deleted successfully!");
				})
				.catch((error) => {
					// console.error(error);
					toast.error("Deleted Failed!");
				});
		}
	};

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-4">
			{brands?.map((brand) => (
				<div key={brand._id} className="bg-white rounded-md shadow-md">
					<img
						src={`${baseURL}/${brand?.brandImg}`}
						alt={brand?.brandName}
						className="w-full min-h-[250px] rounded-t-md"
					/>
					<div className="flex items-center justify-between p-5">
						<h2 className="text-xl ">{brand?.brandName}</h2>
						<div>
							<div className="flex items-center justify-center  gap-2 ">
								{/* <button>
									<div className="w-8 h-8 rounded-md bg-[#00A388]  text-white grid items-center justify-center">
										<FiEdit className="text-lg " />
									</div>
								</button> */}

								<button onClick={() => handleDeleteBtn(brand?._id)}>
									<div className="w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
										<AiFillDelete className="text-lg  text-white" />
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
