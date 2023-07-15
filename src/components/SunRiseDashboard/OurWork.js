import React from "react";
import { useCollection } from "../../actions/reducers";
import SunEditor from "suneditor-react";
import { useForm } from "react-hook-form";

const OurWork = () => {
	const { isViewWork } = useCollection();

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{isViewWork ? <AddWork /> : <ViewWork />}
		</div>
	);
};

export default OurWork;

const AddWork = () => {
	const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = data => console.log(data);
  
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Work</h3>

					<form onSubmit={handleSubmit(onSubmit)} className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full">

						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									{...register("workName", { required: true })} required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
									{...register("workCategory", { required: true })} required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input
							 type="file" 
							 {...register("workImg", { required: true })} required
							 className="file-input  w-full bg-bgclr" />
						</div>

						

						<div className="w-full">
							<SunEditor
								lang="en"
								width="100%"
								height="100%"
								placeholder="Enter Description..."
								autoFocus={true}
								{...register("workDesc", { required: true })} required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; align-items:start; min-height:200px; background:#ECF0F1"
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

const ViewWork = () => {
	return <div>View Work</div>;
};
