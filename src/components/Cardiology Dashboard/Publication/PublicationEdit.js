import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import { baseURL } from "../../utilities/url";
import axios from "axios";

const PublicationEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});
	const [loading, setLoading] = useState(true);

	const [publiCategorY, setPubliCategory] = useState("");
	const [publicationsLinK, setNewsLink] = useState("");
	const [publicationsDesC, setNewsDesc] = useState("");
	const [submitting, setSubmitting] = useState(false);

	// console.log(sinPro);

	// Get Single Publication
	useEffect(() => {
		fetch(`${baseURL}/publications/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setNewsDesc(data.publicationsDesc);
				setLoading(false); 
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setPubliCategory(sinPro.publiCategory);
			setNewsLink(sinPro.publicationsLink);
		}
	}, [sinPro]);

	//Handle Update Form
	const handleNewsForm = (e) => {
		e.preventDefault();
		setSubmitting(true);
		const updatedAt = new Date();
		const newsData = {
			publiCategory: publiCategorY,
			publicationsLink: publicationsLinK,
			publicationsDesc: publicationsDesC,
			updatedAt,
		};

		try {
			const url = `${baseURL}/publications/${id}`;
			axios
				.put(url, newsData)
				.then((res) => {
					console.log(res);
					toast.success("publication Update Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("publication Update Failed");
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
					<h3 className="px-3 text-2xl font-bold text-center">
						Edit Publication
					</h3>

					<form
						onSubmit={handleNewsForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="form-control w-full  ">
							<select
								className="select select-bordered w-full bg-bgclr"
								onChange={(e) => setPubliCategory(e.target.value)}
								value={publiCategorY}
							>
								<option disabled selected>
									Select Category
								</option>
								<option value={"conference"}> Conference Article</option>
								<option value={"journal"}> Journal Article</option>
							</select>
						</div>

						<div className="form-control w-full  ">
							<input
								type="text"
								placeholder="Publication Link"
								value={publicationsLinK}
								onChange={(e) => setNewsLink(e.target.value)}
								required
								className="input  w-full  bg-bgclr"
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
										
									],
								}}
								lang="en"
								width="100%"
								height="100%"
								placeholder="Enter Description..."
								autoFocus={true}
								onChange={(content) => {
									setNewsDesc(content);
								}}
								defaultValue={publicationsDesC}
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
						</div>

						<button
							disabled={submitting}
							type="submit"
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

export default PublicationEdit;
