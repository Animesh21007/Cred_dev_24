import React from 'react';
import Insta from '../images/Insta.png';
import Linkedin from '../images/Linkedin.png';
import Facebook from '../images/Facebook.png';

const Footer = () => {
	return (
		<div className="bg-[#001449] text-slate-100">
			<div className="container mx-auto py-4 flex flex-col items-center md:flex-row justify-between">
				<p>PICB IEEE Pune Branch</p>
				<p>
					Designed And Developed BY:{' '}
					<a href="/" className="font-semibold underline-offset-2">
						Web Team
					</a>
				</p>
				<div className="flex justify-center space-x-4 mt-2 md:mt-0">
					<a href="/" className="p-1">
						<img src={Insta} className="w-6" alt="Instagram" />
					</a>
					<a href="/" className="p-1">
						<img src={Linkedin} className="w-6" alt="Linkedin" />
					</a>
					<a href="/" className="p-1">
						<img src={Facebook} className="w-6" alt="Facebook" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default Footer;
