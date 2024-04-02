import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ReactCardFlip from 'react-card-flip';
import './Loginpage.css';

const LoginPage = () => {
	const [isflipped, setIsFlipped] = useState(false);

	function handleClick(e) {
		e.preventDefault();
		setIsFlipped((prev) => !prev);
	}

	return (
		<div className="mid w-[100%] sm:w-[50%] h-[webkit-fill-available] mx-auto bg-gradient-to-t from-[#09203f] to-[#537895]">
			<div className="flex flex-row justify-center">
				<button
					onClick={handleClick}
					className="p-2 m-1 mx-4 text-lg font-semibold focus:border-b-2 text-sky-100">
					Login
				</button>
				<button
					onClick={handleClick}
					className="p-2 m-1 mx-4 text-lg font-semibold text-sky-100 focus:border-b-2">
					Register
				</button>
			</div>
			<div className="w-[70%] h-[70%] mx-auto">
				<ReactCardFlip isFlipped={isflipped} flipDirection="horizontal">
					<Login></Login>
					<Register></Register>
				</ReactCardFlip>
			</div>
		</div>
	);
};

export default LoginPage;
