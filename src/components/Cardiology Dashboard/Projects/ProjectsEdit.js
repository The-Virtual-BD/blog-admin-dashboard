import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";

const ProjectEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});
	const [loading, setLoading] = useState(true);

	const [proNamE, setProName] = useState("");
	const [proCategorY, setProCategory] = useState("");
	const [proImG, setProImg] = useState("");
	const [proDesC, setProDesc] = useState("");

	const [oldMemberImgURL, setOldMemberImgURL] = useState("");
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		fetch(`${baseURL}/projects/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setProDesc(data.proDesc);
				setLoading(false);
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setProName(sinPro.proName);
			setProCategory(sinPro.proCategory);
			setOldMemberImgURL(sinPro.proImg);
		}
	}, [sinPro]);

	// console.log(sinPro);

	//Handle Product Add Form
	const handleProductUpdateForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const productForm = new FormData();
			productForm.append("proName", proNamE);
			productForm.append("proCategory", proCategorY);
			productForm.append("proDesc", proDesC);

			// Check if a new image is selected
			if (proImG) {
				productForm.append("proImg", proImG);
			} else {
				productForm.append("proImg", oldMemberImgURL);
			}

			const url = `${baseURL}/projects/${id}`;
			axios
				.put(url, productForm)
				.then((res) => {
					console.log(res);
					toast.success("Project Updated Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Project Updated Failed");
			setSubmitting(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Project</h3>

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
								<select
									className="select select-bordered w-full bg-bgclr"
									onChange={(e) => setProCategory(e.target.value)}
									value={proCategorY}
									required
								>
									<option disabled selected>
										Select Category
									</option>
									<option value={"current"}>Current Project</option>
									<option value={"past"}>Past Project</option>
								</select>
							</div>
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
								defaultValue={proDesC}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<div className="form-control w-full">
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setProImg(e.target.files[0])}
								className="file-input w-full bg-bgclr"
							/>

							{/* Show the old image */}
							{oldMemberImgURL && (
								<div className="w-60 min-h-40">
									<img
										src={`${baseURL}/${oldMemberImgURL}`}
										alt="Old Member Image"
										className="w-full  mt-4"
									/>
								</div>
							)}
						</div>

						<button
							type="submit"
							disabled={submitting}
							className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							{submitting ? "Updating..." : "Update"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ProjectEdit;
