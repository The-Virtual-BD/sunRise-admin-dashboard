import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";

const ProductDetails = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/products/${id}`)
			.then((res) => res.json())
			.then((data) => setSinPro(data));
	}, [id]);

	console.log(sinPro);

	return (
		<div className="p-4 min-h-screen text-primary">
			<div className="flex flex-col lg:flex-row items-start justify-between gap-4">
				<div className="w-full lg:w-1/2 text-start py-4">
					<h2>
						<span className="font-bold">Name:</span> {sinPro?.proName}
					</h2>
					<h4>
						<span className="font-bold">Category:</span> {sinPro?.proCategory}
					</h4>
					<div>
						<h2 className="font-bold">Descriptions:</h2>
						<div
							className="text-primary"
							dangerouslySetInnerHTML={{ __html: sinPro?.proDesc }}
						/>
					</div>
				</div>

				<div className="w-full lg:w-1/2">
					<img
						src={`${baseURL}/${sinPro?.proImg}`}
						alt={sinPro?.proName}
						className="  "
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
