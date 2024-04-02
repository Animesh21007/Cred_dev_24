import React from 'react';
import Insta from '../images/Insta.png';
import Contact from '../images/Call.png';
import Linkedin from '../images/Linkedin.png';
import Mail from '../images/Mail.png';

const UserProfileCard = () => {
	return (
		<div className="max-w-xl mx-4 mt-16 text-gray-900 bg-white rounded-lg shadow-xl w-[18rem] xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto">
			<div className="h-20 overflow-hidden rounded-t-lg">
				<img
					className="hidden object-cover object-top w-full "
					src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
					alt="Mountain"
				/>
			</div>
			<div className="relative w-40 h-40 mx-auto -mt-16 overflow-hidden border-4 border-white rounded-full">
				<img
					className="object-cover object-center h-40 "
					src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
					alt="Woman looking front"
				/>
			</div>
			<div className="">
				<div className="mt-2 text-center">
					<h2 className="font-semibold">Sarah Smith</h2>
					<p className="text-gray-500">Freelance Web Designer</p>
				</div>
				<ul className="flex items-center justify-around py-4 mt-2 text-gray-700">
					<li className="flex flex-col items-center justify-around">
						<a
							href="/"
							className="p-1 border-2 rounded-lg hover:shadow-md hover:translate-y-[-5px]"
						>
							<img src={Contact} className="w-[32px]" alt="Contact" />
						</a>
					</li>
					<li className="flex flex-col items-center justify-between">
						<a
							href="/"
							className="p-1 border-2 rounded-lg hover:shadow-md hover:translate-y-[-5px]"
						>
							<img src={Linkedin} className="w-[35px]" alt="Linkedin" />
						</a>
					</li>
					<li className="flex flex-col items-center justify-around">
						<a
							href="/"
							className="p-1 border-2 rounded-lg hover:shadow-md hover:translate-y-[-5px]"
						>
							<img src={Mail} className="w-[35px]" alt="Mail" />
						</a>
					</li>
				</ul>
				{/* <div className="p-4 mx-8 mt-2 border-t">
					<button className="block w-1/2 px-6 py-2 mx-auto font-semibold text-white bg-gray-900 rounded-full hover:shadow-lg">
						Follow
					</button>
				</div> */}
			</div>
		</div>
	);
};

export default UserProfileCard;
