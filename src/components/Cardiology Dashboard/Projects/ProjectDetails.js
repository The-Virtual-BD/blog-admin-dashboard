import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import moment from "moment";

const ProjectsDetails = () => {
	const { id } = useParams();
	const [sinPro, setSinPro] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/articale/${id}`)
			.then((res) => res.json())
			.then((data) => setSinPro(data));
	}, [id]);

	// console.log(sinPro);

	return (
		<div className="bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary">
			<div>
				<h2 className="text-2xl font-bold text-start my-3 px-4">
					View Project
				</h2>
				<hr className=" text-bgclr" />
			</div>

			<div className="flex flex-col lg:flex-row items-start justify-center gap-5 p-4">
				<div className="w-full lg:w-1/2">
					<div className="flex flex-col items-start gap-3">
						<h3 className="text-start">
							<span className="font-bold"> Title: </span>
							{sinPro?.title}
						</h3>
						<p>
							<span className="font-bold"> Category: </span>
							{sinPro?.proCategory}
						</p>
						<p>
							<span className="font-bold">Posted on </span>
							{moment(sinPro?.date).format("MMM D, YYYY")}
						</p>
						<p>
							<span className="font-bold"> Authors: </span>
							{sinPro?.authors}
						</p>

						<p>
							<span className="font-bold"> Articale Type: </span>
							{sinPro?.articaleType}
						</p>

						<p>
							<a href={sinPro?.link} download={true} className=" font-bold  hover:underline">Download Articale</a>

						</p>




						<div className="text-start">
							<h3 className="font-bold">Description: </h3>
							<div
								className="text-labelclr"
								dangerouslySetInnerHTML={{ __html: sinPro?.desc }}
							/>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-1/2">
					<img
						src={`${baseURL}/${sinPro?.artiImg}`}
						alt={sinPro?.proName}
						srcSet=""
						className="h-full lg:h-[500px]"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProjectsDetails;
