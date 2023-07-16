import React, { useState } from "react";
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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const [description, setDescription] = useState("");



	//Handle Form
	const onSubmit = (data) => {
		data.description = description;
		console.log(data);
		reset();
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Work</h3>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									{...register("workName", { required: true })}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
									{...register("workCategory", { required: true })}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								{...register("workImg", { required: true })}
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
									setDescription(content);
								}}
								required

								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
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
