import React from "react";
import { useCollection } from "../../actions/reducers";
import { useForm } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../utilities/url";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Faqs = () => {
	const { isViewFaqs } = useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{isViewFaqs ? <AddFaq /> : <ViewFaqs />}
		</div>
	);
};

export default Faqs;

const AddFaq = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	//Handle Form data
	const onSubmit = (data) => {
		try {
			console.log(data);
			const url = `${baseURL}/faqs/create`;
			axios
				.post(url, data)
				.then((res) => console.log(res))
				.catch((error) => console.log(error));
			reset();
		} catch {
			console.log("Data Post Failed");
		}
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Faqs</h3>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4"
					>
						<div className="form-control w-full ">
							<input
								type="text"
								placeholder="Enter Question"
								{...register("faqQus", { required: true })}
								required
								className="input  w-full  bg-bgclr"
							/>
						</div>

						<div className="form-control w-full ">
							<textarea
								{...register("faqAns", { required: true })}
								required
								className="textarea  w-full  bg-bgclr"
								placeholder="Enter Answer"
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

const ViewFaqs = () => {
	const { faqs, faqLoading } = useCollection();
	const navigate=useNavigate();

	if (faqLoading) {
		return <p>Loading...</p>;
	}


	//Handle Delete Btn
	const handleDeleteBtn = (id) => {
		const procced = window.confirm('You want to delete?');
        if (procced) {
            axios.delete(`${baseURL}/faqs/${id}`)
                .then(response => {
                    console.log(`Deleted post with ID ${id}`);
                    toast.success("Deleted successfully!");

                })
                .catch(error => {
                    console.error(error);
                    toast.error("Deleted Failed!");
                });
        };
	};

	//Handle Edit Btn
	const handleEditBtn=(id)=>{
		navigate(`/admin-dashboard/faqs/${id}`)
	};

	return (
		<div className="text-primary p-3">
			{faqs.map((faqs) => (
				<div key={faqs._id} className="flex items-center gap-5 ">
					<div className="collapse collapse-arrow bg-white mb-3">
						<input type="checkbox" name="my-accordion-2" />
						<div className="collapse-title font-medium ">{faqs?.faqQus}</div>
						<div className="collapse-content">
							<p>{faqs?.faqAns}</p>
						</div>
					</div>

					<div className="flex items-center justify-center  gap-2 ">
						<button  onClick={() => handleEditBtn(faqs._id)}>
							<div className="w-12 h-12 rounded-md bg-[#00A388]  text-white grid items-center justify-center">
								<FiEdit className="text-xl " />
							</div>
						</button>

						<button onClick={() => handleDeleteBtn(faqs._id)}>
							<div className="w-12 h-12 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
								<AiFillDelete className="text-xl  text-white" />
							</div>
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
