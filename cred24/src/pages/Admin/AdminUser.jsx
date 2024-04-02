// import { useEffect, useState } from 'react';
// import Requests from '../../api/ApiList';
// import { useNavigate } from 'react-router-dom';
// import phonepe from '../../images/phonepe-logo-icon.png';
// import gpay from '../../images/google-pay-icon.png';
// import paytm from '../../images/paytm-icon.png';
// import amazonpay from '../../images/amazon-pay-icon.png';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import Register from '../Login/Register';

// const AdminUser = ({ props }) => {
// 	const { Register, handleSubmit } = useForm();

// 	const [details, setdetails] = useState([]);
// 	const [cart, setCart] = useState([]);
// 	const [amount, setAmount] = useState(0);
// 	const [username, setUsername] = useState('');
// 	const [length, setLength] = useState(0);
// 	const [payMethod, setPayMethod] = useState(0);
// 	const [pass, setPass] = useState(false);
// 	const passAmt = 100;
// 	const payList = [
// 		'UTR',
// 		'UPI transaction ID',
// 		'UPI Ref ID',
// 		'Bank Reference Id',
// 	];
// 	let navigate = useNavigate();
// 	let link = `upi://pay?pa=kunaljaipuria@ybl&pn=pictscholarship&am=${amount}&tn=IEEE&cu=INR`;
// 	const handelChange = (e) => {
// 		let temp = [];
// 		temp = cart;
// 		if (!e.target.checked)
// 			temp = temp.filter((data) => data.id !== e.target.id);
// 		else temp.push({ id: e.target.id, amt: Number(e.target.value) });
// 		// console.log(Number(e.target.value),e.target.id,e.target.checked,temp)
// 		let amt = 0;
// 		temp.map((data) => (amt += data.amt));
// 		// console.log(e.ttemp,temp.length,amt);
// 		setAmount(amt);
// 		setCart(temp);
// 		setLength(temp.length);
// 		link = `upi://pay?pa=kunaljaipuria@ybl&pn=pictscholarship&am=${amt}&tn=Credenz IEEE&cu=INR`;
// 		generate();
// 	};
// 	const [isQr, setisQr] = useState(false);
// 	const [upiId, setupiId] = useState('');
// 	function generate() {
// 		setisQr(true);
// 		var div = document.getElementById('payment-qr-code');

// 		while (div.firstChild) {
// 			div.removeChild(div.firstChild);
// 		}
// 		var qrcode = new window.QRCode(document.querySelector('.payment-qr-code'), {
// 			text: link,
// 			width: 150, //default 128
// 			height: 150,
// 			colorDark: 'white',
// 			colorLight: 'black',
// 			correctLevel: window.QRCode.CorrectLevel.H,
// 		});
// 	}
// 	function onlyDigits(s) {
// 		for (let i = s.length - 1; i >= 0; i--) {
// 			const d = s.charCodeAt(i);
// 			if (d < 48 || d > 57) return false;
// 		}
// 		return true;
// 	}
// 	const handleClick = () => {
// 		if (username === '') {
// 			toast.error('Username is empty');
// 			return;
// 		}

// 		if (!onlyDigits(upiId)) {
// 			toast.error('Enter Only Numeric digits!');
// 			return;
// 		}

// 		if (upiId === '' || upiId.length < 10) {
// 			toast.error('Enter Valid id');
// 			return;
// 		}

