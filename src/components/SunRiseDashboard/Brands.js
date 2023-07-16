import React from "react";
import { useCollection } from "../../actions/reducers";

const Brands = () => {
	const{isViewBrand}=useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{
				isViewBrand? <AddBrand />: <ViewBrand />
			}
			
		</div>
	);
};

export default Brands;


const AddBrand=()=>{
	return(
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Brand</h3>

					<form className="p-3 flex flex-col items-center justify-center mt-10 gap-4">
						<div className="form-control w-full ">
							<input
								type="text"
								placeholder="Brand Name"
								className="input  w-full  bg-bgclr"
							/>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
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
	)
};

const ViewBrand=()=>{
	return(
		<div>
			ViewBrand
		</div>
	)
}
