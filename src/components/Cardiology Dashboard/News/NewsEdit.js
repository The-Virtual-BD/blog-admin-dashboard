import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import SunEditor from "suneditor-react";
import { useParams } from "react-router-dom";

const NewsEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});
	const [loading, setLoading] = useState(true);

	const [newsTitlE, setNewsTitle] = useState("");
	const [newsvdoLinK, setNewsLink] = useState("");
	const [newsDesC, setNewsDesc] = useState("");
	const [newsShDesC, setProShDesc] = useState("");
	const [submitting, setSubmitting] = useState(false);

	console.log(sinPro);

	// Get Single Publication
	useEffect(() => {
		fetch(`${baseURL}/news/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setSinPro(data);
				setNewsDesc(data.newsDesc);
				setLoading(false);
			});
	}, [id]);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setNewsTitle(sinPro.newsTitle);
			setNewsLink(sinPro.newsvdoLink);
			setProShDesc(sinPro.newsShDesc);
		}
	}, [sinPro]);

	//Handle News Update Form
	const handleNewsForm = (e) => {
		e.preventDefault();
		const updatedAt = new Date();
		const newsData = {
			newsTitle: newsTitlE,
			newsvdoLink: newsvdoLinK,
			newsDesc: newsDesC,
			newsShDesc: newsShDesC,
			updatedAt,
		};

		// console.log(newsData);
		setSubmitting(true);

		try {
			const url = `${baseURL}/news/${id}`;
			axios
				.put(url, newsData)
				.then((res) => {
					console.log(res);
					toast.success("News Updated Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("News Update Failed");
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
					<h3 className="px-3 text-2xl font-bold text-center">Edit News</h3>

					<form
						onSubmit={handleNewsForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Title"
                                    value={newsTitlE}
									onChange={(e) => setNewsTitle(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Video Link"
                                    value={newsvdoLinK}
									onChange={(e) => setNewsLink(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<textarea
								className="textarea w-full bg-bgclr"
								placeholder="Short Description"
                                value={newsShDesC}
								onChange={(e) => setProShDesc(e.target.value)}
							></textarea>
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
                                defaultValue={newsDesC}
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

export default NewsEdit;
