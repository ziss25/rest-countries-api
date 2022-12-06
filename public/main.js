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
    // dan jika country antar region nya di click ada di fungsi clickForDetail
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
// recomendasi data berdasarkan inputan per character
input.addEventListener('keyup', () => {
  console.log(input.value);
  if (input.value === '') {
    // jika  input user kosong jalankan function random countries lagi
    renderStart();
  } else {
    getByFilter('name', input.value);
    // checked();
  }
});
// ini click search
search.addEventListener('click', () => {
  // nanti kedepannya ini akan masuk ke detail aja karna cuman satu...
  getByFilter('name', input.value, true);
});
// jika input di click enter keyboard
input.addEventListener('keydown', (event) => {
  if (event.keyCode == 13) {
    getByFilter('name', input.value, true);
  }
});

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
    notFoundComponent();
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
    <div class="country bg-white dark:bg-dark cursor-pointer " onclick= "clickFromRegion('${name}')">
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
  outputCountries.innerHTML = countries.join('');
}
// random
function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// jika countries di click maka kita arahkan ke datails
// detail components => dari inputan user atau dari input
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
  const CURRENCIES = params[0].currencies;
  const LANGUAGES = params[0].languages;
  const BORDERS = params[0].borders;
  console.log(LANGUAGES);

  // pengecekan propty di dalam daTa => ada beberapa property yg beda beda
  let nativeName;
  for (const key in checked) {
    if (Object.hasOwnProperty.call(checked, key)) {
      nativeName = checked[key].official;
    }
  }
  let currencies;
  for (const key in CURRENCIES) {
    currencies = key;
  }
  let languages = [];
  for (const key in LANGUAGES) {
    languages.push(LANGUAGES[key]);
  }
  let borders = [];
  for (const key in BORDERS) {
    borders.push(BORDERS[key]);
  }

  console.log(borders);
  // console.log(currencies);

  console.log(params);
  main.innerHTML = `
  <section class="details px-4 pt-8 pb-2 h-full">
  <div class="btn-details w-20 flex justify-evenly items-center bg-white rounded-sm dark:bg-dark text-sm h-6 shadow-md md:w-24 md:justify-center cursor-pointer onclick=tes()">
    <i class="fa-solid fa-arrow-left-long text-dark-gray dark:text-very-light md:mr-4 text-xs"></i>
    <h3 class="font-semibold text-xs text-dark-gray dark:text-very-light">Back</h3>
  </div>
  <div class="content  sm:flex sm:justify-between lg:mt-4">
    <div class="image-details mt-4 md:w-3/6 lg:h-72 lg:mr-8">
      <img  class="w-full" src="${flags}" alt="flags" />
    </div>
    <div class="description-details mt-4 md:w-2/6  lg:w-6/12">
    <div>
    </div>
      <div class="des-title font-extrabold md:text-xl">
        <h3>${name}</h3>
      </div>
      <div class="des-right-left  lg:flex lg:justify-between lg:items-start lg:mt-4"> 
      <div class="des-information1 mt-4 lg:mt-0">
        <h4 class="font-semibold text-xs mb-2 md:text-sm ">Native Name:  <span class="font-light">${nativeName}</span></h4>
        <h4 class="font-semibold text-xs mb-2 md:text-sm ">population:  <span class="font-light">${population}</span></h4>
        <h4 class="font-semibold text-xs mb-2 md:text-sm ">Region:  <span class="font-light">${region}</span></h4>
        <h4 class="font-semibold text-xs mb-2 md:text-sm ">Sub Region:  <span class="font-light">${subRegion}</span></h4>
        <h4 class="font-semibold text-xs mb-2 md:text-sm ">Capital:  <span class="font-light">${capital}</span></h4>
      </div>
    <div class="des-information2 mt-8 lg:mt-0 ">
      <h4 class="font-semibold text-xs mb-2 md:text-sm">Top Level Domain: <span class="font-light"></span></h4>
      <h4 class="font-semibold text-xs mb-2 md:text-sm">Currencies: <span class="font-light">${CURRENCIES[currencies].name}</span></h4>
      <h4 class="font-semibold text-xs mb-2 md:text-sm">Languages: <span class="font-light">${languages}</span></h4>
    </div>
    </div>
  <div class="border-countries mt-8 lg:flex lg:items-center">
    <div>
      <h3 class="text-sm font-bold tracking-wide md:text-md">Border Countries :</h3>
    </div>
    <div class="btn-countries flex justify-around mt-[8px] md:justify-between lg:mt-0 lg:ml-8">
      <button class="py-[1px] px-[20px] bg-white text-xs rounded-sm shadow-md dark:bg-dark lg:mr-4 lg:py-1 lg:px-6">${borders[0] ?? '-'}</button>
      <button class="py-[1px] px-[20px] bg-white text-xs rounded-sm shadow-md dark:bg-dark lg:mr-4 lg:py-1 lg:px-6">${borders[1] ?? '-'}</button>
      <button class="py-[1px] px-[20px] bg-white text-xs rounded-sm shadow-md dark:bg-dark lg:mr-4 lg:py-1 lg:px-6">${borders[2] ?? '-'}</button>
    </div>
  </div>
</div>
  </div>
  
</section>
  `;
  backDetails();
}

renderStart();

// jika countries di click maka kita arahkan ke datails
// // detail components => dari random render countries nya
function elementClick() {
  const countryElements = document.querySelectorAll('.country');
  countryElements.forEach((country) => {
    country.addEventListener('click', async () => {
      console.log('click');
      const NAME_COUNTRY = country.children[1].children[0].children[0].textContent;
      console.log(NAME_COUNTRY);
      await getByFilter('name', NAME_COUNTRY, true);
      backDetails();
    });
  });
}

// country data dalam region di click
function clickFromRegion(NameCountry) {
  getByFilter('name', NameCountry, true);
}
// page not found
function notFoundComponent() {
  const MAIN_OUTPUT = document.querySelector('.countries');
  const NOT_FOUND_ELEMENT = `
  <div class="notFound mt-4 mx-4  sm:w-3/4 md:w-3/5 md:mx-auto lg:w-3/6">
    <div class="notFound-images">
      <img src="../src/not-found.png" alt="" />
    </div>
    <div class="text-center text-2xl font-extrabold text-gray-600 mt-2 tracking-wide dark:text-very-light">
      <h3>countries not found</h3>
      <h3>please try again</h3>
    </div>
  </div>
  `;
  MAIN_OUTPUT.innerHTML = NOT_FOUND_ELEMENT;
}
function backDetails() {
  const back = document.querySelector('.btn-details');
  back.addEventListener('click', () => {
    location.reload();
  });
}
