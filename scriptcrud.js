var selectedIndex = null;
var array1 = []; // Ebben a tombben tárolom a mozi rekordokat
loadMoziData();

async function loadMoziData() {
    try {
        var response = await fetch("data/mozi.txt");
        if (!response.ok) {
            throw new Error("A mozi.txt nem olvasható");
        }
        var text = await response.text();
        array1 = parseMoziTxt(text);
        printArray();
    } catch (error) {
        console.error("Hiba a mozi adatok betöltésekor:", error);
    }
}

function parseMoziTxt(text) {
    var lines = text
        .split(/\r?\n/)
        .map(function (line) { return line.trim(); })
        .filter(function (line) { return line.length > 0; });

    if (lines.length <= 1) {
        return [];
    }

    var dataLines = lines.slice(1); 
    var parsed = [];

    for (var i = 0; i < dataLines.length; i++) {
        var columns = dataLines[i].split("\t");
        if (columns.length < 4) {
            continue;
        }

        parsed.push({
            id: Number(columns[0]),
            nev: columns[1],
            varos: columns[2],
            ferohely: Number(columns[3])
        });
    }

    return parsed;
}


function printArray() {
    var table = document.getElementById("mozilista").getElementsByTagName('tbody')[0];
    table.innerHTML = "";
    var newRow;
    for (var i = 0; i < array1.length; i++) {
        newRow = table.insertRow(table.length);
        var cell1 = newRow.insertCell(0);
        cell1.innerHTML = array1[i].id;
        var cell2 = newRow.insertCell(1);
        cell2.innerHTML = array1[i].nev;
        var cell3 = newRow.insertCell(2);
        cell3.innerHTML = array1[i].varos;
        var cell4 = newRow.insertCell(3);
        cell4.innerHTML = array1[i].ferohely;
        var cell5 = newRow.insertCell(4);
        cell5.innerHTML = '<button type="button" class="btn btn-warning btn-sm me-1" onClick="onEdit(' + i + ')">Edit</button>' + '<button type="button" class="btn btn-danger btn-sm" onClick="onDelete(' + i + ')">Delete</button>';

    }
}
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedIndex == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["id"] = Number(document.getElementById("id").value);
    formData["nev"] = document.getElementById("nev").value;
    formData["varos"] = document.getElementById("varos").value;
    formData["ferohely"] = Number(document.getElementById("ferohely").value);
    return formData;
}
function insertNewRecord(data) {
    if (!data.id) {
        data.id = getNextMoziId();
    }
    array1.push({ "id": data.id, "nev": data.nev, "varos": data.varos, "ferohely": data.ferohely });
    printArray();
}

function getNextMoziId() {
    if (array1.length === 0) {
        return 1;
    }

    var maxId = array1[0].id;
    for (var i = 1; i < array1.length; i++) {
        if (array1[i].id > maxId) {
            maxId = array1[i].id;
        }
    }

    return maxId + 1;
}
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("nev").value = "";
    document.getElementById("varos").value = "";
    document.getElementById("ferohely").value = "";
    document.getElementById("submitBtn").textContent = "Add";
    selectedIndex = null;
}
function onEdit(index) {
    document.getElementById("id").value = array1[index].id;
    document.getElementById("nev").value = array1[index].nev;
    document.getElementById("varos").value = array1[index].varos;
    document.getElementById("ferohely").value = array1[index].ferohely;
    document.getElementById("submitBtn").textContent = "Update";
    selectedIndex = index;
}
function updateRecord(formData) {
    array1[selectedIndex].id = formData.id;
    array1[selectedIndex].nev = formData.nev;
    array1[selectedIndex].varos = formData.varos;
    array1[selectedIndex].ferohely = formData.ferohely;
    printArray();
}
function onDelete(index) {
    if (confirm('Biztosan törlöd a rekordot?')) {
        array1.splice(index, 1);
        resetForm();
        printArray();
    }
}
function validate() {
    var isValid = true;
    var nevValue = document.getElementById("nev").value.trim();
    var varosValue = document.getElementById("varos").value.trim();
    var ferohelyValue = Number(document.getElementById("ferohely").value);

    if (nevValue === "" || varosValue === "" || !Number.isFinite(ferohelyValue) || ferohelyValue <= 0) {
        isValid = false;
        document.getElementById("nevValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nevValidationError").classList.contains("hide"))
            document.getElementById("nevValidationError").classList.add("hide");
    }
    return isValid;
}