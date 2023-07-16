import React from "react";
import SunEditor from "suneditor-react";
import { useCollection } from "../../actions/reducers";

const Teams = () => {
	const { isViewTeam } = useCollection();
	return <div>{isViewTeam ? <AddTeam /> : <ViewTeam />}</div>;
};

export default Teams;

const AddTeam = () => {
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Member</h3>

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
									placeholder="Designation"
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input type="file" className="file-input  w-full bg-bgclr" />
						</div>

						{/* <div className="form-control w-full ">
							<textarea
								className="textarea  w-full  bg-bgclr"
								placeholder="Descriptions"
							></textarea>
						</div> */}

						<div className="w-full">
							<SunEditor
								lang="en"
								width="100%"
								height="100%"
								placeholder="Enter Description..."
								autoFocus={true}
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

const ViewTeam = () => {
	return <div>View Team</div>;
};
