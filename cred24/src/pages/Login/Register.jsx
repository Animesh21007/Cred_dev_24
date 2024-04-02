import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Requests from '../../api/ApiList';
import { useNavigate } from 'react-router-dom';
import Switcher10 from './Switcher10';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/cartSlices';

const Register = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [userType, setUserType] = useState(false);

	const onSubmit = (data) => {
		data = { ...data, senior: userType };
		if (data.phone.length !== 10) {
			toast.warning('Please enter 10 digit Phone Number!');
		}
		if (data.cpassword === data.password) {
			delete data.cpassword;

			Requests.register(data)
				.then((res) => {
					localStorage.setItem('token', res.data.access);
					toast.success('Registered Successfully !');
					navigate('/home');
					dispatch(setLogin());
				})
				.catch((err) => {
					console.log(err);
					const msg = err.response.data;
					if (!msg) {
						toast.error('There was an error while Registration!');
					} else if (msg.username) {
						toast.warning(msg.username[0]);
					} else {
						toast.error(msg);
					}
				});
		} else {
			toast.warning('Passwords do not match!');
		}
	};

	return (
		<div className="bg-gradient-to-t from-[#09203f] to-[#537895]">
			<div className="md:w-[80%] flex flex-col justify-evenly mx-auto sm:w-[60%]">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="h-[80%] sm:w-[100%] mx-auto">
					<div className="flex justify-between gap-2 mx-auto my-1 w-[90%]">
						<input
							{...register('first_name', { maxLength: 20 })}
							id="Uname"
							className="font-[Poppins] bg-sky-950 border text-blue-100 border-slate-600  sm:text-sm rounded-lg focus:outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-300 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-[1.00rem]"
							required
							placeholder="First Name"
						/>
						<input
							{...register('last_name', { maxLength: 20 })}
							id="pass"
							required
							className="bg-sky-950 border text-blue-100  placeholder:text-[1.00rem] border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-full p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
							placeholder="Last Name"
						/>
					</div>
					<div className="my-3">
						<input
							{...register('username', { maxLength: 15 })}
							placeholder="Username"
							className="font-[Poppins] bg-sky-950 text-blue-100  placeholder:text-[1.00rem] border mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('email')}
							placeholder="Email"
							type="email"
							className="font-[Poppins] bg-sky-950 border text-blue-100 mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-[1.00rem]"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('phone', {
								maxLength: 10,
								minLength: 10,
							})}
							placeholder="Phone"
							type="number"
							className="font-[Poppins] bg-sky-950 border text-blue-100 mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  placeholder:text-[1.00rem]"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('institute')}
							placeholder="Institute"
							className="font-[Poppins] bg-sky-950 border text-blue-100  placeholder:text-[1.00rem] mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>

					<div className="my-3">
						<input
							{...register('referralCode')}
							placeholder="Referal Code (If any)"
							className="font-[Poppins] bg-sky-950 border text-blue-100 border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 mx-auto  placeholder:text-[1.00rem] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('password')}
							placeholder="Password"
							type="password"
							className="bg-sky-950 text-blue-100  placeholder:text-[1.00rem] border mx-auto border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
							required
						/>
					</div>
					<div className="my-3">
						<input
							{...register('cpassword')}
							placeholder="Confirm Password"
							type="password"
							required
							className="w-[90%]  placeholder:text-[1.00rem] mx-auto bg-sky-950 border text-blue-100 border-slate-600   sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block p-2.5 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
						/>
					</div>
					<div className="flex flex-row justify-between w-[100%]">
						<div className="my-1">
							<button
								type="submit"
								id="sub"
								className="p-2 px-3 m-2 border-2 rounded-md text-slate-100 border-sky-200 bg-sky-950 ">
								Next
							</button>
						</div>
						<div className="flex items-center my-1">
							<Switcher10 onCheckboxChange={setUserType} />
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
