import './Admin.css';
import TablePage from '../table/TablePage';
import AdminUser from './AdminUser';
import { useState, useEffect } from 'react';
import Requests from '../../api/ApiList';

const Admin = (props) => {
	const [selected, setSelected] = useState(0);
	const [adminStatus, setAdminStatus] = useState(0);

	const checkAdmin = async () => {
		try {
			const res = await Requests.profile();
			if (res.data.is_superuser === true) {
				setAdminStatus(2);
			} else if (res.data.offline_officer === true) {
				setAdminStatus(1);
			} else {
				setAdminStatus(0);
			}
		} catch (err) {
			console.error(err);
			setAdminStatus(0);
		}
	};

	useEffect(() => {
		checkAdmin();
	}, []);

	const handleBackToAdmin = () => {
		setSelected(0);
	};

	return (
		<div className="flex items-center justify-center h-full">
			{adminStatus === 0 ? (
				<h1 className="text-3xl">You Are Not An Admin</h1>
			) : (
				<div className="adminPage">
					<div className="admin_style">
						{selected === 0 && (
							<>
								<button onClick={() => setSelected(1)} className="btn">
									New User
								</button>
								{adminStatus === 2 && (
									<button onClick={() => setSelected(2)} className="btn">
										Payment Table
									</button>
								)}
							</>
						)}
						{selected === 1 && (
							<>
								<button
									onClick={handleBackToAdmin}
									className="btn btn-secondary">
									Back to Admin
								</button>
								<AdminUser props={{ ...props }} />
							</>
						)}
						{selected === 2 && (
							<>
								<button
									onClick={handleBackToAdmin}
									className="btn btn-secondary">
									Back to Admin
								</button>
								<TablePage props={{ ...props }} />
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Admin;
