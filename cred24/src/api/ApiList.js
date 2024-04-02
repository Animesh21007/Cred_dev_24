import axios from 'axios';

// const url = 'http://192.168.182.139:8000/api';
const url = 'http://localhost:8000/api';
// const url = 'https://availability-kuwait-space-gregory.trycloudflare.com/api';

const axiosInstance = axios.create({
	// baseUrl: 'https://api.credenz.in/api',
	baseURL: url,
});

const register = (data) => {
	return axiosInstance.post(`/register/`, data, { headers: {} });
};

const login = (data) => axiosInstance.post(`/login/`, data, { headers: {} });

const profile = () =>
	axiosInstance.get(`/profile/`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});

const order = (data) =>
	axiosInstance.post(`/placeorder/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const orderPass = (data) =>
	axiosInstance.post(`/order-pass/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const resetPassword = (data) =>
	axiosInstance.post(`/password-reset-confirm/`, data, { headers: {} });
const forgetPassword = (data) =>
	axiosInstance.post(`/password-reset/`, data, { headers: {} });
const createTeam = (data) =>
	axiosInstance.post(`/generate-team/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const joinTeam = (data) =>
	axiosInstance.post(`/join-team/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const viewTeam = () =>
	axiosInstance.get(`/view-team/`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const adminUpload = (data) =>
	axiosInstance.post(`/upload-file/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const adminOrder = (data) =>
	axiosInstance.post(`/offline-order/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const adminTable = () =>
	axiosInstance.get(`/transaction-list/`, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const adminConfirm = (data) =>
	axiosInstance.post(`/transaction-confirm/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const adminPass = (data) =>
	axiosInstance.post(`/event-pass/`, data, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
	});
const feedback = (data) =>
	axiosInstance.post(`/feedback/`, data, { headers: {} });
const leaderboard = () => axiosInstance.get(`/leaderboard/`, { headers: {} });
// const rc = (data) => axiosInstance.post(`/rc-api/`, data, { headers: {} });
8459320663;
const Requests = {
	register, //
	login, //
	profile, //
	order, //
	orderPass, //
	resetPassword, //
	forgetPassword, //
	viewTeam, //
	createTeam, //
	joinTeam, //
	adminUpload,
	adminOrder,
	adminTable,
	adminConfirm,
	adminPass,
	feedback,
	leaderboard, //Not implemented
};

export default Requests;
