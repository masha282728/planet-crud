const form = document.getElementById("planetForm");
const list = document.getElementById("planetList");
let editId = null;

async function fetchPlanets() {
  const res = await fetch("/api/planet");
  const planets = await res.json();
  list.innerHTML = "";
  planets.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} | ${p.system} | ${p.climate} | ${p.population} | ${p.surfaceType}`;
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => fillForm(p);
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deletePlanet(p.id);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function fillForm(p) {
  form.name.value = p.name;
  form.system.value = p.system;
  form.climate.value = p.climate;
  form.population.value = p.population;
  form.surfaceType.value = p.surfaceType;
  editId = p.id;
}

form.onsubmit = async e => {
  e.preventDefault();
  const data = {
    name: form.name.value,
    system: form.system.value,
    climate: form.climate.value,
    population: parseInt(form.population.value),
    surfaceType: form.surfaceType.value
  };
  if (editId) {
    await fetch(`/api/planet/${editId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    editId = null;
  } else {
    await fetch("/api/planet", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  }
  form.reset();
  fetchPlanets();
};

async function deletePlanet(id) {
  await fetch(`/api/planet/${id}`, { method: "DELETE" });
  fetchPlanets();
}

fetchPlanets();
