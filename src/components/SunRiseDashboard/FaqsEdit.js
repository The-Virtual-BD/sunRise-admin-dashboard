import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { baseURL } from "../utilities/url";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FaqsEdit = () => {
	const { id } = useParams()
    const [sinFaq, setSinFaq] = useState({});

    const [faqAnswer, setFaqAnswer] = useState('');
    const [faqQuestion, setFaqQuestion] = useState('');
   

    //Update Value
    useEffect(() => {
        if (sinFaq) {
            setFaqAnswer(sinFaq.faqAns);
            setFaqQuestion(sinFaq.faqQus);
        }
    }, [sinFaq]);

    //Handle Get Carieer
    useEffect(() => {
        const url = `${baseURL}/faqs/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setSinFaq(data))
    }, [id]);


    // console.log(collection)


    //Handle Edit Collection Form
    const handleEditForm = async (e) => {
        e.preventDefault();
        const newValue = {faqAns: faqAnswer,faqQus:faqQuestion}

        try {
            const response = await axios.put(`${baseURL}/faqs/${id}`, newValue);
            console.log(response); 
            toast.success("Updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Update Failed!")
        };

    };


	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Faqs</h3>

					<form
						onSubmit={handleEditForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4"
					>
						<div className="form-control w-full ">
							<input
								type="text"
								placeholder="Enter Question"
								value={faqQuestion}
								onChange={(e)=>setFaqQuestion(e.target.value)}
								className="input  w-full  bg-bgclr"
							/>
						</div>

						<div className="form-control w-full ">
							<textarea
								className="textarea  w-full  bg-bgclr"
								placeholder="Enter Answer"
								value={faqAnswer}
								onChange={(e)=>setFaqAnswer(e.target.value)}
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
