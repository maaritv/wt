
function addNewPlant(name, findDate, natEnv) {
  if (name === '' || findDate === '') {
    alert("Vähintään nimi ja löytöaika pitää antaa")
    return
  }

  let plantObject = {
    name: name,
    findDate: findDate,
    natEnv: natEnv
  }

  let plantObjectAsText = JSON.stringify(plantObject)
  alert("luotu uusi kasvi " + plantObjectAsText)
  let tbody = document.querySelector("#plantsTable tbody");
  alert(tbody.children.length)
  let newRow = document.createElement("tr");

  let cell1 = document.createElement("td");
  cell1.textContent = plantObject.name;
  
  let cell2 = document.createElement("td");
  cell2.textContent = plantObject.findDate.toString();

  let cell3 = document.createElement("td");
  cell3.textContent = plantObject.natEnv;

  // Lisätään solut riviin
  newRow.append(cell1, cell2, cell3);

  // Lisätään uusi rivi taulukon tbody-osaan
  tbody.append(newRow);
  //TYhjennetään lopuksi lomake uutta täyttöä varten.
  document.getElementById("plantForm").reset();
}
