const list = document.getElementById('planet-list');
const form = document.getElementById('planet-form');

async function fetchPlanets() {
  const res = await fetch('/api/planet');
  const data = await res.json();
  list.innerHTML = data.map(p => `<div>${p.name} - ${p.system} - ${p.climate} - ${p.population}</div>`).join('');
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const formData = new FormData(form);
  const planet = Object.fromEntries(formData.entries());
  planet.population = Number(planet.population);
  await fetch('/api/planet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(planet)
  });
  form.reset();
  fetchPlanets();
});

fetchPlanets();
