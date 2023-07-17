import { baseURL } from "../components/utilities/url";

//Fetch FAQS
export const fetchFAQs = async () => {
    const res = await fetch(`${baseURL}/faqs/all`);
    const data = await res.json();
    return data?.data;
};