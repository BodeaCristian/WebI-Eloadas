import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [mozik, setMozik] = useState([]);
  const [nev, setNev] = useState("");
  const [message, setMessage] = useState("");
  const [varos, setVaros] = useState("");
  const [ferohely, setFerohely] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
      fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("api.php");
    setMozik(Array.isArray(res.data?.readData) ? res.data.readData : []);
  };

  const submit = async () => {
   var res;
    if (editId) {
        res = await axios.put("api.php", { id: editId, nev, varos, ferohely: Number(ferohely) });
      setEditId(null);
    } else {
        res = await axios.post("api.php", { nev, varos, ferohely: Number(ferohely) });
    }
    setMessage(res.data.status);
      setNev("");
      setVaros("");
      setFerohely("");
    fetchUsers();  
  };

    const editUser = (mozi) => {
      setEditId(mozi.id);
      setNev(mozi.nev);
      setVaros(mozi.varos);
      setFerohely(String(mozi.ferohely));
  };

  const deleteUser = async (id) => {
    const res = await axios.delete("api.php", {data:{id}});
    setMessage(res.data.error ? `${res.data.status} (${res.data.error})` : res.data.status);
    fetchUsers();
  };

  return (
    <div className="container mt-5">
      <p>{message}</p>
      <h3 className="mb-3">Mozi CRUD Axios (React + PHP)</h3>
      <div className="input-group mb-3">
        <input className="form-control" value={nev} onChange={(e) => setNev(e.target.value)} placeholder="mozi neve" />
        <input className="form-control" value={varos} onChange={(e) => setVaros(e.target.value)} placeholder="varos" />
        <input className="form-control" type="number" min="1" value={ferohely} onChange={(e) => setFerohely(e.target.value)} placeholder="ferohely" />
        <button className="btn btn-primary" onClick={submit}> {editId ? "Update" : "Add"}</button>
      </div>
      <table className="table table-bordered">
        <thead className="table-dark">
            <tr>
                <th>Id</th>
                <th>Mozi neve</th>
                <th>Varos</th>
                <th>Ferohely</th>
                <th width="150">Actions</th>
            </tr>
        </thead>
        <tbody>
        {mozik.map((mozi) => (
          <tr key={mozi.id}>
              <td>{mozi.id}</td>
              <td>{mozi.nev}</td>
              <td>{mozi.varos}</td>
              <td>{mozi.ferohely}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => editUser(mozi)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteUser(mozi.id)}>Delete</button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;