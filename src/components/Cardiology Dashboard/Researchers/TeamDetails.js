import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";

const TeamDetails = () => {
	const { id } = useParams();
	const [sinMember, setSinMember] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/team/${id}`)
			.then((res) => res.json())
			.then((data) => setSinMember(data));
	}, [id]);

	// console.log(sinMember);

	return (
		<div className="bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary">
			<div>
				<h2 className="text-2xl font-bold text-start my-3 px-4">View Member</h2>
				<hr className=" text-bgclr" />
			</div>

			<div className="flex flex-col lg:flex-row items-start justify-center gap-5 p-4">
				<div className="w-full lg:w-1/2">
					<div className="flex flex-col items-start gap-3">
						<h3 className="text-start">
							<span className="font-bold">Name: </span>
							{sinMember?.memberName}
						</h3>
						<p>
							<span className="font-bold">Designation: </span>
							{sinMember?.memberDesi}
						</p>
						<p>
							<span className="font-bold">Category: </span>
							{sinMember?.memberCategory}
						</p>
					</div>
				</div>

				<div className="w-full lg:w-1/2">
					<img
						src={`${baseURL}/${sinMember?.memberImg}`}
						alt={sinMember?.memberName}
						srcSet=""
						className="h-[350px] w-[350px] rounded"
					/>
				</div>
			</div>
		</div>
	);
};

export default TeamDetails;
