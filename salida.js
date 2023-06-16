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
            let broma = document.getElementById('joke');
            broma.textContent = joke;
            showButtons();
            addJoke(joke);
        }
        catch (error) {
            console.error('Error al obtener la broma', error);
        }
    });
}
function showButtons() {
    let mostrar = document.getElementById('scoreButtons');
    mostrar.innerHTML = `<div class="col-sm-12 col-md-7 col-xl-5 text-center">
        <button class="btn btn-secondary" onclick="addScore(1)">1</button>
        <button class="btn btn-secondary" onclick="addScore(2)">2</button>
        <button class="btn btn-secondary" onclick="addScore(3)">3</button>
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
