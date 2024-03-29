import React, { useState } from "react";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BsEyeFill } from "react-icons/bs";
import { useCollection } from "../../../actions/reducers";
import Table from "../../SharedPage/Table";
import moment from "moment";
import { FiEdit } from "react-icons/fi";

const Publications = () => {
	const { isViewPubli } = useCollection();
	return <div>{isViewPubli ? <AddPublication /> : <ViewPublication />}</div>;
};

export default Publications;

const AddPublication = () => {
	const location = useLocation();
	const [publiCategory, setPubliCategory] = useState("");
	const [publicationsLink, setNewsLink] = useState("");
	const [publicationsDesc, setNewsDesc] = useState("");

	const [descriptionError, setDescriptionError] = useState("");
	const [cateError, setCateError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	//Handle News Add Form
	const handleNewsForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		// Validate description field

		if (!publiCategory) {
			setCateError("*Category is required.");
			setSubmitting(false);
			return;
		}
		
		if (!publicationsDesc) {
			setDescriptionError("*Description is required.");
			setSubmitting(false);
			return;
		}

	

		const newsData = {
			publiCategory,
			publicationsLink,
			publicationsDesc,
		};

		try {
			const url = `${baseURL}/publications/create`;
			axios
				.post(url, newsData)
				.then((res) => {
					console.log(res);
					toast.success("publication Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("publication Added Failed");
			setSubmitting(false);
		}
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">
						Add Publication
					</h3>

					<form
						onSubmit={handleNewsForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="form-control w-full  ">
							<select
								required
								className="select select-bordered w-full bg-bgclr"
								onChange={(e) => setPubliCategory(e.target.value)}
							>
								<option disabled selected>
									Select Category
								</option>
								<option value={"conference"}> Conference Article</option>
								<option value={"journal"}> Journal Article</option>
							</select>
							{cateError && (
								<p className="text-red-500 text-sm text-start">{cateError}</p>
							)}
						</div>

						<div className="form-control w-full  ">
							<input
								type="text"
								placeholder="Publication Link"
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

const ViewPublication = () => {
	const { publications, publicationsLoading } = useCollection();
	const navigate = useNavigate();
	const location = useLocation();

	if (publicationsLoading) {
		return <p>Loading....</p>;
	}

	if (!publicationsLoading && publications.length === 0) {
		return <p className="text-center text-lg">No News Available</p>;
	}

	const allBlogs = [...publications]?.reverse() || "";

	const handlePublicationsView = (id) => {
		navigate(`/admin-dashboard/publications/view/${id}`);
	};

	const handlePublicationsEdit = (id) => {
		navigate(`/admin-dashboard/publications/edit/${id}`);
	};

	//Handle Delete Post
	const handleDeletePost = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/publications/${id}`)
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

	// console.log(allBlogs);

	const BLOG_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Title",
				accessor: "publicationsDesc",
				sortType: "basic",
				Cell: ({ row }) => {
					const { publicationsDesc } = row.original;
					const slicedDesc = publicationsDesc?.slice(0, 50);
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<div
								className=""
								dangerouslySetInnerHTML={{
									__html: slicedDesc,
								}}
							/>
						</div>
					);
				},
			},
			{
				Header: "Category",
				accessor: "publiCategory",
				sortType: "basic",
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
							<button onClick={() => handlePublicationsView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handlePublicationsEdit(_id)}>
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
			{publications.length && (
				<Table
					columns={BLOG_COLUMNS()}
					data={allBlogs}
					headline={"All Publication"}
				/>
			)}
		</div>
	);
};