// 		// console.log(cart);
// 		if (pass) {
// 			toast.loading('Please wait...');
// 			Requests.adminPass({ amount: passAmt, username, transaction_id: upiId })
// 				.then((res) => {
// 					console.log(res.data);
// 					toast.update(id, {
// 						render: 'Pass Booked',
// 						type: 'success',
// 						isLoading: false,
// 						autoClose: 5000,
// 					});
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					toast.update(id, {
// 						render: 'Payment Error',
// 						type: 'error',
// 						isLoading: false,
// 						autoClose: 5000,
// 					});
// 				});
// 			return;
// 		} else {
// 			let event_list = [];
// 			let amount = 0;
// 			cart.map((data) => {
// 				amount += data.amt;
// 				event_list.push(data.id);
// 			});
// 			console.log(username, upiId, event_list, amount);
// 			const id = toast.loading('Please wait...');
// 			Requests.adminOrder({
// 				username,
// 				transaction_id: upiId,
// 				event_list,
// 				amount,
// 			})
// 				.then((res) => {
// 					console.log(res, props);
// 					toast.update(id, {
// 						render: 'Successfully generated ticket',
// 						type: 'success',
// 						isLoading: false,
// 						autoClose: 5000,
// 					});
// 					// toast.success('Successfully generated ticket');
// 					navigate('/admin');
// 				})
// 				.catch((err) => {
// 					console.log(err);
// 					// toast.success('Error While Generating ticket');
// 					toast.update(id, {
// 						render: 'Payment Error',
// 						type: 'error',
// 						isLoading: false,
// 						autoClose: 5000,
// 					});
// 				});
// 		}
// 		//   window.alert(`UPI Transaction Id :- ${upiId}`);
// 		//   window.alert(`username :- ${username}`);
// 	};
// 	const handelPass = (e) => {
// 		if (e.target.checked) {
// 			setPass(true);
// 			link = `upi://pay?pa=kunaljaipuria@ybl&pn=pictscholarship&am=${passAmt}&tn=Credenz IEEE&cu=INR`;
// 			generate();
// 			setAmount(passAmt);
// 			setLength(1);
// 			setCart([]);
// 		} else {
// 			setPass(false);
// 			setAmount(0);
// 			setLength(0);
// 			setCart([]);
// 		}
// 	};
// 	const eventList = async () => {
// 		await Requests.events()
// 			.then((res) => {
// 				// console.log(res.data);
// 				setdetails(res.data);
// 			})
// 			.catch((err) => console.log(err));
// 	};
// 	useEffect(() => {
// 		eventList();
// 	}, []);
// 	return (
// 		<div className="adminUser">
// 			{/* {console.log(details)} */}
// 			{/* <form onSubmit={(e)=>{e.preventDefault();console.log(e.target)}}> */}

// 			<div className="card">
// 				<div className="row">
// 					<div className="col-md-7 cart">
// 						<div className="title">
// 							<div className="row">
// 								<div className="col">
// 									<h4>
// 										<b>Events</b>
// 									</h4>
// 								</div>
// 								{/* <div className="text-right col align-self-center ">3 items</div> */}
// 							</div>
// 						</div>

// 						<table style={{ width: '100%' }}>
// 							<tbody style={{ fontSize: 'large' }}>
// 								<tr>
// 									<th>Event Name</th>
// 									<th style={{ paddingLeft: '5px' }}>Cost</th>
// 								</tr>
// 								<tr key={100}>
// 									<td>
// 										<input
// 											type="checkbox"
// 											onChange={handelPass}
// 											id={100}
// 											name={'Event Pass'}
// 											value={passAmt}
// 										/>
// 										<label for={100}>{'Event Pass'}</label>
// 									</td>
// 									<td style={{ paddingLeft: '15px' }}>
// 										<label for={100}>{passAmt}</label>
// 									</td>
// 								</tr>
// 								{!pass &&
// 									details.map((data) => (
// 										<>
// 											{data.id !== 103 && (
// 												<tr key={data.id}>
// 													<td>
// 														<input
// 															type="checkbox"
// 															onChange={handelChange}
// 															id={data.id}
// 															name={data.heading}
// 															value={data.amount}
// 														/>
// 														<label for={data.id}>{data.heading}</label>
// 													</td>
// 													<td style={{ paddingLeft: '15px' }}>
// 														<label for={data.id}>{data.amount}</label>
// 													</td>
// 												</tr>
// 											)}
// 										</>
// 									))}
// 								<tr>
// 									<hr
// 										style={{
// 											width: '120%',
// 											height: '2px',
// 											borderWidth: '5px',
// 											color: 'white',
// 											backgroundColor: 'white',
// 										}}></hr>
// 								</tr>
// 								<tr>
// 									<td>Items</td>
// 									<td style={{ paddingLeft: '15px' }}>{length}</td>
// 								</tr>
// 								<tr>
// 									<td>Total Amount</td>
// 									<td style={{ paddingLeft: '15px' }}>{amount}</td>
// 								</tr>
// 							</tbody>
// 						</table>
// 					</div>

// 					<div className="col-md-5 summary">
// 						<div>
// 							<h4>
// 								<b>Payment</b>
// 							</h4>
// 						</div>
// 						<hr />
// 						{/* <div className="row">
//                 <div className="col" style={{ paddingLeft: "0" }}>
//                   ITEMS 3
//                 </div>
//                 <div className="text-right col">&euro; 132.00</div>
//               </div> */}

// 						<div
// 							className="row"
// 							style={{
// 								borderTop: '1px solid rgba(0,0,0,.1)',
// 								padding: '2vh 0',
// 							}}>
// 							{/* <div className="col">TOTAL PRICE</div>
//               <div className="text-right col">{totalprice}</div> */}
// 						</div>
// 						<div className="pay-links">
// 							{/* {!isQr ? <button onClick={() => generate()}>Click For QR</button> : <></>} */}
// 							<div
// 								id="payment-qr-code"
// 								className="payment-qr-code"
// 								style={
// 									isQr ? { visibility: 'visible' } : { height: '0', width: '0' }
// 								}></div>
// 							<p className="payment-link">Select Method</p>
// 							{/* <a target="_blank" href={link} rel="noreferrer" className="payment-link">Click To Pay</a> */}
// 						</div>
// 						<div>
// 							<div>
// 								<img
// 									src={phonepe}
// 									alt="phonepe"
// 									className={
// 										payMethod == 0 ? 'pay-method pay-active' : 'pay-method '
// 									}
// 									onClick={(e) => {
// 										setPayMethod(0);
// 									}}
// 								/>
// 							</div>
// 							<div>
// 								<img
// 									src={gpay}
// 									alt="Image 2"
// 									className={
// 										payMethod === 1 ? 'pay-method pay-active' : 'pay-method '
// 									}
// 									onClick={(e) => {
// 										setPayMethod(1);
// 									}}
// 								/>
// 							</div>
// 							<div>
// 								<img
// 									src={paytm}
// 									alt="Image 3"
// 									className={
// 										payMethod === 2 ? 'pay-method pay-active' : 'pay-method '
// 									}
// 									onClick={(e) => {
// 										setPayMethod(2);
// 									}}
// 								/>
// 							</div>
// 							<div>
// 								<img
// 									src={amazonpay}
// 									alt="Image 4"
// 									className={
// 										payMethod === 3 ? 'pay-method pay-active' : 'pay-method '
// 									}
// 									onClick={(e) => {
// 										setPayMethod(3);
// 									}}
// 								/>
// 							</div>
// 						</div>
// 						<div style={{ paddingTop: '5%' }}>
// 							<p>Enter {payList[payMethod]}</p>
// 							<input
// 								id="upiId"
// 								name="upiId"
// 								value={upiId}
// 								onKeyDown={(e) => {
// 									const pattern = /^[0-9]*$/;
// 									if (!pattern.test(e.key) && e.key !== 'Backspace') {
// 										e.preventDefault();
// 									}
// 								}}
// 								onChange={(e) => {
// 									setupiId(e.target.value);
// 								}}
// 								placeholder={`Enter ${payList[payMethod]}`}
// 								required></input>
// 						</div>
// 						<div>
// 							Enter Username Of Person:
// 							<input
// 								id="upiId"
// 								name="upiId"
// 								value={username}
// 								onChange={(e) => setUsername(e.target.value)}
// 								placeholder="Enter Username Of Person:"
// 								required></input>
// 						</div>

// 						<button className="btn" onClick={() => handleClick()}>
// 							Confirm Payment
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default AdminUser;
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Requests from '../../api/ApiList';
import phonepe from '../../images/phonepe-logo-icon.png';
import gpay from '../../images/google-pay-icon.png';
import paytm from '../../images/paytm-icon.png';
import amazonpay from '../../images/amazon-pay-icon.png';
import Events from '../Events/Eventjson';

const AdminUser = ({ props }) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const navigate = useNavigate();

	const [details, setDetails] = useState([]);
	const [cart, setCart] = useState([]);
	const [amount, setAmount] = useState(0);
	const [username, setUsername] = useState('');
	const [upiId, setUpiId] = useState('');
	const [isQr, setIsQr] = useState(false);
	const [payMethod, setPayMethod] = useState(0);
	const [pass, setPass] = useState(false);
	const passAmt = 100;
	const [isPassChecked, setIsPassChecked] = useState(true);
	const payList = [
		'UTR',
		'UPI transaction ID',
		'UPI Ref ID',
		'Bank Reference Id',
	];

	function onlyDigits(s) {
		for (let i = s.length - 1; i >= 0; i--) {
			const d = s.charCodeAt(i);
			if (d < 48 || d > 57) return false;
		}
		return true;
	}

	useEffect(() => {
		const fetchEvents = () => {
			setDetails(Events);
		};
		fetchEvents();
	}, []);

	const handleCheckboxChange = (e) => {
		const { checked, id, value } = e.target;
		let temp = [...cart];
		if (!checked) {
			temp = temp.filter((data) => data.id !== id);
		} else {
			temp.push({ id, amt: Number(value) });
		}
		let totalAmount = 0;
		temp.forEach((data) => (totalAmount += data.amt));
		setAmount(totalAmount);
		setCart(temp);
		setIsQr(true);
		setUpiId('');
		console.log(temp);
	};

	const handlePassCheckboxChange = (e) => {
		const checked = e.target.checked;
		if (checked) {
			setCart([]);
			setAmount(passAmt);
			setIsQr(true);
			setUpiId('');
		} else {
			setAmount(0);
			setCart([]);
			setIsQr(false);
		}
	};

	const handlePayment = async () => {
		try {
			// Validation
			if (username === '') {
				throw new Error('Username is empty');
			}

			if (!onlyDigits(upiId)) {
				throw new Error('Enter Only Numeric digits!');
			}

			if (upiId === '' || upiId.length < 10) {
				throw new Error('Enter Valid id');
			}

			// Payment processing
			const requestData = pass
				? { amount: passAmt, username, transaction_id: upiId }
				: {
						username,
						transaction_id: upiId,
						event_list: cart.map((data) => data.id),
						amount: cart.reduce((total, data) => total + data.amt, 0),
				  };

			const id = toast.loading('Please wait...');
			const response = pass
				? await Requests.adminPass(requestData)
				: await Requests.adminOrder(requestData);
			toast.dismiss();
			toast.success(pass ? 'Pass Booked' : 'Successfully generated ticket');

			if (!pass) {
				navigate('/admin');
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className="adminUser">
			<div className="card">
				<div className="row">
					<div className="col-md-7 cart">
						<div className="title">
							<div className="row">
								<div className="col">
									<h4>
										<b>Events</b>
									</h4>
								</div>
							</div>
						</div>
						<table style={{ width: '100%' }}>
							<tbody className="text-lg">
								{/* Checkbox for Event Pass */}
								<tr key={100}>
									<td>
										<input
											type="checkbox"
											onChange={handlePassCheckboxChange}
											id="fd"
											name="Event Pass"
											value={passAmt}
											checked={cart.length === 0 && amount === passAmt}
										/>
										{/* <label htmlFor="fd">Event Pass</label> */}
									</td>

									<td style={{ paddingLeft: '15px' }}>
										<label htmlFor={100}>{passAmt}</label>
									</td>
								</tr>
								{/* Checkboxes for other events */}
								{!isPassChecked &&
									details.map((data) => (
										<tr key={data.id}>
											<td>
												<input
													type="checkbox"
													onChange={handleCheckboxChange}
													id={`${data.id}`}
													name={data.heading}
													value={data.amount}
													checked={cart.find((item) => item.id === data.id)}
												/>
												<label htmlFor={`${data.id}`}>{data.heading}</label>
											</td>
											{/* <td className="p-[15px]">
												<label htmlFor={data.id}>{data.amount}</label>
											</td> */}
										</tr>
									))}
								{/* Total items and total amount */}
								<tr>
									<hr className="w-[120%] h-[2px] border-[5px] text-white bg-white" />
								</tr>
								<tr>
									<td>Items</td>
									<td className="p-[15px]">{cart.length}</td>
								</tr>
								<tr>
									<td>Total Amount</td>
									<td className="p-[15px]">{amount}</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Payment section */}
					<div className="col-md-5 summary">
						<div>
							<h4>
								<b>Payment</b>
							</h4>
						</div>
						<hr />
						<div className="pay-links">
							<div
								id="payment-qr-code"
								className={`"payment-qr-code
								${isQr ? 'visible' : 'h-[0] w-[0]'}
								}`}></div>
							<p className="payment-link">Select Method</p>
							<div>{/* Payment method icons */}</div>
							<div className="pt-[5%]">
								<p>Enter {payList[payMethod]}</p>
								<input
									id="upiId"
									name="upiId"
									value={upiId}
									onChange={(e) => setUpiId(e.target.value)}
									placeholder={`Enter ${payList[payMethod]}`}
									required
								/>
							</div>
							<div>
								Enter Username Of Person:
								<input
									id="username"
									name="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									placeholder="Enter Username Of Person:"
									required
								/>
							</div>
							<button className="btn" onClick={handlePayment}>
								Confirm Payment
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminUser;
