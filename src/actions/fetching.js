import { baseURL } from "../components/utilities/url";

//Fetch FAQS
export const fetchFAQs = async () => {
    const res = await fetch(`${baseURL}/faqs/all`);
    const data = await res.json();
    return data?.data;
};

//Fetch Brand
export const fetchBrand = async () => {
    const res = await fetch(`${baseURL}/brand/all`);
    const data = await res.json();
    return data?.data;
};

//Fetch Products
export const fetchProducts = async () => {
    const res = await fetch(`${baseURL}/products/all`);
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


//Fetch Work
export const fetchWork = async () => {
    const res = await fetch(`${baseURL}/work/all`);
    const data = await res.json();
    return data?.data;
};
//Fetch Work
export const fetchMsg = async () => {
    const res = await fetch(`${baseURL}/contact/all`);
    const data = await res.json();
    return data?.data;
};