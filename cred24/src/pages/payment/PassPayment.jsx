import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import QRCode from 'qrcode';
import { useSelector } from 'react-redux';
import PaymentOptions from './PaymentOptions';

const PassPayment = () => {
	const totalprice = 100;
	const link = `upi://pay?pa=pictscholarship@jsb&pn=pictscholarship&am=${totalprice}&tn=Credenz IEEE&cu=INR`;
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
		<div className="w-[100%] h-[100%] flex md:flex-row  flex-col-reverse">
			<div className="flex flex-col flex-1 border-2">
				<div className="flex-[0.2]">
					<p>Total Price</p>
					<p>{totalprice}</p>
				</div>
				<div className="flex-[0.2]">
					{qrCodeDataUrl && <img src={qrCodeDataUrl} alt="QR Code" />}
				</div>
				<div className="flex-[0.6]">
					<PaymentOptions total={totalprice} />
				</div>
			</div>
			<div className="border-2 flex-[1.5] ">
				<h2>Steps to Follow for Payment</h2>
				<div>
					<p> {'1)Scan QR or click on the link to pay.'}</p>
					<p> {'2)Ensure Amout entered matches the one shown in summary.'}</p>
					<p>
						{
							'3)Verification of payment will be done and status will be updated in profile-tickets section.'
						}
					</p>
					<p>
						{' '}
						{
							' 4)After Successfull payment, Enter Transaction ID and click confirm payment.'
						}
					</p>
					<p>
						{'5)In case Of any queries contact'} <Link to="/contact">here</Link>
					</p>
				</div>
				<div>
					<Link to="/events">Back to events</Link>
				</div>
			</div>
		</div>
	);
};

export default PassPayment;
