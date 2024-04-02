import Requests from '../../api/ApiList';
const Table = ({ data, handleConfirm }) => {
	return (
		<div className="container bg-black">
			<table>
				<tbody className="border-1">
					<tr className="border-1 ">
						<th>Name</th>
						<th>UserName</th>
						<th>Transaction-Id</th>
						<th>Amount</th>
						<th>Date</th>
						<th>Events</th>
						<th>Status</th>
						<th>Payment</th>
					</tr>
					{data.map((item) => (
						<tr
							key={item.id}
							style={{ borderStyle: 'solid', borderWidth: '1px' }}>
							<td>{item.full_name}</td>
							<td>{item.username}</td>
							<td>{item.transaction_id}</td>
							<td>{item.cost}</td>
							<td>{item.date}</td>
							<td>{item.events}</td>
							<td>{item.status}</td>
							<td>
								{item.status === 'Pending' && (
									<button
										className="td-button"
										onClick={() => handleConfirm(item.transaction_id)}>
										Confirm Payment
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
