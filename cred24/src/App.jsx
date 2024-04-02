import { useState, Suspense } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from './pages/login/ForgotPass';
import Events from './pages/Events/Events';
import Cart from './pages/Cart/Cart';
import Footer from './components/Footer';
import Contact from './pages/Contact/Contact';
import LoginPage from './pages/login/LoginPage';
import About from './pages/About/About';
import Navbar from './components/Navbar';
import Profile from './pages/profile/Profile';
import Payment from './pages/payment/Payment';
import ResetPass from './pages/login/ResetPass';
import PassPayment from './pages/payment/PassPayment';
import Loader from './components/Loader';
import Sponsors from './pages/Sponsors/Sponsors';
import WebTeam from './pages/Web-Team/WebTeam';
import Admin from './pages/Admin/Admin';
import Home from './pages/home/Home';
import LoginContext from './utils/loginContext/LoginContext';

function App() {
	const loggedIn = useSelector((state) => state.cart.loginStatus);
	return (
		<LoginContext.Provider value={loggedIn}>
			<ToastContainer />
			<div className=" md:grid">
				<Navbar />
				<div className="min-h-[80vh] mt-[5%] md:grid">
					<Suspense fallback={<Loader />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route
								path="/forget-password/:token/:uid"
								element={<ResetPass />}
							/>
							<Route path="/loginpage" element={<LoginPage />} />
							{<Route path="/events" element={<Events />} />}
							<Route path="/paymentpass" element={<PassPayment />} />
							<Route path="/register" element={<Register />} />
							<Route path="/forgotpass" element={<ForgotPass />} />
							{loggedIn && <Route path="/profile" element={<Profile />} />}
							<Route path="/admin" element={<Admin />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/sponsors" element={<Sponsors />} />
							<Route path="/cart" element={<Cart />} />
							{loggedIn && <Route path="/payment" element={<Payment />} />}
						</Routes>
					</Suspense>
				</div>
				<Footer />
			</div>
		</LoginContext.Provider>
	);
}
export default App;
