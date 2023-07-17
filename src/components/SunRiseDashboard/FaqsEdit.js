import React from "react";
import { useForm } from "react-hook-form";
import { baseURL } from "../utilities/url";
import axios from "axios";

const FaqsEdit = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	//Handle Form data
	const onSubmit = (data) => {
		/* try {
			console.log(data);
			const url = `${baseURL}/faqs/create`;
			axios
				.post(url, data)
				.then((res) => console.log(res))
				.catch((error) => console.log(error));
			reset();
		} catch {
			console.log("Data Post Failed");
		} */
	};
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Faqs</h3>

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
							Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default FaqsEdit;
