



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
    } catch (error) {
        console.error('Error al obtener la broma', error);
    }

}

getJokes();
