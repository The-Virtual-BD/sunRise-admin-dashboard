import React, { useEffect, useState } from "react";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";

const BlogEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});
	const [loading, setLoading] = useState(true);

	const [newsTitlE, setNewsTitle] = useState("");
	const [newsCategorY, setNewsCategory] = useState("");
	const [newsImG, setNewsImg] = useState(null);
	const [newsDesC, setNewsDesc] = useState("");

	const [oldMemberImgURL, setOldMemberImgURL] = useState("");
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		fetch(`${baseURL}/news/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setNewsDesc(data.newsDesc);
				setLoading(false);
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setNewsTitle(sinPro.newsTitle);
			setNewsCategory(sinPro.newsCategory);
			setOldMemberImgURL(sinPro.newsImg);
		}
	}, [sinPro]);

	//Handle News Add Form
	const handleNewsForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const newsForm = new FormData();
			newsForm.append("newsTitle", newsTitlE);
			newsForm.append("newsCategory", newsCategorY);
			newsForm.append("newsDesc", newsDesC);

			// Check if a new image is selected
			if (newsImG) {
				newsForm.append("newsImg", newsImG);
			} else {
				newsForm.append("newsImg", oldMemberImgURL);
			}

			const url = `${baseURL}/news/${id}`;
			axios
				.put(url, newsForm)
				.then((res) => {
					console.log(res);
					toast.success("News Updated Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("News Update Failed");
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
					<h3 className="px-3 text-2xl font-bold text-center">Add News</h3>

					<form
						onSubmit={handleNewsForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Title"
									value={newsTitlE}
									onChange={(e) => setNewsTitle(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									value={newsCategorY}
									placeholder="Category"
									onChange={(e) => setNewsCategory(e.target.value)}
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
									setNewsDesc(content);
								}}
								defaultValue={newsDesC}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<div className="form-control w-full">
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setNewsImg(e.target.files[0])}
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

export default BlogEdit;
