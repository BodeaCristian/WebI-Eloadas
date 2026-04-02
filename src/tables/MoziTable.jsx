import React from "react";

const MoziTable = (props) => (
	<table className="table table-bordered">
		<thead className="table-dark">
			<tr>
				<th>ID</th>
				<th>Nev</th>
				<th>Varos</th>
				<th>Ferohely</th>
				<th width="150">Actions</th>
			</tr>
		</thead>
		<tbody>
			{props.mozis.length > 0 ? (
				props.mozis.map((mozi) => (
					<tr key={mozi.id}>
						<td>{mozi.id}</td>
						<td>{mozi.nev}</td>
						<td>{mozi.varos}</td>
						<td>{mozi.ferohely}</td>
						<td>
							<button className="btn btn-warning btn-sm me-1" onClick={() => props.editRow(mozi)}>Edit</button>
							<button className="btn btn-danger btn-sm" onClick={() => props.deleteMozi(mozi.id)}>Delete</button>
						</td>
					</tr>
				))
			) : (
				<tr>
					<td colSpan={5}>Nincs mozi</td>
				</tr>
			)}
		</tbody>
	</table>
);

export default MoziTable;
