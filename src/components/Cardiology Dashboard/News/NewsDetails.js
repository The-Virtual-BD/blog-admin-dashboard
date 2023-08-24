import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/url";
import moment from "moment";

const NewsDetails = () => {
	const { id } = useParams();
	const [sinNews, setSinNews] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/news/${id}`)
			.then((res) => res.json())
			.then((data) => setSinNews(data));
	}, [id]);

	// console.log(sinNews);
	return (
		<div className="bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary">
			<div>
				<h2 className="text-2xl font-bold text-start my-3 px-4">View News</h2>
				<hr className=" text-bgclr" />
			</div>

			<div className="w-full mt-3">
				<div className="flex flex-col items-start gap-3">
					<h3 className="text-start">
						<span className="font-bold"> Title: </span>
						{sinNews?.newsTitle}
					</h3>
					<p>
						<span className="font-bold"> Posted Date: </span>{" "}
						{moment(sinNews?.createdAt).format("MMM D, YYYY")}
					</p>
					<div className="text-start">
						<h2  className="font-bold"> Short Description: </h2>
						<p>
							{sinNews?.newsShDesc}
						</p>
					</div>

					<div className="text-start mb-2">
						<h3 className="font-bold">Description: </h3>
						<div
							className="text-labelclr"
							dangerouslySetInnerHTML={{ __html: sinNews?.newsDesc }}
						/>
					</div>

					<iframe
						title="video-player"
						width="720"
						height="440"
						src={sinNews?.newsvdoLink}
						frameBorder="0"
						allowFullScreen
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default NewsDetails;
