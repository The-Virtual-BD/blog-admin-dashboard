import { Route, Routes } from "react-router-dom";
import "tw-elements";
import CollectionContext from "./actions/reducers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "suneditor/dist/css/suneditor.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

import RequireAuth from "./components/utilities/RequireAuth";

import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Teams from "./components/Cardiology Dashboard/Researchers/Teams";
import TeamDetails from "./components/Cardiology Dashboard/Researchers/TeamDetails";
import Newses from "./components/Cardiology Dashboard/News/Newses";
import NewsDetails from "./components/Cardiology Dashboard/News/NewsDetails";
import Projects from "./components/Cardiology Dashboard/Projects/Projects";
import ProjectsDetails from "./components/Cardiology Dashboard/Projects/ProjectDetails";
import ProjectEdit from "./components/Cardiology Dashboard/Projects/ProjectsEdit";
import Publications from "./components/Cardiology Dashboard/Publication/Publications";
import PublicationDetails from "./components/Cardiology Dashboard/Publication/PublicationDetails";
import TeamEdit from "./components/Cardiology Dashboard/Researchers/TeamEdit";
import NewsEdit from "./components/Cardiology Dashboard/News/NewsEdit";
import PublicationEdit from "./components/Cardiology Dashboard/Publication/PublicationEdit";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CollectionContext>
				<Routes>
					<Route path="/" element={<RequireAuth><AdminDashboard /></RequireAuth>} />

					<Route path="/admin-dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>}>

						<Route index path="/admin-dashboard/dashboard" element={<Dashboard />} />

						<Route path="/admin-dashboard/news" element={<Newses />}></Route>
						<Route path="/admin-dashboard/news/view/:id" element={<NewsDetails />}></Route>
						<Route path="/admin-dashboard/news/edit/:id" element={<NewsEdit />}></Route>

						<Route path="/admin-dashboard/articales" element={<Projects />}></Route>
						<Route path="/admin-dashboard/articale/view/:id" element={<ProjectsDetails />}></Route>
						<Route path="/admin-dashboard/articale/edit/:id" element={<ProjectEdit />}></Route>


						<Route path="/admin-dashboard/teams" element={<Teams />}></Route>
						<Route path="/admin-dashboard/teams/view/:id" element={<TeamDetails />}></Route>
						<Route path="/admin-dashboard/teams/edit/:id" element={<TeamEdit />}></Route>

						<Route path="/admin-dashboard/publications" element={<Publications />}></Route>
						<Route path="/admin-dashboard/publications/view/:id" element={<PublicationDetails />}></Route>
						<Route path="/admin-dashboard/publications/edit/:id" element={<PublicationEdit />}></Route>

					</Route>

					<Route path="/sign-in" element={<Login />}></Route>
				</Routes>

				<ToastContainer />
			</CollectionContext>
		</QueryClientProvider>
	);
}

export default App;
