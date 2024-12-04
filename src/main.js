document.addEventListener('DOMContentLoaded',async () => {
  
const dropDown = document.getElementById("dropdown");
const dropDownBtn = document.getElementById("dropdownDefaultButton");
const dropdown_icon = document.getElementById("dropdown-icon");
const themeToggleBtn = document.getElementById("theme-toggle");
const countries_container = document.getElementById("countries-container");
const dropdownMenu = document.getElementById("dropdown").querySelector("ul");
const countryInput = document.getElementById('countryInput');


const setThemeBasedOnSystem = () => {

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme){
      document.documentElement.classList.toggle('dark' ,savedTheme === 'dark');
    } else{
       const userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
       document.documentElement.classList.toggle('dark',userTheme);
    }
};

dropDownBtn.addEventListener("click", function () {
  dropDown.classList.toggle("hidden");
  dropdown_icon.classList.toggle("rotate");
}); 



const toggleDarkMode = () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem('theme' ,isDark ? 'dark' : 'light');
};


  themeToggleBtn.addEventListener("click", toggleDarkMode);

   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnSystem);

  // Set the initial theme on page load
  //setThemeBasedOnSystem();


  let allCountries = [];


  async function fetchCountries() {
   
     try {
       const URL = "https://restcountries.com/v3.1/all";

       const response = await fetch(URL);
       let data = await response.json();
       
       //!limiting user data to 10 countries
       
       allCountries = data;
       return data;
     } catch (error) {
      console.log(error)
     }
  }

  function renderUser(countries){
  countries_container.innerHTML = "";

     countries.forEach(country => {
         const countryName = country.name.common;
        const countryNativeName =
          country.name.nativeName && country.name.nativeName.deu
            ? country.name.nativeName.deu.common
            : "NA";

       const countryPopulation = Intl.NumberFormat().format(country.population);
       const countryRegion = country.region;
       const countryCapital = country.capital && country.capital[0] ? country.capital[0] : 'NA';
       const countryFlag = country.flags.svg;

       const countryContainer = document.createElement('div');

       countryContainer.style.cursor = 'pointer'
       
       countryContainer.innerHTML = `
         <div class="p-7">
                <div class="max-w-sm rounded overflow-hidden shadow-lg dark:bg-[#2B3743]">
                    <div id="img-container">
                    <img class="w-full" src="${countryFlag}" alt="${countryName} flag">
                    </div>
                    <div class="px-6 py-4 space-y-2">
                        <div class="font-bold text-3xl mb-[12px] dark:text-white">${countryName}</div>
                        <p class="font-semibold dark:text-white">Population: <span
                                class="font-light dark:text-[#DDE6EE]">${countryPopulation}</span></p>
                        <p class="font-semibold dark:text-white">Region: <span
                                class="font-light dark:text-[#DDE6EE]">${countryRegion}</span></p>
                        <p class="font-semibold dark:text-white">Capital: <span
                                class="font-light dark:text-[#DDE6EE]">${countryCapital}</span></p>
                    </div>
                </div>
            </div>
       `;

       countries_container.appendChild(countryContainer);

       countryContainer.addEventListener('click', () => displayCountryInformation(country)) 
     })
  }

  function displayCountryInformation(country){
    localStorage.setItem('selectedCountry', JSON.stringify(country));

    window.location.href = `country.html`;
  }


  countryInput.addEventListener('input' ,function(e){

     const userInputCountry = e.target.value.trim().toLowerCase();

    if(userInputCountry === ''){
       countries_container.innerHTML = "";
       renderUser(allCountries); 
      return;
    }

    let ans = allCountries.filter(country => country.name.common.toLowerCase() === userInputCountry);

    countries_container.innerHTML = '';

    renderUser(ans);
  });


  function filterByRegion(selectedRegion) {
    console.log("Selected Region:", selectedRegion); // Log the selected region


    if (!selectedRegion) return;

    const filteredCountries = allCountries.filter(country => {
      return country.region.toLowerCase() === selectedRegion.toLowerCase();
    })
  
    // fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`)
    // .then(res => res.json())
    // .then(data =>{
    //   countries_container.innerHTML = '';
    //   renderUser(Array.from(data));
    // })

    console.log("Filtered Countries:", filteredCountries); // Log the filtered array

    renderUser(filteredCountries);
  }



  dropdownMenu.addEventListener('click' ,function(event){
    const selectedRegion = event.target.textContent.trim(); // Get the selected region from dropdown
   console.log(event.target)
      filterByRegion(selectedRegion);
  })


  try {
    const countries = await fetchCountries();
    renderUser(countries);
  } 
  
  catch (error) {
    console.log(error)
  }

});