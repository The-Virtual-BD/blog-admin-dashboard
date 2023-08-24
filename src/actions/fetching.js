import { baseURL } from "../components/utilities/url";


//Fetch Projects
export const fetchProjects = async () => {
    const res = await fetch(`${baseURL}/articale/all`);
    const data = await res.json();
    return data?.data;
};

//Fetch News
export const fetchNews = async () => {
    const res = await fetch(`${baseURL}/news/all`);
    const data = await res.json();
    return data?.data;
};


//Fetch Teams
export const fetchTeam = async () => {
    const res = await fetch(`${baseURL}/team/all`);
    const data = await res.json();
    return data?.data;
};

//Fetch Teams
export const fetchPublication = async () => {
    const res = await fetch(`${baseURL}/publications/all`);
    const data = await res.json();
    return data?.data;
};


