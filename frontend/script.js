const API = '/api/planet';

let editingId = null;

const $ = (id) => document.getElementById(id);
const form = $('planet-form');
const btnSubmit = $('submit-btn');
const btnReset = $('reset-btn');
const tbody = document.querySelector('#planets-table tbody');

function readForm() {
  return {
    name: $('name').value.trim(),
    system: $('system').value.trim(),
    climate: $('climate').value.trim(),
    population: $('population').value ? Number($('population').value) : null,
    diameter: $('diameter').value ? Number($('diameter').value) : null,
    orbital_period: $('orbital_period').value ? Number($('orbital_period').value) : null,
  };
}

function fillForm(p) {
  $('name').value = p.name ?? '';
  $('system').value = p.system ?? '';
  $('climate').value = p.climate ?? '';
  $('population').value = p.population ?? '';
  $('diameter').value = p.diameter ?? '';
  $('orbital_period').value = p.orbital_period ?? '';
}

function resetForm() {
  form.reset();
  editingId = null;
  btnSubmit.textContent = 'Add Planet';
}

async function loadPlanets() {
  const res = await fetch(API);
  const data = await res.json();
  renderTable(data);
}

function renderTable(planets) {
  tbody.innerHTML = '';
  planets.forEach((p) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.system}</td>
      <td>${p.climate ?? '-'}</td>
      <td>${p.population ?? '-'}</td>
      <td>${p.diameter ?? '-'}</td>
      <td>${p.orbital_period ?? '-'}</td>
      <td>
        <button data-id="${p.id}" class="edit">Edit</button>
        <button data-id="${p.id}" class="del">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

tbody.addEventListener('click', async (e) => {
  const btn = e.target;
  const id = btn.dataset.id;
  if (!id) return;

  if (btn.classList.contains('edit')) {
    const res = await fetch(`${API}/${id}`);
    const p = await res.json();
    editingId = id;
    fillForm(p);
    btnSubmit.textContent = 'Save';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (btn.classList.contains('del')) {
    if (!confirm('Delete?')) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    await loadPlanets();
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = readForm();

  if (editingId) {
    await fetch(`${API}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  resetForm();
  await loadPlanets();
});

btnReset.addEventListener('click', resetForm);

document.addEventListener('DOMContentLoaded', loadPlanets);
