"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let jokesReport = [];
function getWeather(ciudad) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiKey = "09aee6622aa7a4dad63e15855ee6dd0f";
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`;
            const response = yield fetch(urlWeather, {
                headers: {}
            });
            const data = yield response.json();
            //const mainWeather = data.weather[0].main;
            console.log(data);
            //console.log(mainWeather);
            const descriptionWeather = data.weather[0].description;
            console.log(descriptionWeather);
            const temperatureKelvin = Number(data.main.temp);
            const tempCelsius = temperatureKelvin - 273.15;
            console.log(tempCelsius);
            //let mWelement = document.getElementById('mainWeather');
            let dWelement = document.getElementById('descriptionWeather');
            let tempW = document.getElementById('temperature');
            if (dWelement && tempW) {
                //mWelement.textContent = mainWeather;
                dWelement.textContent = descriptionWeather;
                tempW.textContent = `${tempCelsius.toFixed(1).toString()} °C`;
            }
            else {
                console.error('Element not found');
            }
        }
        catch (error) {
            console.error('weather is missing', error);
        }
    });
}
function getJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://icanhazdadjoke.com/', {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const data = yield response.json();
            const joke = data.joke;
            return joke;
        }
        catch (error) {
            console.error('Error al obtener la broma', error);
        }
    });
}
function getChuckJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://api.chucknorris.io/jokes/random', {
                headers: {
                    'Accept': 'application/json',
                }
            });
            const data = yield response.json();
            const chuckJoke = data.value;
            console.log(chuckJoke);
            return chuckJoke;
        }
        catch (error) {
            console.error('Error al obtener la broma', error);
        }
    });
}
function getRandomJokes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const randomIndex = Math.floor(Math.random() * 2);
            let jokeToShow;
            if (randomIndex === 0) {
                jokeToShow = yield getJokes();
            }
            else {
                jokeToShow = yield getChuckJokes();
            }
            const jokeElement = document.getElementById('joke');
            if (jokeElement) {
                jokeElement.textContent = jokeToShow;
                showButtons();
                addJoke(jokeToShow);
            }
            else {
                console.error('Element not found');
            }
        }
        catch (error) {
            console.error('Error al obtener la broma', error);
        }
    });
}
function showButtons() {
    let mostrar = document.getElementById('scoreButtons');
    mostrar.innerHTML = `<div class="col-sm-12 col-md-7 col-xl-5 text-center">
        <img src='../src/media/mmm.png' onclick="addScore(1)" alt="confused icon">
        <img src='../src/media/ok.png' onclick="addScore(2)" alt="ok icon">
        <img src='../src/media/funny.png' onclick="addScore(3)" alt="funny icon">
        </div>`;
}
function addJoke(joke) {
    // const d = new Date();
    // let dateAdded = d.toISOString(); 
    let jokeToSave = {
        joke: joke,
        //date: dateAdded,
    };
    jokesReport.push(jokeToSave);
    console.log(jokesReport);
}
function addScore(score) {
    var _a;
    let getJoke = (_a = document.getElementById('joke')) === null || _a === void 0 ? void 0 : _a.innerHTML;
    const d = new Date();
    let dateOfScore = d.toISOString();
    jokesReport[jokesReport.length - 1] = {
        joke: getJoke,
        score: score,
        date: dateOfScore
    };
    console.log(jokesReport);
}
var fondos = [
    '../src/media/fondo1.png',
    '../src/media/fondo2.png',
    '../src/media/fondo3.png',
    '../src/media/fondo4.png',
    '../src/media/fondo5.png'
];
const cambioFo = document.querySelector('#fond');
if (cambioFo) {
    cambioFo.addEventListener('click', changeBackground);
}
//     const boton = document.getElementById('fond') as HTMLButtonElement;
//     const background:any = document.body as HTMLDivElement;
//     let currentIndex = 0;
//     boton.addEventListener("click",( )=> {
//         boton.style.backgroundImage = `url(${background[currentIndex]})`;
//         currentIndex = (currentIndex + 1) % fondos.length;
//     });
function changeBackground() {
    const randomIndex = Math.floor(Math.random() * fondos.length);
    const newBackground = fondos[randomIndex];
    const divFondo = document.querySelector('#divFondo');
    if (divFondo) {
        divFondo.style.backgroundImage = `url(${newBackground})`;
    }
}
changeBackground();
getWeather('Barcelona');
