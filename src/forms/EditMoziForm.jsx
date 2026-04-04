import React, { useEffect, useState } from "react";

const EditMoziForm = (props) => {
	const [mozi, setMozi] = useState(props.currentMozi);

	useEffect(() => {
		setMozi(props.currentMozi);
	}, [props.currentMozi]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setMozi({ ...mozi, [name]: name === "ferohely" ? Number(value) : value });
	};

	return (
		<form
			className="mb-3"
			onSubmit={(event) => {
				event.preventDefault();
				props.updateMozi(mozi.id, mozi);
			}}
		>
			<div className="input-group mb-2">
				<input className="form-control" type="text" name="nev" value={mozi.nev || ""} onChange={handleInputChange} placeholder="mozi neve" />
				<input className="form-control" type="text" name="varos" value={mozi.varos || ""} onChange={handleInputChange} placeholder="varos" />
				<input className="form-control" type="number" name="ferohely" min="1" value={mozi.ferohely || ""} placeholder="ferohely" onChange={handleInputChange}/>
				
				<button className="btn btn-primary" type="submit">Update</button>
			</div>
			<button type="button" className="btn btn-secondary" onClick={() => props.setEditing(false)}>Cancel</button>
		</form>
	);
};

export default EditMoziForm;
