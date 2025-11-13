const api = window.location.origin + "/api/planets";
console.log("api", api)
const form = document.getElementById('planetForm');
const table = document.querySelector('#planetTable tbody');
const errorBox = document.getElementById('errorBox');

async function loadPlanets() {
  const res = await fetch(api);
  const planets = await res.json();
  table.innerHTML = '';
  planets.forEach(p => {
    const tr = document.createElement('tr');
    tr.classList.add('fade-in');
    tr.innerHTML = `
      <td>${p.id}</td>
      <td><b>${p.name}</b></td>
      <td>${p.system}</td>
      <td>${p.climate}</td>
      <td>${p.population.toLocaleString()}</td>
      <td>
        <button class="edit-btn" onclick="edit(${p.id})">✏️</button>
        <button class="delete-btn" onclick="del(${p.id}, this)">🗑️</button>
      </td>
    `;
    table.appendChild(tr);
  });
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  errorBox.innerHTML = '';
  const id = document.getElementById('planetId').value;
  const data = {
    name: document.getElementById('name').value.trim(),
    system: document.getElementById('system').value.trim(),
    climate: document.getElementById('climate').value.trim(),
    population: parseInt(document.getElementById('population').value)
  };
  if (!data.name || data.name.length < 3 || data.name.length > 50) {
    return showError('Nazwa planety musi mieć od 3 do 50 znaków.');
  }
  if (!data.system) {
    return showError('System planety jest wymagany.');
  }
  if (isNaN(data.population) || data.population <= 0) {
    return showError('Populacja musi być liczbą większą niż 0.');
  }
  const method = id ? 'PUT' : 'POST';
  const url = id ? `${api}/${id}` : api;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (err.fieldErrors) {
      err.fieldErrors.forEach(f => showError(f.message));
    } else {
      showError(err.message || 'Błąd zapisu danych.');
    }
    return;
  }
  form.reset();
  document.getElementById('planetId').value = '';
  loadPlanets();
});

function showError(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  p.classList.add('error');
  errorBox.appendChild(p);
}

async function edit(id) {
  const res = await fetch(`${api}/${id}`);
  const p = await res.json();
  document.getElementById('planetId').value = p.id;
  document.getElementById('name').value = p.name;
  document.getElementById('system').value = p.system;
  document.getElementById('climate').value = p.climate;
  document.getElementById('population').value = p.population;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function del(id, btn) {
  if (!confirm('Na pewno chcesz usunąć tę planetę?')) return;
  const row = btn.closest('tr');
  row.classList.add('fade-out');
  setTimeout(async () => {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    loadPlanets();
  }, 400);
}

loadPlanets();
