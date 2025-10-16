const api = 'http://localhost:3000/api/planets';
const form = document.getElementById('planetForm');
const table = document.querySelector('#planetTable tbody');
const message = document.getElementById('message'); // элемент для уведомлений

function showMessage(text) {
  message.textContent = text;
  setTimeout(() => { message.textContent = ''; }, 3000);
}

form.addEventListener('submit', async e => {
  e.preventDefault();

  const id = document.getElementById('planetId').value;
  const name = document.getElementById('name').value.trim();
  const system = document.getElementById('system').value.trim();
  const climate = document.getElementById('climate').value.trim();
  const population = parseInt(document.getElementById('population').value);

  if (!name  !system  !climate  isNaN(population)  population < 0) {
    alert('Proszę wypełnić wszystkie pola poprawnie!');
    return;
  }

  const data = { name, system, climate, population };

  try {
    if(id) {
      await fetch(`${api}/${id}`, {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      showMessage('Planet updated!');
    } else {
      await fetch(api, {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(data)
      });
      showMessage('Planet added!');
    }
    document.getElementById('planetId').value='';
    form.reset();
    loadPlanets();
  } catch (err) {
    alert('Błąd podczas zapisu danych: ' + err.message);
  }
});

async function loadPlanets() {
  try {
    const res = await fetch(api);
    const planets = await res.json();
    table.innerHTML='';
    planets.forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${p.id}</td><td>${p.name}</td><td>${p.system}</td><td>${p.climate}</td><td>${p.population}</td>
      <td><button onclick="edit(${p.id})">Edit</button> <button onclick="del(${p.id})">Delete</button></td>`;
      table.appendChild(tr);
    });
  } catch (err) {
    alert('Błąd podczas pobierania danych: ' + err.message);
  }
}

async function edit(id) {
  try {
    const res = await fetch(`${api}/${id}`);
    const p = await res.json();
    document.getElementById('planetId').value = p.id;
    document.getElementById('name').value = p.name;
    document.getElementById('system').value = p.system;
    document.getElementById('climate').value = p.climate;
    document.getElementById('population').value = p.population;
  } catch (err) {
    alert('Błąd podczas pobierania danych: ' + err.message);
  }
}

async function del(id) {
  try {
    await fetch(`${api}/${id}`, { method:'DELETE' });
    showMessage('Planet deleted!');
    loadPlanets();
  } catch (err) {
    alert('Błąd podczas usuwania: ' + err.message);
  }
}

loadPlanets();