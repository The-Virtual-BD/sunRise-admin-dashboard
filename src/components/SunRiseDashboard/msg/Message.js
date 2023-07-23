import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsEyeFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { baseURL } from '../../utilities/url';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCollection } from '../../../actions/reducers';
import Table from '../../SharedPage/Table';
import moment from 'moment/moment';

const Message = () => {
    const { message,messageLoading } = useCollection();
	const navigate = useNavigate();
	const location=useLocation();

	if (messageLoading) {
		return <p>Loading....</p>;
	};
	
	if (!messageLoading && message.length === 0) {
		return <p className="text-center text-lg">No Message Available</p>;
	};

	const allMsg = [...message]?.reverse() || "";

	const handleMsgView = (id) => {
		navigate(`/admin-dashboard/message/${id}`);
	};

	//Handle Delete Post
	const handleDeleteMsg = (id) => {
		const procced = window.confirm("You Want To Delete?");

		if (procced) {
			axios
				.delete(`${baseURL}/contact/${id}`)
				.then((response) => {
					toast.success("Deleted successfully!");
					
				})
				.catch((error) => {
					console.error(error);
					toast.error("Deleted Failed!");
				});
		}

		location.reload();
	};

	// console.log(allMsg)

	const MSG_COLUMNS = () => {
		return [
			{
				Header: "SL",
				id: "index",
				accessor: (_row, i) => i + 1,
			},
			{
				Header: "Name",
				accessor: "name",
				sortType: "basic",
				Cell: ({ row }) => {
					const { name } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{name?.slice(0, 40)}
						</div>
					);
				},
			},
			{
				Header: "Email",
				accessor: "email",
				sortType: "basic",
			},
			{
				Header: "Date",
				accessor: "cratedAt",
				sortType: "basic",
				Cell: ({ row }) => {
					const { cratedAt } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							{moment(cratedAt).format("MMM D, YYYY")}
						</div>
					);
				},
			},
			
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => {
					const { _id } = row.original;
					return (
						<div className="flex items-center justify-center  gap-2 ">
							<button onClick={() => handleMsgView(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#00A388] text-white grid items-center justify-center">
									<BsEyeFill className="text-lg " />
								</div>
							</button>

							<button onClick={() => handleDeleteMsg(_id)}>
								<div className="w-8 h-8 rounded-md bg-[#FF0000] text-white grid items-center justify-center">
									<AiFillDelete className="text-lg  text-white" />
								</div>
							</button>
						</div>
					);
				},
			},
		];
	};


    return (
        <div className="text-primary p-3">
        {message.length && (
            <Table
                columns={MSG_COLUMNS()}
                data={allMsg}
                headline={"All Queries"}
            />
        )}
    </div>
    );
};

export default Message;