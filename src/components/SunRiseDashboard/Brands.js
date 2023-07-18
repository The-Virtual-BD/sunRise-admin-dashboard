import React, { useState } from "react";
import { useCollection } from "../../actions/reducers";
import { useForm } from "react-hook-form";
import { baseURL } from "../utilities/url";
import axios from "axios";

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

		const brandForm = new FormData();
		brandForm.append("brandName", name);
		brandForm.append("brandImg", img);

		const url = `${baseURL}/brand/create`;
		axios
			.post(url, brandForm)
			.then((res) => console.log(res))
			.catch((error) => console.log(error));
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
	};

	console.log(brands)

	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-5 p-4">
			{brands.map((brand) => (
				<div key={brand._id}>
					  <img src={`${baseURL}/${brand?.brandImg}`} alt="" />
					<h2>{brand.brandName}</h2>
				</div>
			))}
		</div>
	);
};
