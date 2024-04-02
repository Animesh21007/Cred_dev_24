import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/cartSlices';
import Requests from '../../api/ApiList';
import { toast } from 'react-toastify';
import { log } from 'react-modal/lib/helpers/ariaAppHider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const loggedinStatus = useSelector((state) => state.cart.loginStatus);
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => {
		Requests.login(data)
			.then((res) => {
				localStorage.setItem('token', res.data.access);
				toast.success('Logged in Successfully!');
				dispatch(setLogin());
				navigate('/events');
				console.log(res);
			})
			.catch((err) => {
				if (err.response) {
					toast.error(err.response.data.detail);
				} else {
					toast.error('There was error while Login!');
				}
			});
	};

	return (
		<div className="grid mx-auto rounded-md  place-items-center w-[100%] h-[100%] bg-gradient-to-t from-[#09203f] to-[#537895]">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-[300px] h-[400px] flex justify-center flex-col p-2 px-4">
				<div className="my-1">
					<div className="flex flex-col">
						<label
							htmlFor="
						username"
							className="text-lg text-slate-200">
							Username
						</label>
						<input
							{...register('username', { maxLength: 15 })}
							placeholder="Username"
							className="bg-slate-700 text-white placeholder:text-[1.07rem] border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] mx-0 p-2 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-[Poppins]"
							required
						/>
					</div>
				</div>
				<div className="my-1">
					<label
						htmlFor="pass"
						className="block text-sm font-medium leading-6 text-slate-100 ">
						Password
					</label>
					<input
						{...register('password', { maxLength: 20 })}
						id="pass"
						required=""
						type="password"
						className="font-[Poppins] bg-slate-700 text-white placeholder:text-[1.07rem] border border-gray-300 sm:text-sm rounded-lg focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500 block w-[90%] mx-0 p-2 dark:bg-gray-700 dark:border-blue-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					/>
				</div>
				<button
					className="my-3 border-2 cursor-pointer focus:border-2 w-[40%] rounded-md text-white mx-auto py-1"
					type="submit">
					Login
				</button>
				<Link
					to="/forgotpass"
					className="w-[100%] flex flex-row items-center underline text-blue-300">
					Forgot password?
					<svg
						className="pt-1 feather feather-arrow-right"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="5" y1="12" x2="19" y2="12" />
						<polyline points="12 5 19 12 12 19" />
						<line
							xmlns="http://www.w3.org/2000/svg"
							x1="5"
							y1="12"
							x2="19"
							y2="12"
						/>
						<polyline
							xmlns="http://www.w3.org/2000/svg"
							points="12 5 19 12 12 19"
						/>
					</svg>
				</Link>
			</form>
		</div>
	);
};

export default Login;
