import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Requests from '../../api/ApiList';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPass = () => {
	const { token, uid } = useParams();
	const { register, handleSubmit } = useForm();
	const onReset = (data) => {
		if (data.new_password !== data.confirm_password) {
			toast.warning('Passwords do not match!');
		} else {
			delete data.confirm_password;

			Requests.resetPassword({ token, uid, ...data })
				.then((res) => console.log(res))
				.catch((err) => console.log(err));
		}
	};
	return (
		<div className="w-[100%] h-[100%] grid items-center">
			<form
				onSubmit={handleSubmit(onReset)}
				className="w-[50%] border-2 rounded-md">
				<input
					{...register('new_password', { maxLength: 20 })}
					id="pass"
					required=""
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
				<input
					{...register('confirm_password', { maxLength: 20 })}
					id="confirm_pass"
					required=""
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-[90%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				/>
				<button type="submit" className="px-2 py-1 border-2 rounded-md ">
					Confirm
				</button>
			</form>
		</div>
	);
};

export default ResetPass;
