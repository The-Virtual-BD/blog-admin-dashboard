import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const Login = () => {
	// const { token } = useCollection();
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);

	//Error & Loading Message
	if (error) {
		console.log(error);
	}

	if (loading) {
		console.log("loading...");
	}

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(email, password);
			const user = userCredential.user;
			const token = user.accessToken;
			// console.log(token)
			window.localStorage.setItem("token", token);

			navigate("/admin-dashboard/dashboard");
			toast.success("Login Success");
		} catch (error) {
			console.log(error, "Failed");
			toast.error("Login Failed");
		}
	};

	return (
		<div className="bg-bgclr flex flex-col items-center justify-center h-[100vh] ">
			<div className="bg-white  rounded-md w-96 px-4 ">
				<div className="flex justify-center py-3">
					{/* <img src={"/assets/logo.png"} alt="talents" className="my-4 block" /> */}
					<h2 className="text-red-700 font-bold text-xl text-center"> Digital Cardiology <br /> Research Group </h2>
				</div>

				<div className="py-10">
					{/* <h3 className="text-3xl font-bold text-primary text-center mb-3">
						Login
					</h3> */}

					<form onSubmit={handleLogin} className="bg-white">
						<input
							type="email"
							placeholder="Email"
							onBlur={(e) => setEmail(e.target.value)}
							className="input bg-white input-bordered input-error w-full max-w-md mb-3"
							required
						/>

						<input
							type="password"
							placeholder="Password"
							onBlur={(e) => setPassword(e.target.value)}
							className="input bg-white input-bordered input-error w-full max-w-md mb-3"
							required
						/>

						<div className="flex items-center justify-center">
							<button
								type="submit"
								className="px-10 py-2 bg-blue border border-blue hover:bg-white hover:border-blue hover:text-blue text-white rounded-lg font-bold "
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
