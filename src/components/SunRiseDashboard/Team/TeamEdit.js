import React, { useEffect, useState } from "react";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";

const TeamEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});
	const [loading, setLoading] = useState(true);

	const [memberNamE, setMemberName] = useState("");
	const [memberDesI, setMemberDesi] = useState("");
	const [memberImG, setMemberImg] = useState(null);
	const [memberDesC, setMemberDesc] = useState("");

	const [submitting, setSubmitting] = useState(false);
	const [oldMemberImgURL, setOldMemberImgURL] = useState("");

	useEffect(() => {
		fetch(`${baseURL}/team/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setMemberDesc(data.memberDesc);
				setLoading(false);
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setMemberName(sinPro.memberName);
			setMemberDesi(sinPro.memberDesi);
			setOldMemberImgURL(sinPro.memberImg);
		}
	}, [sinPro]);

	//Handle Member Update Form
	const handleTeamForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const memberForm = new FormData();
			memberForm.append("memberName", memberNamE);
			memberForm.append("memberDesi", memberDesI);
			// memberForm.append("memberImg", memberImg);
			memberForm.append("memberDesc", memberDesC);

			// Check if a new image is selected
			if (memberImG) {
				memberForm.append("memberImg", memberImG);
			} else {
				memberForm.append("memberImg", oldMemberImgURL);
			}

			const url = `${baseURL}/team/${id}`;
			axios
				.put(url, memberForm)
				.then((res) => {
					console.log(res);
					toast.success("Member Updated Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Member Update Failed");
			setSubmitting(false);
		}
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Member</h3>

					<form
						onSubmit={handleTeamForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									value={memberNamE}
									onChange={(e) => setMemberName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									value={memberDesI}
									placeholder="Designation"
									onChange={(e) => setMemberDesi(e.target.value)}
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
									],
								}}
								lang="en"
								width="100%"
								height="100%"
								placeholder="Enter Description..."
								autoFocus={true}
								onChange={(content) => {
									setMemberDesc(content);
								}}
								defaultValue={memberDesC}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<div className="form-control w-full">
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setMemberImg(e.target.files[0])}
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

export default TeamEdit;
