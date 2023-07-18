import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";

const ProductsEdit = () => {
	const { id } = useParams();
    const [sinPro, setSinPro] = useState({});

    const [proNamE, setProName] = useState("");
	const [proCategorY, setProCategory] = useState("");
	const [proImG, setProImg] = useState("");
	const [proDesC, setProDesc] = useState("");


    //Update Value
	useEffect(() => {
		if (sinPro) {
			setProName(sinPro.proName);
			setProCategory(sinPro.proCategory);
			setProImg(sinPro.proImg);
			setProDesc(sinPro.proDesc);
		}
	}, [sinPro]);


    useEffect(() => {
		fetch(`${baseURL}/products/${id}`)
			.then((res) => res.json())
			.then((data) => setSinPro(data));
	}, [id]);


	//Handle Product Add Form
	const handleProductUpdateForm = (e) => {
		e.preventDefault();

		try {
			const productForm = new FormData();
			productForm.append("proName", proNamE);
			productForm.append("proCategory", proCategorY);
			productForm.append("proImg", proImG);
			productForm.append("proDesc", proDesC);

			const url = `${baseURL}/products/${id}`;
			axios
				.put(url, productForm)
				.then((res) => {
					console.log(res);
					toast.success("Products Updated Successfully");
					e.target.reset();
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Products Updated Failed");
		}
	};




	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Product</h3>

					<form
						onSubmit={handleProductUpdateForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
                                    value={proNamE}
									onChange={(e) => setProName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Category"
                                    value={proCategorY}
									onChange={(e) => setProCategory(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								onChange={(e) => setProImg(e.target.files[0])}
                                // value={proCategorY}
								// required
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
									setProDesc(content);
								}}
                                setContents={proDesC}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
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

export default ProductsEdit;
