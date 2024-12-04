document.addEventListener('DOMContentLoaded', function(){
  const themeToggleBtn = document.getElementById("theme-toggle");
  const goBackBtn = document.getElementById("goBack-container");
  const countryContainer = document.getElementById("countryContainer");


  const setThemeBasedOnSystem = () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const userTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", userTheme);
    }
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
     localStorage.setItem("theme", isDark ? "dark" : "light");
  };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setThemeBasedOnSystem);

    // Set the initial theme on page load
    setThemeBasedOnSystem();
  
  function getCountryLanguages(countryLanguages) {
    let temp = Object.entries(countryLanguages).splice(0, 2);


    let languages = temp.map((language) => language[1]);
    return languages.join(",");
  }

 async function getFriendName(countryBorders) {

   const response = await Promise.all(
     countryBorders.map((code) =>
       fetch(`https://restcountries.com/v3.1/alpha/${code}`).then((res) =>
         res.json()
       )
     )
   );

   response.length = 3;

   return response.map((data) => data[0]?.name?.common);
 }



 function renderCountry(){
 
 const country = JSON.parse(localStorage.getItem("selectedCountry"));

 const countryFlag = country.flags.svg;
 const countryName = country.name.common;
 const countryNativeName =
   country.name.nativeName && country.name.nativeName.deu
     ? country.name.nativeName.deu.common
     : "NA";

 const countryPopulation = Intl.NumberFormat().format(country.population);
 const countryRegion = country.region;
 const countryCapital =
   country.capital && country.capital[0] ? country.capital[0] : "NA";
 const countrySubRegion = country.subregion;
 const countryTopLevelDomain =
   country.tld && country.tld[0] ? country.capital[0] : "NA";
 const countryCurrency =
   country.currencies.SLL && country.currencies.SLL.name
     ? country.currencies.SLL.name
     : "NA";

 const countryLanguage = getCountryLanguages(country.languages);

 const countryBorders = country.borders; // assuming country is an object with a borders property



 getFriendName(countryBorders).then((data) => {
   const borderCountriesContainer = document.querySelector("#borderCountriesContainer");

   data.forEach((friend) => {
     if (friend) {
       const button = document.createElement("button");
       button.innerHTML = `
             <button class="shadow-lg  bg-[#FFFFFF] dark:bg-[#2B3743] font-normal dark:text-white px-5 py-3 dark:font-semibold ">${friend}</button>
             `;

       button.addEventListener('click' ,async()=>{
         try {
          const response = await fetch( `https://restcountries.com/v3.1/name/${friend}?fullText=true`);
          const data = await response.json();
          const buttonCountry = data[0];

          //console.log(selectedCountry);

          localStorage.setItem('selectedCountry' ,JSON.stringify(buttonCountry));
          window.location.href = `country.html`;
         } catch (error) {
          
         }
       })

       borderCountriesContainer.appendChild(button);
      
     }
   });
 });

 const countryDisplay = document.createElement("div");

 countryDisplay.innerHTML = `
   
   <div class="flex flex-col items-center justify-center md:p-5 lg:p-0  gap-7  md:flex md:flex-row md:gap-8">
            
                <div class="flex justify-center md:justify-between">
                    <img class="w-full shadow-xl max-w-[500px] md:w-[330px] md:ml-10 lg:ml-0 lg:w-[500px]" src="${countryFlag}" alt="Country Flag">
                </div>
            
            
                <div>
                    <p id="countryName" class="font-bold text-3xl mt-7 ml-6 dark:text-white">${countryName}</p>
            
                    <div class="mt-3 font-nunito-sans md:mt-0">
            
                        <div>
                            <div class="p-6 space-y-3 md:space-y-2">
                                <p id="countryNativeName" class="font-bold text-lg dark:text-white">Native Name: <span
                                        class="font-normal dark:font-thin">${countryNativeName}</span></p>
                                <p id="countryPopulation" class="font-bold text-lg dark:text-white">Population: <span
                                        class="font-normal dark:font-thin">${countryPopulation}</span></p>
                                <p id="countryRegion" class="font-bold text-lg dark:text-white">Region: <span
                                        class="font-normal dark:font-thin">${countryRegion}</span></p>
                                <p id="countrySubRegion" class="font-bold text-lg dark:text-white">Sub Region: <span
                                        class="font-normal dark:font-thin">${countrySubRegion}</span></p>
                                <p id="countryCapital" class="font-bold text-lg dark:text-white">Capital: <span
                                        class="font-normal dark:font-thin">${countryCapital}</span></p>
                            </div>
            
                            <div class="p-[1.5rem] space-y-3 md:space-y-2">
                                <p id="countryTopLevelDomain" class="font-bold text-lg dark:text-white">Top Level Domain: <span
                                        class="font-normal dark:font-thin">${countryTopLevelDomain}</span></p>
                                <p id="countryCurrencies" class="font-bold text-lg dark:text-white">Currencies: <span
                                        class="font-normal dark:font-thin">${countryCurrency}</span></p>
                                <p id="countryLanguages" class="font-bold text-lg dark:text-white">Languages: <span
                                        class="font-normal dark:font-thin">${countryLanguage}</span></p>
                            </div>
                        </div>
            
                        <div id="borderCountriesContainer" class="p-[1.25rem] space-x-2 md:flex md:flex-row md:items-center">
                            <p class="font-bold text-2xl mb-2 dark:text-white lg:text-lg">Border Countries:</p>
                          
                        </div>
            
                    </div>
                </div>
            
            
            </div> 
   
   `;

 countryContainer.appendChild(countryDisplay);
 
 }


 renderCountry();


  themeToggleBtn.addEventListener("click", toggleDarkMode);

  goBackBtn.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  
});