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
<div></div>
  );
}

export default App;