import React,{useState} from "react";

const AddMoziForm = (props) => {
	const [mozi, setMozi] = useState({ nev: "", varos: "", ferohely: "" });
	const [showError, setShowError] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setMozi({ ...mozi, [name]: value });
	};


	return (
		<form
			className="mb-3"
			onSubmit={(event) => {
				event.preventDefault();
				if (!mozi.nev || !mozi.varos || !mozi.ferohely) {
					setShowError(true);
					return;
				}
				setShowError(false);
				props.addMozi({ ...mozi, ferohely: Number(mozi.ferohely) });
				setMozi({ nev: "", varos: "", ferohely: "" });
			}}
		>
			<div className="input-group mb-2">
				<input className="form-control" type="text" name="nev" value={mozi.nev} onChange={handleInputChange} placeholder="mozi neve" />
				<input className="form-control" type="text" name="varos" value={mozi.varos} onChange={handleInputChange} placeholder="varos" />
				<input className="form-control" type="number" name="ferohely" min="1" value={mozi.ferohely} onChange={handleInputChange} placeholder="ferohely" />
				<button className="btn btn-primary" type="submit">Add</button>
			</div>
			{showError && <label className="validation-error">A nev, varos es ferohely megadasa kotelezo.</label>}
		</form>
	);
};

export default AddMoziForm;
