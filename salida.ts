
async function getJokes(){

    try {

        const response = await fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();
        const joke = data.joke;
        console.log(data);
        console.log(joke);  
    } catch (error) {
        console.error('Error al obtener la broma', error);
    }

}

getJokes();