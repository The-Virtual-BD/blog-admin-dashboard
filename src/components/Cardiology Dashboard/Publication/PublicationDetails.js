import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import moment from "moment";
import { BsArrowRight } from "react-icons/bs";

const PublicationDetails = () => {
	const { id } = useParams();
	const [sinNews, setSinNews] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/publications/${id}`)
			.then((res) => res.json())
			.then((data) => setSinNews(data));
	}, [id]);

	// console.log(sinNews);
	return (
		<div className="bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary">
			<div>
				<h2 className="text-2xl font-bold text-start my-3 px-4">
					View Publications
				</h2>
				<hr className=" text-bgclr" />
			</div>

			<div className="w-full mt-3">
				<div className="flex flex-col items-start gap-3">
					<h3 className="text-start">
						<span className="font-bold"> Publication Type: </span>
						{sinNews?.publiCategory}
					</h3>

					<p>
						<span className="font-bold"> Posted Date: </span>{" "}
						{moment(sinNews?.createdAt).format("MMM D, YYYY")}
					</p>

					<div className="text-start mb-1">
						<h3 className="font-bold">Description:</h3>
						<div
							className="text-labelclr"
							dangerouslySetInnerHTML={{ __html: sinNews?.publicationsDesc }}
						/>
					</div>

					<a
						href={sinNews?.publicationsLink}
						target="_blank"
						rel="noopener noreferrer"
						className="text-red-700 hover:text-red-500 hover:underline flex items-center gap-1"
					>
						<span>Read more</span>
						<BsArrowRight className="text-lg" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default PublicationDetails;
