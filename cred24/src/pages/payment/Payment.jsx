//Two parts with one side  of profile info and other being from creating team related stuff /
//A leaderboard /
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import QRCode from 'qrcode';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions';

const Payment = () => {
	const totalprice = useSelector((state) => state.cart.totalSum);
	console.log(totalprice);
	const link = `upi://pay?pa=scrtspuneinstofcompu.62804004@hdfcbank&pn=PICT_IEEE_PISB&am=${totalprice}&mc=0000&tn=Credenz24 IEEE&cu=INR`;
	const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
	const [paymentMode, setPaymentMode] = useState(1);

	useEffect(() => {
		generateQRCode(link);
	}, [link]);

	const generateQRCode = async (link) => {
		try {
			const qrCodeDataUrl = await QRCode.toDataURL(link, {
				width: 150,
				height: 150,
			});
			setQrCodeDataUrl(qrCodeDataUrl);
		} catch (error) {
			console.error('Error generating QR code:', error);
		}
	};

	return (
		<div className="w-[100%] h-[100%] flex flex-col-reverse md:flex-row bg-gradient-to-b from-sky-950 to-indigo-950 text-white select-none">
			<div className="flex flex-col flex-1 border-2">
				<div className="flex flex-[0.5] flex-col  m-2 md:flex-row justify-evenly md:my-4 sm:my-2 items-center">
					<div className="my-2 ">
						{qrCodeDataUrl && (
							<img
								src={qrCodeDataUrl}
								alt="QR Code"
								className="w-[170px] h-[170px] mx-4 ring-4 ring-blue-800 ring-offset-2"
							/>
						)}
					</div>
					<div className="sm:flex-[0.5] my-1 flex flex-row md:items-center w-[50%] justify-evenly  md:flex-col">
						<p className="px-1 text-xl text-center text-slate-400">
							Total Price
						</p>
						<p className="px-1 py-2 m-2 w-[80%] text-center border-blue-400 bg-slate-800 text-green-400 text-xl border-t-2 border-b-2">
							&#8377; {totalprice}
						</p>
					</div>
				</div>

				<div className="flex-[0.4] ">
					<PaymentOptions total={totalprice} />
				</div>
			</div>
			<div className="border-0 md:border-2 flex-[1.5] flex flex-col justify-evenly mb-3 md:mb-0">
				<h2 className="px-4 text-2xl text-teal-500">
					Steps to Follow for Payment
				</h2>
				<div className="flex flex-col text-xl px-2 font-[Poppins] text-slate-300">
					<p className="px-2 m-2">
						{' '}
						{'1) Scan QR or click on the link to pay.'}
					</p>
					<p className="px-2 m-2">
						{' '}
						{'2) Ensure Amout entered matches the one shown in summary.'}
					</p>
					<p className="px-2 m-2">
						{
							'3) Verification of payment will be done and status will be updated in profile-tickets section.'
						}
					</p>
					<p className="px-2 m-2">
						{' '}
						{
							' 4) After Successfull payment, Enter Transaction ID and click confirm payment.'
						}
					</p>
					<p className="px-2 m-2">
						{'5) In case Of any queries contact'}{' '}
						<Link
							to="/contact"
							className="text-xl text-blue-400 underline hover:text-blue-600">
							here
						</Link>
						.
					</p>
				</div>
				<div>
					<Link
						to="/events"
						className="self-end px-2 mx-2 text-xl border-b-2 font-[Poppins] border-cyan-600 hover:text-blue-200 text-slate-500">
						Back to events
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Payment;
