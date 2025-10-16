const api = 'http://localhost:3000/api/planets';
const form = document.getElementById('planetForm');
const table = document.querySelector('#planetTable tbody');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('planetId').value;
  const data = {
    name: document.getElementById('name').value,
    system: document.getElementById('system').value,
    climate: document.getElementById('climate').value,
    population: parseInt(document.getElementById('population').value)
  };
  if(id) await fetch(`${api}/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  else await fetch(api, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
  document.getElementById('planetId').value='';
  form.reset();
  loadPlanets();
});
async function loadPlanets() {
  const res = await fetch(api);
  const planets = await res.json();
  table.innerHTML='';
  planets.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${p.id}</td><td>${p.name}</td><td>${p.system}</td><td>${p.climate}</td><td>${p.population}</td>
    <td><button onclick="edit(${p.id})">Edit</button> <button onclick="del(${p.id})">Delete</button></td>`;
    table.appendChild(tr);
  });
}
async function edit(id) {
  const res = await fetch(`${api}/${id}`);
  const p = await res.json();
  document.getElementById('planetId').value = p.id;
  document.getElementById('name').value = p.name;
  document.getElementById('system').value = p.system;
  document.getElementById('climate').value = p.climate;
  document.getElementById('population').value = p.population;
}
async function del(id) {
  await fetch(`${api}/${id}`, { method:'DELETE' });
  loadPlanets();
}
loadPlanets();
