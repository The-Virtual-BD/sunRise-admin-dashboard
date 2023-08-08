import React, { useState } from "react";
import { useCollection } from "../../../actions/reducers";
import SunEditor from "suneditor-react";
import { useForm } from "react-hook-form";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsEyeFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

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
	const location = useLocation();
	const [workName, setWorkName] = useState("");
	const [workCategory, setWorkCategory] = useState("");
	const [workImg, setWorkImg] = useState(null);
	const [workDesc, setWorkDesc] = useState("");
	const [submitting, setSubmitting] = useState(false);

	//Handle work Add Form
	const handleWorkForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const workForm = new FormData();
			workForm.append("workName", workName);
			workForm.append("workCategory", workCategory);
			workForm.append("workImg", workImg);
			workForm.append("workDesc", workDesc);

			const url = `${baseURL}/work/create`;
			axios
				.post(url, workForm)
				.then((res) => {
					console.log(res);
					toast.success("Work Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Work Added Failed");
			setSubmitting(false);
		}

		location.reload();
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Work</h3>

					<form
						onSubmit={handleWorkForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									onChange={(e) => setWorkName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
									onChange={(e) => setWorkCategory(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								onChange={(e) => setWorkImg(e.target.files[0])}
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
									setWorkDesc(content);
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
							{submitting ? "Adding..." : "Add"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const ViewWork = () => {
	const { work, workLoading } = useCollection();
	const navigate = useNavigate();
	const location = useLocation();

	if (workLoading) {
		return <p>Loading...</p>;
	}

	if (!workLoading && work.length === 0) {
		return <p className="text-center text-lg">No Work Available</p>;
	}
	const sortWork = [...work].reverse();

	const handleProductView = (id) => {
		navigate(`/admin-dashboard/our-work/view/${id}`);
	};

	const handleEditBtn = (id) => {
		navigate(`/admin-dashboard/our-work/edit/${id}`);
	};

	//Handle Delete Post
	const handleDeleteProduct = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/work/${id}`)
				.then((response) => {
					// console.log(`Deleted post with ID ${id}`);
					toast.success("Deleted successfully!");
				})
				.catch((error) => {
					// console.error(error);
					toast.error("Deleted Failed!");
				});
		}
		location.reload();
	};

	const PRODUCTS_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Name",
				accessor: "workName",
				sortType: "basic",
				Cell: ({ row }) => {
					const { workName } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{workName.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Category",
				accessor: "workCategory",
				sortType: "basic",
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { _id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleProductView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleEditBtn(_id)}>
								<div className="w-8 h-8 rounded-md bg-primary  text-white grid items-center justify-center">
									<FiEdit className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeleteProduct(_id)}>
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
		<div>
			<div className="text-primary p-3">
				{work.length && (
					<Table
						columns={PRODUCTS_COLUMNS()}
						data={sortWork}
						headline={"All Works"}
					/>
				)}
			</div>
		</div>
	);
};
