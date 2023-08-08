import React, { useEffect, useState } from "react";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import { useParams } from "react-router-dom";

const WorkEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});
	const [loading, setLoading] = useState(true);

	const [workNamE, setWorkName] = useState("");
	const [workCategorY, setWorkCategory] = useState("");
	const [workImG, setWorkImg] = useState(null);
	const [workDesC, setWorkDesc] = useState("");

	const [submitting, setSubmitting] = useState(false);
	const [oldMemberImgURL, setOldMemberImgURL] = useState("");

	useEffect(() => {
		fetch(`${baseURL}/work/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setWorkDesc(data.workDesc);
				setLoading(false);
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setWorkName(sinPro.workName);
			setWorkCategory(sinPro.workCategory);
			setOldMemberImgURL(sinPro.workImg);
		}
	}, [sinPro]);

	//Handle work Add Form
	const handleWorkForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const workForm = new FormData();
			workForm.append("workName", workNamE);
			workForm.append("workCategory", workCategorY);
			workForm.append("workDesc", workDesC);

			// Check if a new image is selected
			if (workImG) {
				workForm.append("workImg", workImG);
			} else {
				workForm.append("workImg", oldMemberImgURL);
			}

			const url = `${baseURL}/work/${id}`;
			axios
				.put(url, workForm)
				.then((res) => {
					console.log(res);
					toast.success("Work Updated Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Work Update Failed");
			setSubmitting(false);
		}
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Work</h3>

					<form
						onSubmit={handleWorkForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									value={workNamE}
									onChange={(e) => setWorkName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									value={workCategorY}
									placeholder="Category"
									onChange={(e) => setWorkCategory(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
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
									setWorkDesc(content);
								}}
								defaultValue={workDesC}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<div className="form-control w-full">
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setWorkImg(e.target.files[0])}
								className="file-input w-full bg-bgclr"
							/>

							{/* Show the old image */}
							{oldMemberImgURL && (
								<div className="w-60 min-h-40">
									<img
										src={`${baseURL}/${oldMemberImgURL}`}
										alt="Old project"
										className="w-full  mt-4"
									/>
								</div>
							)}
						</div>

						<button
							disabled={submitting}
							type="submit"
							className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							{submitting ? "Updating..." : "Update"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default WorkEdit;
