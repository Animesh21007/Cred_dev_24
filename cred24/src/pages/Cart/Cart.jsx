import React, { Suspense, useEffect } from 'react';
import Logo from '../../images/Images';
import { useDispatch, useSelector } from 'react-redux';
import {
	emptyCart,
	removeFromCart,
	totalSum,
	addtoCart,
} from '../../redux/cartSlices';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Cart = () => {
	const dispatch = useDispatch();
	const total = useSelector((state) => state.cart.totalSum);
	const cart = useSelector((state) => state.cart.cart);
	const LoginStatus = useSelector((state) => state.cart.loginStatus);
	const navigate = useNavigate();
	console.log(total);
	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('eventCart'));
		if (storedCart) {
			dispatch(emptyCart());
			storedCart.forEach((item) => {
				dispatch(addtoCart(item));
			});
		}
	}, [dispatch]);

	function removeEvent(id) {
		dispatch(removeFromCart(id));
		setTimeout(() => {
			toast.warning('Event removed!');
		}, 0);
	}

	function emptycart() {
		dispatch(emptyCart());
		setTimeout(() => {
			toast.success('Cart is emptied!');
		}, 0);
	}

	function handleCheckout() {
		if (LoginStatus) {
			toast.success('Checked out successfully!');
			navigate('/payment');
		} else {
			toast.warning('Login First!');
			navigate('/login');
		}
	}

	function backtoEvent() {
		navigate('/events');
	}

	return (
		<Suspense fallback={Loader}>
			<div className="md:w-[70%] md:h-[100%] sm:w-[100%] h-[-webkit-fill-available] md:m-6 md:mx-auto border-2 border-gray-800 rounded-md flex flex-row justify-center items-center">
				{cart.length === 0 ? (
					<div className="m-auto w-75 sm:h-[300px] flex justify-center items-center bg-gradient-to-b from-[#002347] to-[#0f1b34] sm:w-[100%] my-auto">
						<p className="text-2xl text-sky-500">The Cart is Empty!</p>
					</div>
				) : (
					<div className="flex flex-col justify-around md:flex-row w-[100%] shadow-xl bg-[#002347] h-[100%] md:px-1">
						<div className="cardbox md:w-[66%] py-auto my-2 md:border-r-2 md:border-dashed border-0 border-gray-700">
							<p className="px-6 pb-4 m-2 mx-8 text-2xl text-center border-b-4 text-slate-100 border-cyan-800">
								Shopping Cart
							</p>
							<div className="h-[75%] overflow-y-scroll select-none [&::-webkit-scrollbar]:[width:2px] max-h-[450px] shadow-lg">
								{cart.map((itm, idx) => (
									<div
										className="card md:w-[90%] md:mx-[5%] mx-0 flex h-[120px] border-2 shadow-sm hover:shadow-xl px-0 md:px-5 hover:translate-y-[-3px] hover:rounded-none border-r-purple-800 border-r-4 hover:border-r-2 my-5 items-center justify-between shadow-[10px 10px 10px ] hover:border-purple-800 border-r-purple-800 border-transparent transition delay-200 duration-200 ease-in-out"
										key={idx * 0.7}>
										<div className="flex flex-row items-center mr-auto  md:justify-between justify-evenly w-[100%]">
											<div className="flex flex-row items-center">
												<img
													src={Logo[itm.id]}
													alt="logo"
													width="70px"
													height="70px"
													className=""
												/>
												<p className="text-lg text-right text-lime-50 w-[40%]">
													{itm.name}
												</p>
											</div>
											<div className="flex flex-row items-center">
												<p className="flex mx-2 text-xl text-lime-50 ">
													&#8377;<p className="px-2">{itm.cost}</p>
												</p>
												<button
													className="px-2 py-1 m-2 border-2 rounded border-slate-700 bg-slate-900 hover:border-green-500 hover:border-2"
													onClick={() => {
														removeEvent(itm.id);
													}}>
													<i className="m-auto text-white fa-solid fa-trash-can"></i>
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="flex flex-row justify-between w-[90%] mx-auto mt-2">
								<button
									className="px-2 py-1  border-2 border-purple-500 rounded-md text-lime-50 hover:bg-[#002366]"
									onClick={backtoEvent}>
									Back
								</button>
								<button
									className="px-2 py-1 border-2 border-purple-500 rounded-md text-lime-50 hover:bg-[#002366]"
									onClick={emptycart}>
									Empty Cart
								</button>
							</div>
						</div>
						<div className="border- border-slate-700 md:w-[36%] text-center text-slate-100 flex flex-col border-t-4 border-dashed md:border-2 md:border-transparent my-2">
							<p className="px-6 pb-4 m-2 mx-8 text-2xl text-center border-b-4 font-semi text-slate-100 justify-self-start border-cyan-800">
								Summary
							</p>
							<div className="flex flex-col w-[80%] mx-auto justify-between md:my-[10%] my-5 border-2 rounded-md p-2 border-cyan-700">
								<div className="flex flex-row justify-between w-[80%] mx-auto m-4 items-center">
									<p className="text-lg ">Total Price :</p>
									<p className="px-2 text-green-500">&#8377;{total}</p>
								</div>
								<div className="w-[100%] grid items-center text-white my-4">
									<button
										onClick={handleCheckout}
										className="px-2 m-2 bg-purple-950 w-[70%] py-1 rounded-lg mx-auto border-cyan-500 border-2">
										Checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Suspense>
	);
};

export default Cart;
