import React, { isValidElement } from 'react';

const Tickets = ({ profileInfo }) => {
	console.log(profileInfo.map((item) => console.log(item)));
	return (
		<div>
			<div className=" tickets max-h-[450px] overflow-y-scroll [&::-webkit-scrollbar]:[width:2px] ">
				{profileInfo.map((val) => (
					<div
						key={val.id}
						className="p-2 px-4 m-2 my-6 border-4 border-dashed rounded-l border-slate-600 md:w-[70%] w-[90%] mx-auto">
						<div className="flex flex-row justify-between my-2 text-center">
							<p className="text-xl text-teal-300">{val.event.event_name}</p>

							<p
								className={`${
									val.payment === 'CO' ? 'text-green-600' : 'text-yellow-400'
								}`}>
								{val.payment === 'CO' ? 'Order Completed' : 'Order pending'}
							</p>
						</div>
						<div>
							<div className="flex flex-row justify-between ">
								<h2 className="m-1 border-b-2 border-t-2 w-[fit-content] text-blue-400 border-slate-400">
									Order Details
								</h2>
								<p className="mx-2">&#8377;{val.event.event_cost}</p>
							</div>
							<div className="flex flex-row items-center justify-between p-2 my-2 text-lg text-center border-t-2 border-slate-700 font-[monospace]">
								<div className="p-2 py-2 text-left md:border-0 border-l-">
									<p className="text-blue-300">Order palced by:</p>
									<p className="text-slate-300">{val.user.username}</p>
									<p className="pt-2 text-blue-300">Date:</p>
									<p className="text-slate-300">{val.order_date}</p>
								</div>
								<div className="flex flex-col justify-around p-2 h-[100%] md:justify-center ">
									<p className="text-blue-300">Transaction ID: </p>
									<p className="mb-6 text-slate-300 md:mb-0">
										{' '}
										{val.transaction_id}
									</p>
									<p className="pt-2 text-blue-300">Mode:</p>
									<p className="text-slate-300">{val.order_taker}</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Tickets;
