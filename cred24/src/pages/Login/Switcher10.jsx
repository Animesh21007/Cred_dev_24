import React, { useState } from 'react';

const Switcher10 = ({ onCheckboxChange }) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheckboxChange = () => {
		const newValue = !isChecked;
		setIsChecked(newValue);
		onCheckboxChange(newValue); // Pass the new value to the parent component
	};

	return (
		<>
			<span className="flex label">
				<span className="pl-1 border-gray-300 text-gray-100 sm:text-sm focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300 block w-full px-3 py-1 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-[1.07rem] border-b-2 mx-2">
					{isChecked ? 'Senior' : 'Junior'}
				</span>
			</span>
			<label className="relative inline-flex items-center cursor-pointer select-none autoSaverSwitch">
				<input
					type="checkbox"
					name="autoSaver"
					className="sr-only"
					checked={isChecked}
					onChange={handleCheckboxChange}
				/>
				<span
					className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
						isChecked ? 'bg-blue-950' : 'bg-blue-100'
					}`}>
					<span
						className={`dot h-[18px] w-[18px] rounded-full  duration-200 ${
							isChecked ? 'translate-x-6 bg-white' : 'bg-blue-950'
						}`}></span>
				</span>
			</label>
		</>
	);
};

export default Switcher10;
