import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import {
	fetchNews,
	fetchProjects,
	fetchPublication,
	fetchTeam,
} from "./fetching";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

export const APPContext = createContext();



const CollectionContext = ({ children }) => {
	const [isViewProducts, setIsViewProducts] = useState(false);
	const [isViewBlogs, setIsViewBlogs] = useState(false);
	const [isViewTeam, setIsViewTeam] = useState(false);
	const [isViewPubli, setIsViewPubli] = useState(false);
	const [menuOpen, setMenuOpen] = useState(true);

	const [user] = useAuthState(auth);
	const token = window.localStorage.getItem("token");
	
	const { data: products, isLoading: productsLoading } = useQuery("projects",fetchProjects);
	const { data: news, isLoading: newsLoading } = useQuery("news", fetchNews);
	const { data: team, isLoading: teamLoading } = useQuery("team", fetchTeam);
	const { data: publications, isLoading: publicationsLoading } = useQuery("publication",fetchPublication);
		
	const value = {
		menuOpen,
		setMenuOpen,
		user,
		token,
		isViewProducts,
		setIsViewProducts,
		isViewBlogs,
		setIsViewBlogs,
		isViewTeam,
		setIsViewTeam,
		products,
		productsLoading,
		news,
		newsLoading,
		team,
		teamLoading,
		isViewPubli,
		setIsViewPubli,
		publications,
		publicationsLoading,
	};

	return <APPContext.Provider value={value}>{children}</APPContext.Provider>;
};

//Create Hooks for send data
export const useCollection = () => {
	const context = useContext(APPContext);
	return context;
};

export default CollectionContext;
