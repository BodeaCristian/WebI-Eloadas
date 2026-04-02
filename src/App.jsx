import React, { useEffect, useState } from "react";
import AddMoziForm from "./forms/AddMoziForm";
import EditMoziForm from "./forms/EditMoziForm";
import MoziTable from "./tables/MoziTable";

const App = () => {
    const [mozis, setMozis] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentMozi, setCurrentMozi] = useState({
        id: null,
        nev: "",
        varos: "",
        ferohely: "",
    });

    useEffect(() => {
        fetch(new URL("../data/mozi.txt", import.meta.url))
            .then((response) => response.text())
            .then((text) =>
                setMozis(
                    text
                        .trim()
                        .split(/\r?\n/)
                        .slice(1)
                        .map((line) => {
                            const [id, nev, varos, ferohely] = line.split("\t");
                            return { id: Number(id), nev, varos, ferohely: Number(ferohely) };
                        })
                )
            );
    }, []);

    const addMozi = (mozi) => {
        mozi.id = mozis.length + 1;
        setMozis([...mozis, mozi]);
    };


    };

    const updateMozi = (id, updatedMozi) => {
        setEditing(false);
        setMozis(mozis.map((mozi) => (mozi.id === id ? updatedMozi : mozi)));
    };


    return (
        <div className="container mt-5">
            
            <hr className="my-4" />
            <div className="mb-4">
                <h2 className="h4 mb-3">{editing ? "Mozi szerkesztese" : "Mozi hozzaadasa"}</h2>
                {!editing ? (
                    <AddMoziForm addMozi={addMozi} />
                ) : (
                    <EditMoziForm
                        setEditing={setEditing}
                        currentMozi={currentMozi}
                        updateMozi={updateMozi}
                    />
                )}
            </div>
            <div>
                <h2 className="h4 mb-3">Mozik listaja</h2>
                <MoziTable mozis={mozis} editRow={editRow} deleteMozi={deleteMozi} />
            </div>
        </div>
    );
};

export default App;

