import React from "react";

const OurWork = () => {
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<AddWork />
		</div>
	);
};

export default OurWork;

const AddWork = () => {
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Work</h3>

					<form className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full">

						<div className="form-control w-full  ">
							<input
								type="text"
								placeholder="Name"
								className="input  w-full  bg-bgclr"
							/>
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
