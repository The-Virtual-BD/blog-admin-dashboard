import React, { useState } from "react";
import { useCollection } from "../../../actions/reducers";
import SunEditor from "suneditor-react";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import moment from "moment";

const Projects = () => {
	const { isViewProducts } = useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{isViewProducts ? <AddProjects /> : <ViewProjects />}
		</div>
	);
};

export default Projects;

const AddProjects = () => {
	const location = useLocation();

	const [title, setTitle] = useState("");
	const [artiImg, setProImg] = useState(null);
	const [date, setDate] = useState("");
	const [proCategory, setProCategory] = useState("");
	const [link, setLink] = useState("");
	const [authors, setAuthors] = useState("");
	const [desc, setProDesc] = useState("");
	const [articaleType, setArticaleType] = useState("");

	const [descriptionError, setDescriptionError] = useState("");
	const [cateError, setCateError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const [isDate, setIsDate] = useState(false);



	//Handle Project Add Form
	const handleprojectForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		// Validate description field

		if (!proCategory) {
			toast.error("Select Category Type");
			setSubmitting(false);
			return;
		}
		if (!articaleType) {
			toast.error("Select Articale Type");
			setSubmitting(false);
			return;
		}

		if (!desc) {
			setDescriptionError("*Description is required.");
			setSubmitting(false);
			return;
		}

		try {
			const projectForm = new FormData();
			projectForm.append("title", title);
			projectForm.append("proCategory", proCategory);
			projectForm.append("artiImg", artiImg);
			projectForm.append("date", date);
			projectForm.append("link", link);
			projectForm.append("authors", authors);
			projectForm.append("articaleType", articaleType);
			projectForm.append("desc", desc);

			const url = `${baseURL}/articale/create`;
			axios
				.post(url, projectForm)
				.then((res) => {
					console.log(res);
					toast.success("Articale Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Articale Added Failed");
			setSubmitting(false);
		}

		location.reload();
	};

	// console.log(submitting);

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Project</h3>

					<form
						onSubmit={handleprojectForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>


						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full lg:w-1/2 ">
								<input
									type="text"
									placeholder="Title"
									onChange={(e) => setTitle(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full lg:w-1/2 ">
								<input
									type={`${isDate ? "date" : "text"}`}
									placeholder="Publication Date"
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
									onChange={(e) => setLink(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full lg:w-1/2 ">
								<select
									className="select select-bordered w-full bg-bgclr"
									onChange={(e) => setProCategory(e.target.value)}
									required
								>
									<option disabled selected>
										Select Category
									</option>
									<option value={"research"}>Research Articale</option>
									<option value={"public"}>Publi Articale</option>
									<option value={"common"}>Common Articale</option>
								</select>
								{cateError && (
									<p className="text-red-500 text-sm text-start">{cateError}</p>
								)}
							</div>
						</div>


						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full lg:w-1/2 ">
								<input
									type="text"
									placeholder="Authors"
									onChange={(e) => setAuthors(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full lg:w-1/2 ">
								<select
									className="select select-bordered w-full bg-bgclr"
									onChange={(e) => setArticaleType(e.target.value)}
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





						<div className="form-control w-full  ">
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setProImg(e.target.files[0])}
								required
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
							{submitting ? "Adding..." : "Add"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const ViewProjects = () => {
	const { products, productsLoading } = useCollection();
	const navigate = useNavigate();
	const location = useLocation();

	if (productsLoading) {
		return <p>Loading...</p>;
	}

	if (!productsLoading && products?.length === 0) {
		return <p className="text-center text-lg">No Articale Available</p>;
	}
	const sortProducts = [...products].reverse();

	const handleProductView = (id) => {
		navigate(`/admin-dashboard/articale/view/${id}`);
	};

	const handleEditBtn = (id) => {
		navigate(`/admin-dashboard/articale/edit/${id}`);
	};

	//Handle Delete Post
	const handleDeleteProduct = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/articale/${id}`)
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

	const PRODUCTS_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},

			{
				Header: "Title",
				accessor: "title",
				sortType: "basic",
				Cell: ({ row }) => {
					const { title } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{title?.slice(0, 40)}
						</div>
					);
				},
			},

			{
				Header: "Category",
				accessor: "proCategory",
				sortType: "basic",
			},

			{
				Header: "Date",
				accessor: "date",
				sortType: "basic",
				Cell: ({ row }) => {
					const { date } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{moment(date).format("MMM D, YYYY")}
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
							<button onClick={() => handleProductView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleEditBtn(_id)}>
								<div className="w-8 h-8 rounded-md bg-primary  text-white grid items-center justify-center">
									<FiEdit className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeleteProduct(_id)}>
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
		<div>
			<div className="text-primary p-3">
				{products.length && (
					<Table
						columns={PRODUCTS_COLUMNS()}
						data={sortProducts}
						headline={"All Projects"}
					/>
				)}
			</div>
		</div>
	);
};
