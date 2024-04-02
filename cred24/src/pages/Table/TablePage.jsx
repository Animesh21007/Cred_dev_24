import { useEffect, useState } from 'react';
// import { Users } from "./users";
import './TablePage.css';
import Table from './Table';
import Requests from '../../api/ApiList';
import { toast } from 'react-toastify';
// import { Button } from 'react-bootstrap';

function TablePage({ props }) {
	// console.log(props)
	const [selectedFile, setSelectedFile] = useState(null);
	const [list, setList] = useState([]);
	const eventslist = [
		{ title: 'Clash', id: 101 },
		{ title: 'Reverse Coding', id: 102 },
		{ title: 'NTH', id: 103 },
		{ title: 'Wallstreet', id: 104 },
		{ title: 'B-Plan', id: 105 },
		{ title: 'Enigma', id: 106 },
		{ title: 'Datawiz', id: 107 },
		{ title: 'Quiz', id: 108 },
		{ title: 'Cretronix', id: 109 },
		{ title: 'Web Weaver', id: 110 },
	];
	const handleFileSelect = (event) => {
		setSelectedFile(event.target.files[0]);
	};
	const handleFileUpload = async () => {
		const formData = new FormData();
		formData.append('file', selectedFile);
		// console.log(formData);
		await Requests.adminUpload({ file: formData })
			.then((response) => {
				// console.log(response);
				toast.success('Uploaded successfully');
			})
			.catch((error) => {
				console.error(error);
				toast.error('Error while Uploading');
			});
	};
	const handleTableData = async () => {
		await Requests.adminTable()
			.then((res) => {
				// console.log('taable list',res.data);
				let temp = [];
				res.data.map((val, indx) => {
					let list = '';
					val.event_list.map((val) => {
						list += eventslist[val - 101].title + ' ';
					});
					temp.push({
						id: indx + 1,
						username: val.user.username,
						full_name: val.user.first_name + ' ' + val.user.last_name,
						transaction_id: val.transaction_id,
						cost: val.amount,
						date: val.order_date,
						status: val.payment === 'PO' ? 'Pending' : 'Completed',
						events: list,
					});
				});
				// console.log(temp);
				setList(temp);
			})
			.catch((err) => console.log(err));
	};

	const [query, setQuery] = useState('');
	const keys = ['full_name', 'username', 'transaction_id', 'status'];
	const search = (data) => {
		return data.filter((item) =>
			keys.some((key) => item[key].toLowerCase().includes(query))
		);
	};
	// useEffect(()=>handleTableData())
	async function handleConfirm(e) {
		const id = toast.loading('Please wait...');
		Requests.adminConfirm({ transaction_id: e })
			.then((res) => {
				// console.log('confirm',res.data)
				toast.success('Payment Confirmed!');
				// toast.success('Payment Confirmed!');
				handleTableData();
			})
			.catch((err) => {
				toast.error('Error, payment not confirmed');
			});
	}
	useEffect(() => {
		handleTableData();
	}, []);
	return (
		<div className="tablePage">
			<h4>Upload Excel Sheet</h4>
			<input type="file" accept=".xlsx" onChange={handleFileSelect} />
			<button onClick={handleFileUpload}>Upload</button>
			Enter Name or Username or Transaction-id or status To Find
			<input
				className="search"
				placeholder="Search..."
				onChange={(e) => setQuery(e.target.value.toLowerCase())}
			/>
			{/* {console.log(list[0])} */}
			{list[0] != undefined && (
				<Table data={search(list)} handleConfirm={handleConfirm} />
			)}
		</div>
	);
}

export default TablePage;
