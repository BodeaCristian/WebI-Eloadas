const api = "api.php";
let currentMozik = [];

window.onload = function () {
    fetchMozi();
};

async function fetchMozi() {
    const response = await fetch(api);
    const data = await response.json();

    document.getElementById("crudMessage").innerText = data.status || "";
    currentMozik = data.readData || [];
    const tbody = document.getElementById("mozilista").getElementsByTagName("tbody")[0];
    let rows = "";

    currentMozik.forEach((mozi) => {
        rows += `
            <tr>
                <td>${mozi.id}</td>
                <td>${mozi.nev}</td>
                <td>${mozi.varos}</td>
                <td>${mozi.ferohely}</td>
                <td>
                    <button type="button" class="btn btn-warning btn-sm me-1" onClick="onEdit(${mozi.id})">Edit</button>
                    <button type="button" class="btn btn-danger btn-sm" onClick="onDelete(${mozi.id})">Delete</button>
                </td>
            </tr>`;
    });

    tbody.innerHTML = rows;
}

function validate() {
    const nev = document.getElementById("nev").value.trim();
    const varos = document.getElementById("varos").value.trim();
    const ferohely = Number(document.getElementById("ferohely").value);

    const isValid = nev !== "" && varos !== "" && Number.isFinite(ferohely) && ferohely > 0;
    document.getElementById("nevValidationError").classList.toggle("hide", isValid);
    return isValid;
}

function readFormData() {
    return {
        id: document.getElementById("id").value,
        nev: document.getElementById("nev").value,
        varos: document.getElementById("varos").value,
        ferohely: Number(document.getElementById("ferohely").value)
    };
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("nev").value = "";
    document.getElementById("varos").value = "";
    document.getElementById("ferohely").value = "";
    document.getElementById("submitBtn").textContent = "Add";
}

async function onFormSubmit() {
    if (!validate()) {
        return;
    }

    const formData = readFormData();
    const method = formData.id ? "PUT" : "POST";

    const response = await fetch(api, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });
    const data = await response.json();

    document.getElementById("crudMessage").innerText = data.status || "";
    resetForm();
    await fetchMozi();
}

function onEdit(id) {
    const mozi = currentMozik.find((item) => Number(item.id) === Number(id));
    if (!mozi) {
        return;
    }
    document.getElementById("id").value = mozi.id;
    document.getElementById("nev").value = mozi.nev;
    document.getElementById("varos").value = mozi.varos;
    document.getElementById("ferohely").value = mozi.ferohely;
    document.getElementById("submitBtn").textContent = "Update";
}

async function onDelete(id) {
    if (!confirm("Biztosan torlod a rekordot?")) {
        return;
    }

    const response = await fetch(api, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    });
    const data = await response;

    document.getElementById("crudMessage").innerText = data.status || "";
    await fetchMozi();
}

