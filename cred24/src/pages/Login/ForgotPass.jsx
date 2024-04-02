import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Requests from '../../api/ApiList';
import { toast } from 'react-toastify';

const ForgotPass = () => {
	const { register, handleSubmit, formState: errors } = useForm();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		Requests.forgetPassword(data)
			.then((res) => {
				// console.log(res);
				toast.success('Email sent succesfully');
				// navigate('/resetpass');
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className="w-[100vw] h-[100vh] grid place-items-center">
			<div className="border-1 md:w-[30%] sm:w-[80%] h-[400px] border-gray-600 rounded-lg mx-2 border-2 p-2 flex flex-col justify-center">
				<p className="my-5 text-xl font-semibold text-slate-500">
					Please Enter your Email to Continue A verification code will be sent
					on your Email
				</p>
				<div className="flex flex-row justify-center y-3">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-row justify-center">
							<svg
								className="w-4 h-4 m-auto text-gray-500 dark:text-gray-400"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 16">
								<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
								<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
							</svg>
							<div className="relative">
								<input
									{...register('email')}
									type="email"
									id="floating_outlined"
									className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-2 focus:ring-2 focus:border-blue-600 peer"
									placeholder=" "
								/>
								<label
									for="floating_outlined"
									className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
									Email
								</label>
							</div>
						</div>
						<button
							className="ring-2 mx-auto rounded-lg m-2 bg-blue-800 text-slate-100 px-1 py-1 w-[50%] my-3"
							type="submit">
							Send Reset Link
						</button>
					</form>
				</div>
				<button onClick={navigate('/login')}>Back to Login</button>
			</div>
		</div>
	);
};

export default ForgotPass;
