import React from "react";
import { useCollection } from "../../actions/reducers";

const Products = () => {
	const{isViewProducts}=useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{
				isViewProducts?<AddProduct />:<ViewProducts />
			}
			
		</div>
	);
};

export default Products;

const AddProduct = () => {
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Product</h3>

					<form className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full">
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input type="file" className="file-input  w-full bg-bgclr" />
						</div>

						<div className="form-control w-full ">
							<textarea
								className="textarea  w-full  bg-bgclr"
								placeholder="Descriptions"
							></textarea>
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


const ViewProducts=()=>{
	return(
		<div>
			View Products
		</div>
	)
}
