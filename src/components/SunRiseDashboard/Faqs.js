import React, { useEffect, useState } from "react";
import { useCollection } from "../../actions/reducers";

const Faqs = () => {
	const{isViewFaqs}=useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{
				isViewFaqs? <AddFaq />: <ViewFaqs /> 
			}
			
		</div>
	);
};

export default Faqs;

const AddFaq = () => {
	const [faqQus, setFaqQus] = useState("");
	const [faqAns, setFaqAns] = useState("");

	const handleFAQForm = (e) => {
		e.preventDefault();
		console.log(faqQus, faqAns);
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Faqs</h3>

					<form className="p-3 flex flex-col items-center justify-center mt-10 gap-4">
						<div className="form-control w-full ">
							<input
								type="text"
								placeholder="Enter Question"
								className="input  w-full  bg-bgclr"
							/>
						</div>

						<div className="form-control w-full ">
							<textarea
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
	const [faqs, setFaqs] = useState([]);
	useEffect(() => {
		fetch("/faqs.json")
			.then((res) => res.json())
			.then((data) => setFaqs(data));
	}, []);

	return (
		<div className="text-primary p-3">
			<div className="bg-bgclr w-full px-10  rounded-lg mt-2 py-6">
				<h2 className="text-2xl text-start font-semibold mb-5">All FAQS</h2>
				<div className="grid gap-5">
					{faqs.map((faq) => (
						<AccordionCard key={faq._id} faq={faq} />
					))}
				</div>
			</div>
		</div>
	);
};

const AccordionCard = ({ faq }) => {
	const { _id, faqQus, faqAns, status } = faq;
	return (
		<div className="accordion">
			<div className="accordion-item bg-white border border-gray-200">
				<h2 className="accordion-header mb-0" id={`heading${_id}`}>
					<button
						className="
                    accordion-button
                    relative
                    flex
                    items-center
                    w-full
                    py-4
                    px-5
                    text-base text-gray-800 text-left
                    bg-white
                    border-0
                    rounded-none
                    transition
                    focus:outline-none
                    "
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={`#collapse${_id}`}
						aria-expanded="true"
						aria-controls={`collapse${_id}`}
					>
						{faqQus}
					</button>
				</h2>

				<div
					id={`collapse${_id}`}
					className="accordion-collapse collapse "
					aria-labelledby={`heading${_id}`}
				>
					<div className="accordion-body py-4 px-5 text-left">{faqAns}</div>
				</div>
			</div>
		</div>
	);
};
