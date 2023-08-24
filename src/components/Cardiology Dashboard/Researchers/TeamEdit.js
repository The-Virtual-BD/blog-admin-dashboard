import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import axios from "axios";
import { toast } from "react-toastify";

const TeamEdit = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});

	const [memberNamE, setMemberName] = useState("");
	const [memberDesI, setMemberDesi] = useState("");
	const [memberImG, setMemberImg] = useState(null);
	const [memberCategorY, setMemberCategory] = useState("");
	const [oldMemberImgURL, setOldMemberImgURL] = useState("");

	const [submitting, setSubmitting] = useState(false);

	//Update Value
	useEffect(() => {
		if (sinPro) {
			setMemberName(sinPro.memberName);
			setMemberCategory(sinPro.memberCategory);
			setOldMemberImgURL(sinPro.memberImg);
			setMemberDesi(sinPro.memberDesi);
		}
	}, [sinPro]);

	useEffect(() => {
		fetch(`${baseURL}/team/${id}`)
			.then((res) => res.json())
			.then((data) => setSinPro(data));
	}, [id]);

	//Handle News Edit Form
	const handleTeamForm = (e) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			const memberForm = new FormData();
			memberForm.append("memberName", memberNamE);
			memberForm.append("memberDesi", memberDesI);
			memberForm.append("memberCategory", memberCategorY);

			// Check if a new image is selected
			if (memberImG) {
				memberForm.append("memberImg", memberImG);
			} else {
				memberForm.append("memberImg", oldMemberImgURL);
			}

			const url = `${baseURL}/team/${id}`;
			axios
				.put(url, memberForm)
				.then((res) => {
					console.log(res);
					toast.success("Member Updated Successfully");
					// e.target.reset();
					setSubmitting(false);
				})
				.catch((error) => console.log(error));
		} catch (error) {
			console.log(error);
			toast.error("Member Update Failed");
			setSubmitting(false);
		}
	};

	return (
		<div className="bg-bgclr text-primary min-h-screen">
			<div className="bg-white w-full lg:w-4/6 mx-auto p-5 mt-4 rounded-md">
				<div>
					<h3 className="px-3 text-2xl font-bold text-center">Edit Member</h3>

					<form
						onSubmit={handleTeamForm}
						className="p-3 flex flex-col items-center justify-center mt-10 gap-4 w-full"
					>
						<div className="flex flex-col lg:flex-row items-center gap-3 w-full">
							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Name"
									value={memberNamE}
									onChange={(e) => setMemberName(e.target.value)}
									required
									className="input  w-full  bg-bgclr"
								/>
							</div>

							<div className="form-control w-full  ">
								<input
									type="text"
									placeholder="Designation"
									value={memberDesI}
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
								value={memberCategorY}
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
						</div>

						<div className="form-control w-full">
							{/* File input to upload a new image */}
							<input
								type="file"
								accept=".jpg,.png,.jpeg,.svg"
								onChange={(e) => setMemberImg(e.target.files[0])}
								className="file-input w-full bg-bgclr"
							/>

							{/* Show the old image */}
							{oldMemberImgURL && (
								<img
									src={`${baseURL}/${oldMemberImgURL}`}
									alt="Old Member Image"
									className="w-40 h-40 object-cover mt-4"
								/>
							)}
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

export default TeamEdit;
