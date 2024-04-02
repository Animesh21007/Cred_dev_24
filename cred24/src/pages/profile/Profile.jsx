import React, { Suspense, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useState } from 'react';
import Teams from './Teams';
import Requests from '../../api/ApiList';
import { useSelector, Provider, useDispatch } from 'react-redux';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { removeLogin } from '../../redux/cartSlices';
import Email from '../../images/Mail.png';
import Call from '../../images/Call.png';
import Orders from '../../images/Orders.png';
import Location from '../../images/Location.png';
import { toast } from 'react-toastify';
import ProfileContext from '../../utils/profileContext/ProfileContext';
import Tickets from './Tickets';
import profilePhoto from '../../images/ProfilePhoto.png';

const Profile = () => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}
	const navigate = useNavigate();

	const [profileInfo, setProfileInfo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		const getData = async () => {
			try {
				const res = await Requests.profile();
				setProfileInfo(res.data);
			} catch (err) {
				if (err.response && err.response.statusText === 'Unauthorized') {
					navigate('/login');
					toast.warning('User not Logged in, Login first');
				} else {
					toast.error('There was an error while getting the profile!');
				}
			} finally {
				setIsLoading(false);
			}
		};
		getData();
	}, []);

	if (isLoading) {
		return <Loader />;
	}
	let categories = {
		Ticket: [<Tickets profileInfo={profileInfo.orders} />],
		Team: [<Teams profileInfo={profileInfo} />],
	};

	const handleLogout = () => {
		navigate('/login');
		dispatch(removeLogin());
		localStorage.removeItem('token');
		toast.success('Logged out successfully!');
	};

	return (
		<div className="w-[100%] bg-[#0f1b34]">
			<div className="md:w-[90%] w-[100%] h-[100%] m-auto bg-[#0f1b34] text-white">
				<ProfileContext.Provider value={profileInfo}>
					<div className="flex md:flex-row flex-col h-[100%] ">
						<div className="flex flex-col flex-1">
							<div className="flex flex-row items-center justify-center text-center border-0 md:flex-col md:justify-center h-[50%] border-slate-400">
								<div className="p-4 md:p-1">
									<img
										src={profilePhoto}
										alt="ProfilePhoto"
										className="w-[140px] h-[140px] md:mx-auto rounded-md border-orange-500 border-4 border-dashed m-2 ring-2 ring-offset-2 "
									/>
								</div>
								<div className="flex flex-col justify-evenly font-[Poppins] ">
									<h3 className="p-2 text-2xl text-cyan-00">
										{profileInfo.full_name}
									</h3>
									<p className="py-2 text-md">{profileInfo.username}</p>
								</div>
							</div>
							<div className="flex flex-row justify-evenly text-start font-[Poppins] border-slate-400 border-4 h-[50%]">
								<div className="flex flex-col px-2 justify-evenly w-[40%] font-[AzonixRegular] text-blue-300 border--2">
									<p className="flex flex-row py-2 border-b-2 border-teal-800 sm:py-0">
										<img
											src={Location}
											alt="Email"
											className="w-[25px] h-[25px] mr-2"
										/>
										Institute :
									</p>
									<p className="flex flex-row py-2 border-b-2 border-teal-800 sm:py-0">
										<img
											src={Email}
											alt="Email"
											className="w-[25px] h-[25px] mr-2"
										/>
										Email :
									</p>
									<p className="flex flex-row py-2 border-b-2 border-teal-800 sm:py-0">
										<img
											src={Call}
											alt="Email"
											className="w-[25px] h-[25px] mr-2"
										/>
										Contact Info :
									</p>
									<p className="flex flex-row border-b-2 border-teal-800 ">
										<img
											src={Orders}
											alt="Email"
											className="w-[25px] h-[25px] mr-2"
										/>
										Orders :
									</p>
								</div>
								<div className="flex flex-col px-2 justify-evenly w-[50%]  text-slate-300">
									<p>{profileInfo.institute}</p>
									<p>{profileInfo.email}</p>
									<p>{profileInfo.phone}</p>
									<p>{profileInfo.orders.length}</p>
								</div>
							</div>
						</div>
						<div className="flex-[1.7] flex flex-col md:justify-between">
							{' '}
							<div className="w-full px-2 pb-4 sm:px-0">
								<Tab.Group>
									<Tab.List className="flex p-1 space-x-1 rounded-xl bg-blue-900/20">
										{Object.keys(categories).map((category) => (
											<Tab
												key={category}
												className={({ selected }) =>
													classNames(
														'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
														'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
														selected
															? 'bg-white text-blue-700 shadow'
															: 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
													)
												}>
												{category}
											</Tab>
										))}
									</Tab.List>
									<Tab.Panels className="mt-2 min-h-[340px]">
										{Object.values(categories).map((posts, idx) => (
											<Tab.Panel
												key={Math.random(0, 1) * 113}
												className={classNames(
													'rounded-xl bg-[#0f1b34] p-3',
													'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none '
												)}>
												{posts}
											</Tab.Panel>
										))}
									</Tab.Panels>
								</Tab.Group>
							</div>
							<div className="flex justify-end w-[90%] my-1 md:my-2 mx-auto">
								<button
									className="relative inline-flex items-center self-end justify-start px-4 py-2 mb-3 mr-4 overflow-hidden font-medium text-white transition-all border-2 border-teal-600 rounded bg-inherit hover:bg-white group"
									onClick={handleLogout}>
									<span className="w-48 h-48 rounded rotate-[-40deg] bg-red-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
									<span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">
										Logout
									</span>
								</button>
							</div>
						</div>
					</div>
				</ProfileContext.Provider>
			</div>
		</div>
	);
};

export default Profile;
