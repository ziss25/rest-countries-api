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
const search = document.querySelector('.search');
input.addEventListener('keyup', () => {
  getByFilter('name', input.value);
});
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
  elementClick();
}
// render berdarkan user mau apa ? region, input dll
async function getByFilter(filter, input, isDetail = false) {
  try {
    const result = await getDataContries(`${filter}/${input}`);
    if (isDetail === false) {
      render(result, outputCountries);
    } else {
      detailsComponents(result);
    }
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
    <div class="country border bg-white dark:bg-dark">
    <div class="country-images">
      <img class="w-full" src="${flags}" alt="indonesian" />
    </div>
    <div class="content px-6 py-4 bg-white dark:bg-dark">
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
  // console.log(countries);
  outputCountries.innerHTML = countries.join('');
}
// random
function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// detail components
const main = document.querySelector('main');
const body = document.querySelector('body');
function detailsComponents(params) {
  const name = params[0].name.common;
  const population = params[0].population.toLocaleString('id-ID');
  const region = params[0].region;
  const capital = params[0].capital;
  const flags = params[0].flags.png;
  const subRegion = params[0].subregion;
  const checked = params[0].name.nativeName;
  let nativeName;

  for (const key in checked) {
    if (Object.hasOwnProperty.call(checked, key)) {
      nativeName = checked[key].official;
    }
  }

  console.log(params);
  main.innerHTML = `
  <section class="details px-8 pt-8 pb-2 h-full ">
  <div class="btn-details w-20 flex justify-evenly items-center bg-white rounded-sm dark:bg-dark text-sm h-6 shadow-md md:w-24 md:justify-center">
    <i class="fa-solid fa-arrow-left-long text-dark-gray dark:text-very-light md:mr-4 text-xs"></i>
    <h3 class="font-semibold text-xs text-dark-gray dark:text-very-light">Back</h3>
  </div>
  <div class="content sm:flex sm:justify-between">
  <div class="image-details mt-4 lg:w-1/2">
  <img src="${flags}" alt="flags" />
</div>
<div class="description-details mt-4  lg:w-1/2">
  <div class="des-title font-extrabold">
    <h3>${name}</h3>
  </div>
  <div class="des-information1 mt-4">
    <h4 class="font-semibold text-xs mb-2">Native Name: <span class="font-light">${nativeName}</span></h4>
    <h4 class="font-semibold text-xs mb-2">population: <span class="font-light">${population}</span></h4>
    <h4 class="font-semibold text-xs mb-2">Region: <span class="font-light">${region}</span></h4>
    <h4 class="font-semibold text-xs mb-2">Sub Region: <span class="font-light">${subRegion}</span></h4>
    <h4 class="font-semibold text-xs mb-2">Capital: <span class="font-light">${capital}</span></h4>
  </div>
  <div class="des-information1 mt-4">
    <h4 class="font-semibold text-xs mb-2">Top Level Domain: <span class="font-light"></span></h4>
    <h4 class="font-semibold text-xs mb-2">Currencies: <span class="font-light">-</span></h4>
    <h4 class="font-semibold text-xs mb-2">Languages: <span class="font-light">-</span></h4>
  </div>
  <div class="border-countries mt-8">
    <div>
      <h3 class="text-sm font-bold tracking-wide">Border Countries :</h3>
    </div>
    <div class="btn-countries flex justify-between mt-[4px]">
      <button class="py-[2px] px-[20px] bg-white text-xs rounded-sm shadow-md">France</button>
      <button class="py-[2px] px-[20px] bg-white text-xs rounded-sm shadow-md">France</button>
      <button class="py-[2px] px-[20px] bg-white text-xs rounded-sm shadow-md">France</button>
    </div>
  </div>
</div>
  </div>
  
</section>
  `;
  // lanjut besok aja
}

renderStart();

// detailsComponents();
function elementClick() {
  const countryElements = document.querySelectorAll('.country');
  countryElements.forEach((country) => {
    country.addEventListener('click', () => {
      const NAME_COUNTRY = country.children[1].children[0].children[0].textContent;
      console.log(NAME_COUNTRY);
      getByFilter('name', NAME_COUNTRY, true);
    });
  });
}
