const outputCountries = document.querySelector('.countries');
const html = document.querySelector('html');
const mode = document.querySelector('#mode');

// mode theme
let theme = true; // default dalam kondisi light
mode.addEventListener('click', () => {
  if (theme) {
    html.classList.add('dark');
    renderTheme('light', false);
  } else {
    html.classList.remove('dark');
    renderTheme('dark', true);
  }
});
function renderTheme(text, condition) {
  theme = condition;
  mode.innerHTML = `
    <i class="fa-regular fa-moon -rotate-12"></i>
    <h4 class="text-sm font-semibold ml-2">${text} mode</h4>
  `;
}

// action dropdown
const titleOutput = document.querySelector('.title-output');
const btnAnimate = document.getElementById('btn-animate');
const regions = document.querySelectorAll('li');
const options = document.querySelector('.options');
// jika dropdown di click
btnAnimate.addEventListener('click', closeOpenDropdown);
regions.forEach((region) => {
  region.addEventListener('click', async () => {
    const regionTextData = region.innerText;
    titleOutput.innerText = regionTextData;
    // tutup dropdown jika pilih data region
    setTimeout(closeOpenDropdown, 100);
    // dan run get country berdasarkan region
    getByFilter('region', regionTextData);
  });
});
// animate dropdown nya
function closeOpenDropdown() {
  btnAnimate.classList.toggle('active-btn');
  options.classList.toggle('active-options');
}

// fungsi berdasarkan input && input per-character secara real time
const input = document.querySelector('input');
input.addEventListener('keyup', () => {
  getByFilter('name', input.value);
});
const search = document.querySelector('.search');
search.addEventListener('click', () => {
  // nanti kedepannya ini akan masuk ke detail aja karna cuman satu...
  getByFilter('name', input.value);
});

/* --------------- fungsi fungsi ----------------- */
//  Get api => secara dynamic
function getDataContries(filter = 'all') {
  const data = fetch(`https://restcountries.com/v3.1/${filter}`);
  return (
    data
      .then((bdy) => bdy.json())
      .then((res) => res)
      // jika err kita mau ngapain
      .catch((err) => err)
  );
}
// render start
async function renderStart() {
  const outputCountries = document.querySelector('.countries');
  let listRandomCountries = [];
  const getContries = await getDataContries();
  // get random data 8 countries
  for (let index = 0; index < 8; index++) {
    const result = get_random(getContries);
    listRandomCountries.push(result);
  }
  render(listRandomCountries, outputCountries);
}
// render berdarkan user mau apa ? region, input dll
async function getByFilter(filter, input) {
  try {
    const result = await getDataContries(`${filter}/${input}`);
    render(result, outputCountries);
  } catch (err) {
    // error by user
    outputCountries.innerHTML = `<h1 class = " w-full text-4xl text-center mt-8">country not found</h1>`;
  }
}
// fungsi render keluar
function render(params, outputCountries) {
  const countries = params.map((contry) => {
    const name = contry.name.common;
    const population = contry.population.toLocaleString('id-ID');
    const region = contry.region;
    const capital = contry.capital;
    const flags = contry.flags.png;

    return `
    <div class="country bg-slate-100 dark:bg-dark">
    <div class="country-images">
      <img src="${flags}" alt="indonesian" />
    </div>
    <div class="content px-6 py-4 bg-slate-100 dark:bg-dark">
      <div class="country-title font-extrabold">
        <h3>${name}</h3>
      </div>
      <div class="country-description mt-2 text-sm">
        <h4 class="font-semibold">population: <span class="font-light">${population}</span></h4>
        <h4 class="font-semibold">region: <span class="font-light">${region}</span></h4>
        <h4 class="font-semibold">capital: <span class="font-light">${capital}</span></h4>
      </div>
    </div>
  </div>
    `;
  });

  outputCountries.innerHTML = countries.join('');
}
// random
function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

renderStart();

// lanjut besok
