import React, { useEffect, useState } from "react";
import { baseURL } from "../../utilities/url";
import { useParams } from "react-router-dom";

const OurWorkDetails = () => {
	const { id } = useParams();
	const [sinWork, setSinWork] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/work/${id}`)
			.then((res) => res.json())
			.then((data) => setSinWork(data));
	}, [id]);

	// console.log(sinWork);

	return (
		<div className="bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary">
			<div>
				<h2 className="text-2xl font-bold text-start my-3 px-4">
					View Work Details
				</h2>
				<hr className=" text-bgclr" />
			</div>

			<div className="flex flex-col lg:flex-row items-start justify-center gap-5 p-4">
				<div className="w-full lg:w-1/2">
					<div className="flex flex-col items-start gap-3">
						<h3 className="text-start">
							<span className="font-bold">Name:</span>
							{sinWork?.workName}
						</h3>
						<p>
							<span className="font-bold">Category: </span>
							{sinWork?.workCategory}
						</p>

						<div className="text-start">
							<h3 className="font-bold">Description:</h3>
							<div
								className="text-labelclr"
								dangerouslySetInnerHTML={{ __html: sinWork?.workDesc }}
							/>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/2">
					<img
						src={`${baseURL}/${sinWork?.workImg}`}
						alt={sinWork?.workName}
						srcSet=""
						className="h-full lg:h-[500px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default OurWorkDetails;
