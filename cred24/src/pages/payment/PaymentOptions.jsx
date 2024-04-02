import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import { RadioGroup } from '@headlessui/react';
import { useContext } from 'react';
import Requests from '../../api/ApiList';
import Payment from './Payment';
import { useSelector, useDispatch } from 'react-redux';
import Amazon from '../../images/amazon-pay-icon.png';
import Google from '../../images/google-pay-icon.png';
import PhonePe from '../../images/phonepe-logo-icon.png';
import Paytm from '../../images/paytm-icon.png';
import { emptyCart } from '../../redux/cartSlices';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../utils/loginContext/LoginContext';

const plans = [
	{
		name: 'PhonePe',
		ram: 'Enter UTR',
		cpus: 1,
		disk: PhonePe,
	},
	{
		name: 'GooglePay',
		ram: 'Enter UPI Transction ID',
		cpus: 2,
		disk: Google,
	},
	{
		name: 'Paytm',
		ram: 'Enter UPI Ref ID',
		cpus: 3,
		disk: Paytm,
	},
	{
		name: 'AmazonPay',
		ram: 'Enter Bank Reference ID',
		cpus: 4,
		disk: Amazon,
	},
];

///////////////////////////

function CheckIcon(props) {
	return (
		<svg viewBox="0 0 24 24" fill="none" {...props}>
			<circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
			<path
				d="M7 13l3 3 7-7"
				stroke="#fff"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
// /////////////////////////////////

const PaymentOptions = ({ total }) => {
	const { register, handleSubmit } = useForm();
	let [isOpen, setIsOpen] = useState(false);
	let [upiId, setupiID] = useState('');
	const [selectedUpi, setSelectedUpi] = useState(1);
	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selected, setSelected] = useState(plans[0]);

	useEffect(() => {}, [selected]);
	const loginStatus = useContext(LoginContext);

	function closeModal() {
		setIsOpen(false);
	}

	function onlyDigits(s) {
		for (let i = s.length - 1; i >= 0; i--) {
			const d = s.charCodeAt(i);
			if (d < 48 || d > 57) return false;
		}
		return true;
	}
	function openModal() {
		if (!loginStatus) {
			toast.error('Login First!');
			navigate('/login');
			return;
		} else if (!onlyDigits(upiId)) {
			toast.error('Enter Only Numeric digits!');
			return;
		} else if (upiId === '' || upiId.length < 10) {
			toast.error('Enter Valid id');
			return;
		} else {
			toast.info(`Please Ensure ${payList[payMethod]} is correct`);
			setIsOpen(true);
		}
	}
	const onConfirm = () => {
		dispatch(emptyCart());
		navigate('/profile');
		toast.success('Ticked Booked successfully!');
		closeModal();
	};

	const onCheckout = (data) => {
		if (onlyDigits(data.upi_id)) setupiID(data.upi_id);

		const handleClick = async () => {
			const event_list = [];
			cart.map((data) => {
				event_list.push(data.id);
			});

			const id = toast.loading('Please wait...');
			await Requests.order({
				event_list,
				transaction_id: data.upi_id,
				amount: total,
			})
				.then((res) => {
					if (res.data.message === 'order already placed') {
						toast.warning('Order already placed!');
					} else {
						toast.dismiss();
						openModal();
					}
				})
				.catch((err) => {
					console.log(err);
					toast.update(id, {
						render: 'Payment Error',
						type: 'error',
						isLoading: false,
						autoClose: 5000,
					});
				});
		};
		// data = { ...data, upiId: upi.val };
		handleClick();
	};

	return (
		<div className="grid grid-row-4 h-[100%] w-[100%] ">
			<div className="row-span-3 row-start-2 md:w-[80%] md:mx-auto sm:w-[100%]">
				<form
					onSubmit={handleSubmit(onCheckout)}
					className="flex flex-col justify-center ">
					<div className="w-full px-4 py-4 sm:px-4 ">
						<div className="w-[80%] mx-auto">
							<RadioGroup value={selected} onChange={setSelected}>
								<RadioGroup.Label className="sr-only">
									Server size
								</RadioGroup.Label>
								<div className="space-y-2">
									{plans.map((plan) => (
										<RadioGroup.Option
											key={plan.name}
											value={plan}
											className={({ active, checked }) =>
												`${
													active
														? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
														: ''
												}
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-4 py-2 shadow-md focus:outline-none `
											}>
											{({ active, checked }) => (
												<>
													<div className="flex items-center justify-evenly sm:w-[100%]">
														<div className="flex items-center">
															<div className="flex flex-row-reverse items-center justify-between text-sm md-[80%]">
																<RadioGroup.Label
																	as="p"
																	className={`font-medium px-1 mx-2  ${
																		checked ? 'text-white' : 'text-gray-900'
																	}`}>
																	{plan.name}
																</RadioGroup.Label>
																<RadioGroup.Description
																	as="span"
																	className={`h-[45px] w-[45px] mx-2 items-center flex ${
																		checked ? 'text-sky-100' : 'text-gray-500'
																	}`}>
																	<img
																		src={plan.disk}
																		alt="Logo "
																		width="45px"
																		height="45px"
																		className="py-1 pr-1 mx-1 "
																	/>
																</RadioGroup.Description>
															</div>
														</div>
														{checked && (
															<div className="text-white shrink-0">
																<CheckIcon className="w-6 h-6" />
															</div>
														)}
													</div>
												</>
											)}
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>
					</div>
					<div className="flex flex-col m-2 md:flex-row font-[Poppins]">
						<input
							{...register('upi_id', { maxLength: 15 })}
							placeholder={`${selected.ram}`}
							className="bg-teal-950 text-white placeholder:text-[1.07rem] border mx-auto border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block p-2 px-4 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[80%] md:w-[60%] h-[fit-content] my-auto"
							required
						/>
						<button
							className="items-end px-4 py-2 mx-auto bg-teal-800 border-2 rounded md:my-2 hover:text-white hover:bg-teal-950 focus:border-green-600 text-sky-100"
							type="submit">
							Checkout
						</button>
					</div>
					<Transition appear show={isOpen} as={Fragment}>
						<Dialog as="div" className="relative z-10" onClose={closeModal}>
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

							<div className="fixed inset-0 overflow-y-auto">
								<div className="flex items-center justify-center min-h-full p-4 text-center">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 scale-95"
										enterTo="opacity-100 scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 scale-100"
										leaveTo="opacity-0 scale-95">
										<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-2xl bg-gradient-to-r from-sky-800 to-cyan-700">
											<Dialog.Title
												as="h3"
												className="m-1 text-lg font-medium leading-6 text-teal-200">
												Payment Confirmation
											</Dialog.Title>
											<div className="mt-2 ">
												<div className="grid grid-cols-2 text-center text-white">
													<div className="flex flex-col row-span-1 p-1 text-center border-2">
														<p className="p-1 mx-auto border-b-2">
															Total Price
														</p>
														<p className="p-1">&#8377;{total}</p>
													</div>
													<div className="flex flex-col row-span-1 row-start-1 p-1 border-2 font-[Poppins]">
														<p className="p-1 border-b-2">UPI tranction ID</p>
														<p className="p-1">{upiId}</p>
													</div>
												</div>
												<div className="mx-1 my-3">
													<p className="py-2 text-sm text-slate-100">
														1. Payment verification will be done in 2-3 working
														days.
													</p>
													<p className="py-2 text-sm text-slate-100">
														2. Check profile section for final status.
													</p>
												</div>
											</div>

											<div className="flex justify-between mt-4">
												<button
													type="button"
													className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-gray-900 border border-transparent rounded-md focus:boder-none hover:font-bold text-sky-100 hover:text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-0"
													onClick={closeModal}>
													Cancel
												</button>
												<button
													type="button"
													className="inline-flex justify-center px-4 py-2 text-sm font-medium bg-gray-900 border border-transparent rounded-md focus:boder-none hover:font-bold text-sky-100 hover:text-gray-800 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-0"
													onClick={onConfirm}>
													Confirm
												</button>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition>
				</form>
			</div>
		</div>
	);
};

export default PaymentOptions;
