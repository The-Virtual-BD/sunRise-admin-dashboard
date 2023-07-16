import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsCheck2, BsEyeFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import Loading from "../../utilities/Loading";
import { baseURL } from "../../utilities/url";
import useToken from "../../utilities/useToken";
import { useCollection } from "../../../actions/reducers";
import SunEditor from "suneditor-react";
import { useForm } from "react-hook-form";

const Blogs = () => {
	const { isViewBlogs } = useCollection();
	return <div>{isViewBlogs ? <AddBlogs /> : <ViewBlogs />}</div>;
};

const ViewBlogs = () => {
	const [token] = useToken();
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();
	const allBlogs = [...blogs].reverse();
	const [isLoading, setIsLoading] = useState(false);

	//Handle Get posts
	useEffect(() => {
		const sUrl = `${baseURL}/api/admin/posts`;
		setIsLoading(true);

		fetch(sUrl, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setIsLoading(false);
				setBlogs(data.data);
			});
	}, [token]);

	const handleBlogView = (id) => {
		console.log("clicked", id);
		navigate(`/admin-dashboard/news/${id}`);
	};

	//Handle Delete Post
	const handleDeletePost = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			const userUrl = `${baseURL}/api/admin/posts/destroy/${id}`;
			fetch(userUrl, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					const remaining = blogs.filter((card) => card.id !== id);
					setBlogs(remaining);
					toast.success(data.message);
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
				Header: "Blogger Name",
				accessor: "author.first_name",
				sortType: "basic",
				Cell: ({ row }) => {
					console.log(row);
					const { id, first_name } = row.original.author;
					return (
						<>
							<Link to={`/admin-dashboard/user-managment/${id}`}>
								{first_name}
							</Link>
						</>
					);
				},
			},
			{
				Header: "Blog Title",
				accessor: "title",
				sortType: "basic",
				Cell: ({ row }) => {
					const { title } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{title.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Category Name",
				accessor: "category.name",
				sortType: "basic",
			},
			{
				Header: "Status",
				accessor: "status",
				sortType: "basic",
				Cell: ({ row }) => {
					const { status } = row.original;
					console.log(status);
					return (
						<div className="flex items-center justify-center  gap-2 text-sm">
							{status == "2" ? (
								<p className="bg-white px-2 py-[2px] rounded-full border border-green-500 text-xs text-green-500">
									{" "}
									Approved
								</p>
							) : status == "3" ? (
								<p className="bg-white  px-2 py-[2px] rounded-full border text-xs  border-red-500  text-red-500">
									Declined
								</p>
							) : (
								<p className="bg-white  px-2 py-[2px] rounded-full border text-xs  border-yellow-500  text-yellow-500">
									Pending
								</p>
							)}
						</div>
					);
				},
			},

			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleBlogView(id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeletePost(id)}>
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

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div className="text-primary p-3">
			{blogs.length && (
				<Table
					columns={BLOG_COLUMNS()}
					data={allBlogs}
					headline={"All Blogs"}
				/>
			)}
		</div>
	);
};

const AddBlogs = () => {
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
					<h3 className="px-3 text-2xl font-bold text-center">Add News</h3>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Title"
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

export default Blogs;
