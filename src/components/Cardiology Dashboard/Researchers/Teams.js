import React, { useState } from "react";
import SunEditor from "suneditor-react";
import { useCollection } from "../../../actions/reducers";
import { useForm } from "react-hook-form";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";
import Table from "../../SharedPage/Table";
import { BsEyeFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";

const Teams = () => {
	const { isViewTeam } = useCollection();
	return (
		<div className="bg-bgclr text-primary min-h-screen">
			{isViewTeam ? <AddTeam /> : <ViewTeam />}
		</div>
	);
};
export default Teams;

const AddTeam = () => {
	const location = useLocation();

	const [memberName, setMemberName] = useState("");
	const [memberDesi, setMemberDesi] = useState("");
	const [memberImg, setMemberImg] = useState(null);
	const [memberCategory, setMemberCategory] = useState("");

	const [submitting, setSubmitting] = useState(false);
	const [cateError, setCateError] = useState("");

	//Handle News Add Form
	const handleTeamForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		if (!memberCategory) {
			setCateError("*Category is required.");
			setSubmitting(false);
			return;
		}

		try {
			const memberForm = new FormData();
			memberForm.append("memberName", memberName);
			memberForm.append("memberDesi", memberDesi);
			memberForm.append("memberImg", memberImg);
			memberForm.append("memberCategory", memberCategory);

			const url = `${baseURL}/team/create`;
			axios
				.post(url, memberForm)
				.then((res) => {
					console.log(res);
					toast.success("Member Added Successfully");
					e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Member Added Failed");
			setSubmitting(false);
		}

		location.reload();
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Add Member</h3>

					<form
						onSubmit={handleTeamForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									onChange={(e) => setMemberName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Designation"
									onChange={(e) => setMemberDesi(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>
						</div>

						<div className="form-control w-full  ">
							<select
								className="select select-bordered w-full bg-bgclr"
								onChange={(e) => setMemberCategory(e.target.value)}
								required
							>
								<option disabled selected>
									Select Category
								</option>
								<option value={"Leadership"}>Leadership</option>
								<option value={"Team Members"}>Team Members</option>
								<option value={"PhD Students"}>PhD Students</option>
								<option value={"Alumni"}>Alumni</option>
								<option value={"Visiting Scholars"}>Visiting Scholars </option>
								<option value={"Collaborators"}>Collaborators </option>
							</select>
							{cateError && (
								<p className="text-red-500 text-sm text-start">{cateError}</p>
							)}
						</div>

						<div className="form-control w-full  ">
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setMemberImg(e.target.files[0])}
								required
								className="file-input  w-full bg-bgclr"
							/>
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

const ViewTeam = () => {
	const { team, teamLoading } = useCollection();
	const navigate = useNavigate();
	const location = useLocation();

	if (teamLoading) {
		return <p>Loading....</p>;
	}

	if (!teamLoading && team.length === 0) {
		return <p className="text-center text-lg">No Member Available</p>;
	}

	const allTeam = [...team]?.reverse() || "";

	const handleBlogView = (id) => {
		navigate(`/admin-dashboard/teams/view/${id}`);
	};

	const handleEditBtn = (id) => {
		navigate(`/admin-dashboard/teams/edit/${id}`);
	};

	//Handle Delete Post
	const handleDeletePost = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/team/${id}`)
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
				Header: "Name",
				accessor: "memberName",
				sortType: "basic",
				Cell: ({ row }) => {
					const { memberName } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{memberName?.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Designation",
				accessor: "memberDesi",
				sortType: "basic",
				Cell: ({ row }) => {
					const { memberDesi } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{memberDesi?.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Category",
				accessor: "memberCategory",
				sortType: "basic",
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

							<button onClick={() => handleEditBtn(_id)}>
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
			{team.length && (
				<Table
					columns={BLOG_COLUMNS()}
					data={allTeam}
					headline={"Team Members"}
				/>
			)}
		</div>
	);
};
