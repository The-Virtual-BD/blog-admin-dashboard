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

	const [titlE, setTitle] = useState("");
	const [artiImG, setProImg] = useState(null);
	const [datE, setDate] = useState("");
	const [proCategorY, setProCategory] = useState("");
	const [linK, setLink] = useState("");
	const [authorS, setAuthors] = useState("");
	const [desC, setProDesc] = useState("");
	const [articaleTypE, setArticaleType] = useState("");

	const [oldMemberImgURL, setOldMemberImgURL] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [isDate, setIsDate] = useState(false);

	useEffect(() => {
		fetch(`${baseURL}/articale/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setProDesc(data.desc);
				setLoading(false);
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setTitle(sinPro.title);
			setDate(sinPro.date);
			setArticaleType(sinPro.articaleType);
			setLink(sinPro.link);
			setProCategory(sinPro.proCategory);
			setAuthors(sinPro.authors);
			setOldMemberImgURL(sinPro.artiImg);
		}
	}, [sinPro]);

	// console.log(sinPro);

	//Handle Product Edit Form
	const handleProductUpdateForm = (e) => {
		e.preventDefault();
		setSubmitting(true);




		try {
			const productForm = new FormData();
			productForm.append("title", titlE);
			productForm.append("proCategory", proCategorY);
			productForm.append("date", datE);
			productForm.append("articaleType", articaleTypE);
			productForm.append("link", linK);
			productForm.append("authors", authorS);
			productForm.append("desc", desC);

			// Check if a new image is selected
			if (artiImG) {
				productForm.append("artiImg", artiImG);
			} else {
				productForm.append("artiImg", oldMemberImgURL);
			}

			const url = `${baseURL}/articale/${id}`;
			axios
				.put(url, productForm)
				.then((res) => {
					console.log(res);
					toast.success("Articale Updated Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Articale Updated Failed");
			setSubmitting(false);
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	};

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
							<div className="form-control w-full lg:w-1/2 ">
								<input
									type="text"
									placeholder="Title"
									value={titlE}
									onChange={(e) => setTitle(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full lg:w-1/2 ">
								<input
									type={`${isDate ? "date" : "text"}`}
									placeholder="Publication Date"
									value={datE}
									onChange={(e) => setDate(e.target.value)}
									onFocus={() => setIsDate(true)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>


						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full lg:w-1/2 ">
								<input
									type="text"
									placeholder="Download Link"
									value={linK}
									onChange={(e) => setLink(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full lg:w-1/2 ">
								<select
									className="select select-bordered w-full bg-bgclr"
									onChange={(e) => setProCategory(e.target.value)}
									value={proCategorY}
									required
								>
									<option disabled selected>
										Select Category
									</option>
									<option value={"research"}>Research Articale</option>
									<option value={"public"}>Publi Articale</option>
									<option value={"common"}>Common Articale</option>
								</select>

							</div>
						</div>


						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full lg:w-1/2 ">
								<input
									type="text"
									placeholder="Authors"
									value={authorS}
									onChange={(e) => setAuthors(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full lg:w-1/2 ">
								<select
									className="select select-bordered w-full bg-bgclr"
									onChange={(e) => setArticaleType(e.target.value)}
									value={articaleTypE}
									required
								>
									<option disabled selected>
										Select Type
									</option>
									<option value={"open"}>Open Access</option>
									<option value={"limited"}>Limited Access</option>
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
								defaultValue={desC}
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
