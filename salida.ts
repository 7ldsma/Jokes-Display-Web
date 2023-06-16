
interface Joke {
    joke: string;
    score?: number;
    date?: string;
}

let jokesReport: Joke[] = [];





async function getJokes(){

    try {

        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();
        const joke = data.joke;
        let broma:any = document.getElementById('joke');
        broma.textContent = joke;
        showButtons();
        addJoke(joke);
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

