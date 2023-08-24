import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import {
	BsFileTextFill,
	BsFillPersonFill,
	BsHeartPulseFill,
} from "react-icons/bs";
import { useCollection } from "../../actions/reducers";

const Dashboard = () => {
	const navigate = useNavigate();
	/* const { products, productsLoading, news, newsLoading, publications, publicationsLoading } =
		useCollection(); */

	/* if (productsLoading || newsLoading || publicationsLoading) {
		return <p>Loading...</p>;
	} */

	/* const handleBlogView = (id) => {
		console.log("clicked", id);
		navigate(`/admin-dashboard/blogs/${id}`);
	}; */

	return (
		<div className=" text-primary p-3 m-3  rounded-md min-h-screen">
			<div className=" w-full flex flex-col lg:flex-row items-center justify-between gap-5  mb-5 rounded-md">
				<div className="flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md">
					<div className="text-start">
						<h2 className="text-xl font-semibold ">Total Articales</h2>
						{/* <p>{publications?.length ? publications?.length : "0"}</p> */}
						<p>0</p>
					</div>
					<div>
						<FaRegNewspaper className="text-3xl font-bold text-blue" />
					</div>
				</div>

				<div className="flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md">
					<div className="text-start">
						<h2 className="text-xl font-semibold ">Total Projects</h2>
						{/* <p>{products?.length ? products?.length : "0"}</p> */}
						<p>0</p>
					</div>
					<div>
						<BsHeartPulseFill className="text-3xl font-bold text-blue" />
					</div>
				</div>

				<div className="flex items-center justify-between gap-5 bg-white  p-5 round w-full rounded-md">
					<div className="text-start">
						<h2 className="text-xl font-semibold ">Total Researchers</h2>
						{/* <p>{news?.length ? news?.length : "0"}</p> */}
						<p>0</p>
					</div>
					<div>
						<BsFillPersonFill className="text-3xl font-bold text-blue" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
