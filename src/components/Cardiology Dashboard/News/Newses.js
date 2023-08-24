import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import { baseURL } from "../../utilities/url";
import { useCollection } from "../../../actions/reducers";
import SunEditor from "suneditor-react";
import axios from "axios";
import moment from "moment";
import { FiEdit } from "react-icons/fi";

const Newses = () => {
	const { isViewBlogs } = useCollection();
	return <div>{isViewBlogs ? <AddNews /> : <ViewBlogs />}</div>;
};

export default Newses;

const ViewBlogs = () => {
	const { news, newsLoading } = useCollection();
	const navigate = useNavigate();
	const location = useLocation();

	if (newsLoading) {
		return <p>Loading....</p>;
	}

	if (!newsLoading && news.length === 0) {
		return <p className="text-center text-lg">No News Available</p>;
	}

	const allBlogs = [...news]?.reverse() || "";

	//Handle News View
	const handleBlogView = (id) => {
		navigate(`/admin-dashboard/news/view/${id}`);
	};

	//Handle News Edit
	const handleBlogEdit = (id) => {
		navigate(`/admin-dashboard/news/edit/${id}`);
	};

	//Handle Delete Post
	const handleDeletePost = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/news/${id}`)
				.then((response) => {
					// console.log(`Deleted post with ID ${id}`);
					toast.success("Deleted successfully!");
				})
				.catch((error) => {
					console.error(error);
					toast.error("Deleted Failed!");
				});
		}
		location.reload();
	};

	// console.log(allBlogs)

	const BLOG_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Title",
				accessor: "newsTitle",
				sortType: "basic",
				Cell: ({ row }) => {
					const { newsTitle } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{newsTitle?.slice(0, 30)}
						</div>
					);
				},
			},
			{
				Header: "Posted Date",
				accessor: "createdAt",
				sortType: "basic",
				Cell: ({ row }) => {
					const { createdAt } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{moment(createdAt).format("MMM D, YYYY")}
						</div>
					);
				},
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { _id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleBlogView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleBlogEdit(_id)}>
								<div className="w-8 h-8 rounded-md bg-primary  text-white grid items-center justify-center">
									<FiEdit className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeletePost(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
									<AiFillDelete className="text-lg  text-white" />
								</div>
							</button>
						</div>
					);
				},
			},
		];
	};

	return (
		<div className="text-primary p-3">
			{news.length && (
				<Table columns={BLOG_COLUMNS()} data={allBlogs} headline={"All News"} />
			)}
		</div>
	);
};

const AddNews = () => {
	const location = useLocation();

	const [newsTitle, setNewsTitle] = useState("");
	const [newsvdoLink, setNewsLink] = useState("");
	const [newsDesc, setNewsDesc] = useState("");
	const [newsShDesc, setProShDesc] = useState("");

	const [submitting, setSubmitting] = useState(false);
	const [descriptionError, setDescriptionError] = useState("");

	//Handle News Add Form
	const handleNewsForm = (e) => {
		e.preventDefault();

		if (!newsDesc) {
			setDescriptionError("*Description is required.");
			setSubmitting(false);
			return;
		}

		const createdAt = new Date();
		const newsData = {
			newsTitle,
			newsvdoLink,
			newsDesc,
			newsShDesc,
			createdAt,
		};

		// console.log(newsData);
		setSubmitting(true);

		try {
			const url = `${baseURL}/news/create`;
			axios
				.post(url, newsData)
				.then((res) => {
					console.log(res);
					toast.success("News Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("News Added Failed");
			setSubmitting(false);
		}

		location.reload();
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add News</h3>

					<form
						onSubmit={handleNewsForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Title"
									onChange={(e) => setNewsTitle(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Video Link"
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
								required
								setDefaultStyle="font-family: 'Open Sans', sans-serif; font-size: 14px; text-align:start; min-height:200px; background:#ECF0F1"
							/>
							{descriptionError && (
								<p className="text-red-500 text-sm text-start">
									{descriptionError}
								</p>
							)}
						</div>

						<button
							disabled={submitting}
							type="submit"
							className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg "
						>
							{submitting ? "Submitting..." : "Submit"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
