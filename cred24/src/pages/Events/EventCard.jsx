import React, { useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import EventInfo from './EventInfo';
import { toast } from 'react-toastify';
import { addtoCart } from '../../redux/cartSlices';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Events.css';

const EventCard = ({ img, item }) => {
	let [isOpen, setIsOpen] = useState(false);
	const cart = useSelector((state) => state.cart.cart);

	let added = false;
	if (cart) {
		const addedif = cart.find((itm) => itm.id === parseInt(item.id));
		if (addedif !== undefined) {
			added = true;
		}
	}
	useEffect(() => {}, [cart]);

	window.onload = function () {
		const eventCart = JSON.parse(localStorage.getItem('eventCart'));
		if (eventCart !== null) {
			const eventAdded = eventCart.find((itm) => itm.id !== parseInt(item.id));
			if (eventAdded !== undefined) {
				added = true;
			}
		}
	};

	const dispatch = useDispatch();
	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	function addTocart() {
		const cartOne = {
			name: item.heading,
			image: img,
			id: item.id,
			cost: item.amount,
		};
		const isAdded = cart.filter((item) => item.id === cartOne.id);
		if (isAdded.length === 0) {
			dispatch(addtoCart(cartOne));
			setTimeout(() => {
				toast.success('Event added successfully!');
			}, 0);
		} else {
			toast.warning('The event is already added to cart!');
		}
	}

	return (
		<>
			<div className="hover:translate-y-[-7px] hover:scale-[1.05]">
				<button type="button" onClick={openModal} className="eventCart">
					<div className="eventCart transition duration-1000 delay-100 ease-in-out group text-slate-200 font-semibold flex-col border-4 text-[1.1rem] border-none bg-gradient-to-r from-cyan-700 to-sky-800 backdrop-blur-[100px] shadow-[#13456c] border-slate-400 rounded-lg shadow-md card md:m-4 h-[9rem] w-[9rem] md:h-[11rem] md:w-[11rem] m-3 flex justify-between sm:justify-center align-center p-3 hover:border-none sm:text-lg">
						<img src={img} alt="" className="w-[75%] h-[75%] mx-auto " />
						<p className="text-sm md:text-md">{item.heading}</p>
					</div>
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10 " onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-aut">
						<div className="flex items-center justify-center min-h-full p-4 text-center md:bg-inherit bg-slate-800">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="bg-[#04121c] shadow-lg w-full max-w-4xl md:max-h-[550px] sm:h-[580px] p-2 md:p-6 overflow-hidden text-left align-middle transition-all transform border-t-2 border-b-2 border-teal-600 ">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900">
										<div className="flex justify-between py-2 mx-2 text-2xl text-teal-100 ">
											<p>{item.heading}</p>
											<button onClick={closeModal}>
												<i className="fa-regular fa-circle-xmark"></i>
											</button>
										</div>
									</Dialog.Title>
									<div className="m-1 md:min-h-[350px] sm:h-340px border-blue-400 border-b-2 ">
										<EventInfo data={item} />
									</div>

									<div className="flex flex-col justify-center p-">
										<div
											className={`
												// item.id === 3 ? 'hidden' : ''
											 w-[100%] flex-1 text-center m-2 flex items-center`}>
											<p className="mx-2 text-lg text-teal-200">{item.team}</p>
										</div>
										<div className="flex items-center justify-between px-2">
											<div
												className={` flex flex-row items-center bg-teal-950 border-teal-500 border-b-2 border-t-2 my-1`}>
												<h3 className="p-1 mx-1 text-xl text-slate-300">
													Cost
												</h3>
												<p className="flex flex-row px-1 m-1 text-xl text-green-500 rounded-md py-auto">
													<p className="px-1">&#8377;</p>
													{item.id !== 103 ? item.amount : 'Free'}
												</p>
											</div>
											{item.id === 103 ? (
												<Link
													to="https://nth.credenz.in/register"
													className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md h-fit hover:bg-teal-800 hover:text-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
													{' '}
													Register
												</Link>
											) : (
												<button
													type="button"
													disabled={added}
													className={`flex hover:border-2 items-center justify-center px-4 py-2 text-sm font-medium text-blue-900 border border-transparent rounded-md h-fit hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2 
													${
														added
															? 'border-2 bg-black rounded-lg cursor-default text-slate-100 shadow-sm border-1 border-green-400 font-semibold text-lg'
															: 'hover:bg-cyan-900 hover:ring-2 hover:text-slate-50 hover:ring-green-500 hover:border-none bg-slate-50'
													}`}
													onClick={addTocart}>
													{added ? (
														<p className="flex flex-row">
															Added to cart
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="2"
																stroke-linecap="round"
																stroke-linejoin="round"
																className="ml-2 feather feather-check-circle">
																<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
																<polyline points="22 4 12 14.01 9 11.01" />
																<path
																	xmlns="http://www.w3.org/2000/svg"
																	d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
																/>
																<polyline
																	xmlns="http://www.w3.org/2000/svg"
																	points="22 4 12 14.01 9 11.01"
																/>
															</svg>
														</p>
													) : (
														'Add to Cart'
													)}
												</button>
											)}
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			{/* // </Link> */}
		</>
	);
};
export default EventCard;
