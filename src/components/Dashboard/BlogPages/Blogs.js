import React, {  useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCheck2, BsEyeFill } from "react-icons/bs";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import { baseURL } from "../../utilities/url";
import { useCollection } from "../../../actions/reducers";
import SunEditor from "suneditor-react";
import axios from "axios";




const Blogs = () => {
	const { isViewBlogs } = useCollection();
	return <div>{isViewBlogs ? <AddBlogs /> : <ViewBlogs />}</div>;
};





const ViewBlogs = () => {
	const { news, newsLoading } = useCollection();
	const navigate = useNavigate();

	if (newsLoading) {
		return <p>Loading....</p>;
	};
	
	if (!newsLoading && news.length === 0) {
		return <p className="text-center text-lg">No News Available</p>;
	};

	const allBlogs = [...news]?.reverse() || "";

	const handleBlogView = (id) => {
		// console.log("clicked", id);
		navigate(`/admin-dashboard/news/${id}`);
	};

	//Handle Delete Post
	const handleDeletePost = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/news/${id}`)
				.then((response) => {
					// console.log(`Deleted post with ID ${id}`);
					toast.success("Deleted successfully!");
				})
				.catch((error) => {
					console.error(error);
					toast.error("Deleted Failed!");
				});
		}
	};

	// console.log(allBlogs)

	const BLOG_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Title",
				accessor: "newsTitle",
				sortType: "basic",
				Cell: ({ row }) => {
					const { newsTitle } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{newsTitle?.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Category",
				accessor: "newsCategory",
				sortType: "basic",
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { _id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleBlogView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeletePost(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
									<AiFillDelete className="text-lg  text-white" />
								</div>
							</button>
						</div>
					);
				},
			},
		];
	};

	return (
		<div className="text-primary p-3">
			{news.length && (
				<Table columns={BLOG_COLUMNS()} data={allBlogs} headline={"All News"} />
			)}
		</div>
	);
};






const AddBlogs = () => {
	const [newsTitle, setNewsTitle] = useState("");
	const [newsCategory, setNewsCategory] = useState("");
	const [newsImg, setNewsImg] = useState(null);
	const [newsDesc, setNewsDesc] = useState("");
	const [submitting, setSubmitting] = useState(false);

	//Handle News Add Form
	const handleNewsForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const newsForm = new FormData();
			newsForm.append("newsTitle", newsTitle);
			newsForm.append("newsCategory", newsCategory);
			newsForm.append("newsImg", newsImg);
			newsForm.append("newsDesc", newsDesc);

			const url = `${baseURL}/news/create`;
			axios
				.post(url, newsForm)
				.then((res) => {
					console.log(res);
					toast.success("News Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("News Added Failed");
			setSubmitting(false);
		}
	};

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
									onChange={(e) => setNewsTitle(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
									onChange={(e) => setNewsCategory(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								onChange={(e) => setNewsImg(e.target.files[0])}
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
									setNewsDesc(content);
								}}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<button
							disabled={submitting}
							type="submit"
							className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							{submitting ? "Submitting..." : "Submit"}
							
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Blogs;
