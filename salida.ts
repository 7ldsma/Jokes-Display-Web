
interface Joke {
    joke: string;
    score?: number;
    date?: string;
}

interface ChuckNorris {
    value: string;
    score?: number;
    date?: string;
}

let jokesReport: Joke[] = [];


async  function getWeather(ciudad:string){
    try {
        const apiKey = "09aee6622aa7a4dad63e15855ee6dd0f"
        const urlWeather:string = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`
        const response = await fetch(urlWeather,{
            headers:{

            }
        });
        const data = await response.json();
        //const mainWeather = data.weather[0].main;
        console.log(data);
        //console.log(mainWeather);

        const descriptionWeather = data.weather[0].description;
        console.log(descriptionWeather);

        const temperatureKelvin = Number(data.main.temp);
        const tempCelsius = temperatureKelvin - 273.15
        console.log(tempCelsius);

        //let mWelement = document.getElementById('mainWeather');
        let dWelement = document.getElementById('descriptionWeather');
        let tempW = document.getElementById('temperature');


        if (dWelement && tempW) {
            //mWelement.textContent = mainWeather;
            dWelement.textContent = descriptionWeather;
            tempW.textContent = `${tempCelsius.toFixed(1).toString()} °C`;

        } else {
            console.error('Element not found');
          }

    }catch (error){
        console.error('weather is missing', error);
    }
}


async function getJokes(){

    try {

        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();
        const joke = data.joke;

        return joke;

    } catch (error) {
        console.error('Error al obtener la broma', error);
    }

}


async function getChuckJokes(){

    try {

        const response = await fetch('https://api.chucknorris.io/jokes/random', {
            headers: {
                'Accept': 'application/json',
              }
        });

        const data = await response.json();
        const chuckJoke = data.value;
        console.log(chuckJoke);

        return chuckJoke;
        // addJoke(chuckJoke);

    } catch (error) {
        console.error('Error al obtener la broma', error);
    }

}

async function getRandomJokes(){

    try {

        const randomIndex = Math.floor(Math.random()*2);
        let jokeToShow;

        if(randomIndex === 0){
            jokeToShow = await getJokes();
        } else {
            jokeToShow = await getChuckJokes();
        }
    
        const jokeElement = document.getElementById('joke');
        if(jokeElement){
            jokeElement.textContent = jokeToShow;
            showButtons();
            addJoke(jokeToShow);           
        } else {
            console.error('Element not found');
        }
 
    } catch (error) {
        console.error('Error al obtener la broma', error);
    }

}



function showButtons(){
    let mostrar = document.getElementById('scoreButtons') as HTMLElement; 
    
    mostrar.innerHTML = `<div class="col-sm-12 col-md-7 col-xl-5 text-center">
        <button class="btn btn-secondary" onclick="addScore(1)">1</button>
        <button class="btn btn-secondary" onclick="addScore(2)">2</button>
        <button class="btn btn-secondary" onclick="addScore(3)">3</button>
        </div>`;

}

function addJoke(joke:any){
    // const d = new Date();
    // let dateAdded = d.toISOString(); 

    let jokeToSave: Joke = {
        joke: joke,
        //date: dateAdded,
    }
    
    jokesReport.push(jokeToSave);
    console.log(jokesReport);
}


function addScore(score:number){
    let getJoke: any = document.getElementById('joke')?.innerHTML;
    const d = new Date();
    let dateOfScore = d.toISOString();

    jokesReport[jokesReport.length -1] = {
        joke: getJoke,
        score: score,
        date: dateOfScore
    }

    console.log(jokesReport);

}
getChuckJokes();

getWeather('Barcelona');