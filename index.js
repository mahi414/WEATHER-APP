// console.log('hellooo');

// const API_KEY = "ec858dd1770d8e373e3f923c55510e9a";

// function renderWeatherInfo(data){
//     let newPara = document.createElement('p');

//     newPara.textContent = `${data?.main?.temp?.toFixed(2)} °C`;

//     document.body.appendChild(newPara);
// }

// async function fetchWeatherDetails() {
    
//     try{
//         let city = 'goa';

//         const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
//         );

//         const data = await response.json();

//         console.log("weather data:", data);

//         renderWeatherInfo(data);

//     }
//     catch(err){
//         console.log("error found");
//     }
    
// }

// async function getCustomWeatherDetails(){
//     try{
//          let latitude = 15.6333;
//         let longitude = 18.3333;

//         let result = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
//         );

//         let data=await result.json();

//         console.log(data);


//     }
//     catch(err){
//         console.log("error found",err);
//     }
   
// }

// function switchTab(clickedTab){

//     apiErrorContainer.classList.remove("active");

//     if(clickedTab!==currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab=clickedTab;
//         currentTab.classList.add("current-tab");
//         if(!searchForm.classList.contains("active")){
//             userInfoContainer.classList.remove("active");
//             grantAccessContainer.classList.remove("active");
//             searchForm.classList.add("active");
//         }else{
//             searchForm.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             //getFromSessionStorage();
//         }
//         //console.log("current tab",currentTab);
//     }
// }

// function geoLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else{
//         console.log("geolocation not supported in this device");
//     }
// }

// function showPosition(position){
//     let lat=position.coords.latitude;
//     let longi=position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }


const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]")
const userContainer = document.querySelector(".weather-container")

const grantAccessContainer= document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]")
const loadingScreen = document.querySelector(".loading-container")
const userInfoContainer = document.querySelector(".user-info-container")

//initially variables need??

let oldTab = userTab;
const API_KEY = "ec858dd1770d8e373e3f923c55510e9a";
oldTab.classList.add("current-tab");

//ek kaam aur pending hai

function switchTab(newTab){
    if(newTab!=oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //if search form container is invisible make it visible
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.add("active");
            searchForm.classList.add("active");
        }
        else{
            //main phle search wale tab pr tha,ab your weather tab visible krna h
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your weather tab me aagya hu,toh weather bhi display krna pdega so let`s check local storage first
            //for coordinates if we have saved them there.
            getfromSessionStorage();
        }

    }
}

userTab.addEventListener("click",()=>{
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    //pass clicked tab input parameter
    switchTab(searchTab);
})

function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //agar local coordinates hai toh
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);  
    }
}

async function fetchUserWeatherInfo(coordinates){
    const{lat,long}=coordinates;
    //make grant container invisible
    grantAccessContainer.classList.remove("active");
    //make loader visible
    loadingScreen.classList.add("active");

    //API call
    try{
        const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
        );
        const data=await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

    }
    catch(err){
        loadingScreen.classList.remove("active");
    }
}

function renderWeatherInfo(weatherInfo){
    //firstly we have to fetch the element

    const cityName=document.querySelector("[data-cityName")
}