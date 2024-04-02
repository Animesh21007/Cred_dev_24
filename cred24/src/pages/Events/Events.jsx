import React from 'react';
import EventCard from './EventCard';
import EventJson from './Eventjson';
import './Events.css';
import Logo from '../../images/Images';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Login from '../Login/Login';
import Requests from '../../api/ApiList';
import { buyPass, emptyCart, totalSum } from '../../redux/cartSlices';

const Events = () => {
	const Event = Object(EventJson);
	const LoginStatus = useSelector((state) => state.cart.loginStatus);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	function handlePass() {
		console.log(Event);
		dispatch(emptyCart());
		dispatch(buyPass(Event));

		if (LoginStatus) {
			navigate('/paymentpass');
		} else {
			toast.warning('Login First!');
			navigate('/login');
		}
	}

	return (
		<div className="text-center event text-blue-50">
			<h1 className="text-4xl">Events</h1>
			<div className="flex flex-wrap justify-center h-auto p-2 md:mx-auto my-4 border-0 sm:gap-4 md:w-[100%] w-[100%]">
				{Event.map((item, index) => (
					<EventCard
						key={item.id}
						item={item}
						img={Object.values(Logo)[index % Object.values(Logo).length]}
					/>
				))}
			</div>
			<div className="border-0">
				<button
					className="px-3 py-1 m-1 text-lg border-2 border-blue-600 rounded-md bg-blue-950 text-slate-200 "
					onClick={handlePass}>
					Buy Pass
				</button>
			</div>
		</div>
	);
};

export default Events;
