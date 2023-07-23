import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import moment from "moment";

const MessageDetails = () => {
	const { id } = useParams();
	const [sinMember, setSinMember] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/contact/${id}`)
			.then((res) => res.json())
			.then((data) => setSinMember(data));
	}, [id]);

	// console.log(sinMember);

	return (
		<div className="bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary">
			<div>
				<h2 className="text-2xl font-bold text-start my-3 px-4">View Query</h2>
				<hr className=" text-bgclr" />
			</div>

			<div className="flex flex-col lg:flex-row items-start justify-center gap-5 p-4">
				<div className="w-full ">
					<div className="flex flex-col items-start gap-3">
						<h3 className="text-start">
							<span className="font-bold"> Name: </span>
							{sinMember?.name}
						</h3>
						<p>
							<span className="font-bold"> Email: </span>
							{sinMember?.email}
						</p>
						<p>
							<span className="font-bold"> Phone: </span>
							{sinMember?.phone}
						</p>
						<p>
							<span className="font-bold"> Date: </span>
							{moment(sinMember?.cratedAt).format("MMM D, YYYY")}
						</p>
						<p>
							<span className="font-bold"> Details: </span>
							{sinMember?.msg}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageDetails;
