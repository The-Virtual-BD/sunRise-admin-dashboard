import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import { baseURL } from '../../utilities/url';
import moment from 'moment';



const BlogDetails = () => {
    const { id } = useParams();
	const [sinNews, setSinNews] = useState({});

	useEffect(() => {
		fetch(`${baseURL}/news/${id}`)
			.then((res) => res.json())
			.then((data) => setSinNews(data));
	}, [id]);

	// console.log(sinNews);



    
    return (
        <div className='bg-white p-4 mx-2 lg:mx-8 my-5 rounded-md text-primary'>
            <div>
                <h2 className='text-2xl font-bold text-start my-3 px-4'>View News</h2>
                <hr className=' text-bgclr' />
            </div>

            <div className='flex flex-col lg:flex-row items-start justify-center gap-5 p-4'>
                <div className='w-full lg:w-1/2'>
                    <div className='flex flex-col items-start gap-3'>
                        <h3 className='text-start'><span className='font-bold'>Title:</span>{sinNews?.newsTitle}</h3>
                        <p><span className='font-bold'>Category: </span>{sinNews?.newsCategory}</p>
                        <p><span className='font-bold'>Date:</span> {moment(sinNews?.createdAt).format("MMM D, YYYY")}</p>
                      
                        <div className='text-start'>
                            <h3 className='font-bold'>Description:</h3>
                            <div className='text-labelclr' dangerouslySetInnerHTML={{ __html: sinNews?.newsDesc }} />
                        </div>

                    </div>
                </div>

                <div className='w-full lg:w-1/2'>
                    <img src={`${baseURL}/${sinNews?.newsImg}`} alt={sinNews?.newsTitle} srcSet="" className='h-full lg:h-[500px]' />
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;