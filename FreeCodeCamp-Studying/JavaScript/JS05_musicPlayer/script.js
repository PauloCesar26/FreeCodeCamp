const playlistSongs = document.getElementById('playlist-songs');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const shuffleButton = document.getElementById('shuffle');
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
    },
    {
        id: 4,
        title: "Never Not Favored",
        artist: "Quincy Larson",
        duration: "3:35",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
    },
    {
        id: 5,
        title: "From the Ground Up",
        artist: "Quincy Larson",
        duration: "3:12",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3",
    },
    {
        id: 6,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3",
    },
    {
        id: 7,
        title: "Can't Stop Me. Can't Even Slow Me Down.",
        artist: "Quincy Larson",
        duration: "3:52",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3",
    },
    {
        id: 8,
        title: "The Surest Way Out is Through",
        artist: "Quincy Larson",
        duration: "3:10",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3",
    },
    {
        id: 9,
        title: "Chasing That Feeling",
        artist: "Quincy Larson",
        duration: "2:43",
        src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3",
    },
];
// API de audio da WEB, permite gerar e processar audio
const audio = new Audio();
// objeto que vai amazenar as musicas que está tocando no momento e o tempo da musica atual
let userData = {
    // operador (...) permite copiar todos os elementos de uma matriz para outra
    // songs,currentSong, songCurrentTime prorpiedades do userData
    songs: [...allSongs],
    currentSong: 0,
    songCurrentTime: null
};

// function de arrow, function anonymous means that functions not have a name
// syntax () => {}
// exemplo:
// const printGreeting = () => {
//     console.log("Hello there!");
// }
// printGreeting();

// const printMessage = (org) => {
//     console.log(`${org} is awesome!`);
// }
// printMessage("freeCodeCamp");

// const addTwoNumbers = (num1, num2) =>{
//     return num1 + num2;
// }
// const addTwoNumbers = (num1, num2) => num1 + num2;

//funcionalidade para reproduzir as musicas
// id representa o id da musica que vai tocar
const playSong = (id) => {
    // o metodo find() recupera o primeiro elemento dentro de um array que atende as condições espesificas
    // Isso iterará pela matriz userData?.songs, procurando por uma música que corresponda ao id passado para a função playSong.
    const song = userData?.songs.find((song) => song.id === id);
    // isso informa o elemento de audio onde encontrar os dados da musica selecionada 
    audio.src = song.src;
    audio.title = song.title;

    // Esta condição verificará se nenhuma música está sendo reproduzida ou se a música atual é diferente daquela que está prestes a ser reproduzida.
    if(userData?.currentSong === false || userData?.currentSong.id !== song.id){
        audio.currentTime = 0;
    }
    //bloco else para manipular o tempo da musica, permite retorna no ponto que foi pausada
    else{
        audio.currentTime = userData?.songCurrentTime;
    }

    userData.currentSong = song;
    playButton.classList.add("playing");
    highlightCurrentSong();
    setPlayerDisplay(); // garantir que a exibição do player seja atualizada sempre que uma musica nova começa a tocar
    setPlayButtonAccessibleText();
    audio.play();
};

//pausar a musica que está tocando
const pauseSong = () => {
    //armazenando o tempo atual da musica
    userData.songCurrentTime = audio.currentTime;
    playButton.classList.remove("playing");
    audio.pause();
};

const playNextSong = () => {
    // verificar se não tem nenhuma musica tocando no objeto userData
    if(userData?.currentSong === null){
        playSong(userData?.songs[0]);
    }
    else{
        const currentSongIndex = getCurrentSongIndex();
        //agora precisa recuperar a proxima musica na lista de reprodução, 
        //para isso precisa obter o indice da musica atual e então adicionar 1 a ele
        const nextSong = userData?.songs[currentSongIndex + 1];
        playSong(nextSong.id);
    }
};

const playPreviousSong = () => {
    //verificando se não tem nehuma musica tocando no momento 
    if(userData?.currentSong === null){
        return;
    }
    else{
        const currentSongIndex = getCurrentSongIndex();
        //para obter a musica anterior
        const previousSong = userData?.songs[currentSongIndex - 1];
        playSong(previousSong.id);
    }
};

//function responsavel por espalhar as musicas e executar as atualizações apos embaralhar
const shuffle = () => {
    //produzir valores aleatorios que são positivos ou negativos, levando a uma mistura nos valores fazendo uma ordem aleatoria
    userData?.songs.sort(() => Math.random() - 0.5);

    userData.currentSong = null;
    userData.songCurrentTime = 0;

    renderSongs(userData?.songs); //renderizar as musica novamente
    pauseSong(); //pausar a musica que está tocando 
    setPlayerDisplay(); // definir a exibição do player 
    setPlayButtonAccessibleText(); // definir o texto do botão de reprodução novamente
};

//funcionalide de exclusão para a playlist
const deleteSong = (id) => {
    //verificar se ela está tocando no momento, se for o caso precisa pausar a musica e tocar a proxima
    if(userData?.currentSong?.id === id){
        userData.currentSong = null;
        userData.songCurrentTime = 0;

        pauseSong();
        setPlayerDisplay();
    }
    //metodo filter() mantem apenas os elementos da matriz que são chmados e passados para ele
    userData.songs = userData?.songs.filter((song) => song.id !== id);

    renderSongs(userData?.songs); //exibindo a playlist modificada
    highlightCurrentSong(); //destacar a musica atual 
    setPlayButtonAccessibleText(); // atualizar o texto do botão de reprodução
}

//exibir o titulo da musica atual e o artista na tela 
const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");
    const currentTitle = userData?.currentSong?.title;
    const currentArtist = userData?.currentSong?.artist;

    playingSong.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist : "";
};

//function para destacar qualquer musica que esteja tocando
const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`); //obtendo o id da musica que esta tocando

    //metodo foreach() é usado para percorrer um array e executar algo em cada elemento
    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });

    //adicionando o atributo de volta a musica que esta tocando
    if(songToHighlight){
        songToHighlight.setAttribute("aria-current", "true");
    }
};


// to display the songs in the interface 
const renderSongs = (array) => {
    // adicionar novo html para cada musica
    // method .map() é usado para iterar uma matriz e retorna uma nova matriz, 
    // util quando deseja criar uma nova matriz com bae nos valores de uma matriz existente
    const songsHTML = array.map((song) => {
        // elementos responsaveis por exibir os detalhes da musica
        return `
        <li id="song-${song.id}" class="playlist-song">
            <button class="playlist-song-info" onclick="playSong(${song.id})" onclick="deleteSong(${song.id})">
                <span class="playlist-song-title">${song.title}</span>
                <span class="playlist-song-artist">${song.artist}</span>
                <span class="playlist-song-duration">${song.duration}</span>
            </button>
            <button class="playlist-song-delete" aria-label="Delete ${song.title}">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
            </button>
        </li>
        `;
    })
    // O método join() é usado para concatenar todos os elementos de um array em uma única string. Ele pega um parâmetro opcional chamado de separador que é usado para separar cada elemento do array.
    .join("");
    //atualizar para exibir as musicas inserindo o li criado
    playlistSongs.innerHTML = songsHTML;

    //verificar se a playlist esta vazia, se estiver definindo o objeto userData par seu estado original
    if(userData?.songs.length === 0){
        const resetButton = document.createElement("button");
        const resetText = document.createTextNode("Reset Playlist");

        resetButton.id = "reset";
        resetButton.ariaLabel = "Reset playlist";

        resetButton.appendChild(resetText);
        playlistSongs.appendChild(resetButton);

        resetButton.addEventListener("click", () => {
            userData.songs = [...allSongs];

            renderSongs(sortSongs());
            setPlayButtonAccessibleText();
            resetButton.remove();
        });
    }
};

const setPlayButtonAccessibleText = () => {
    //obter a primeira musica que está tocando ou a primeira da playlist
    const song = userData?.currentSong || userData?.songs[0];

    playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
}

const getCurrentSongIndex = () => {
    // para ter o indice da musica atual, pode usar o metodo indexOf() 
    return userData?.songs.indexOf(userData?.currentSong);
}


//funcionalidade ao botão para quando for clicado reproduzir a musica atual
playButton.addEventListener("click", () => {
    if(userData?.currentSong === null){
        playSong(userData?.songs[0].id); //garantindo que a primeira musica da lista seja tocada primeiro
    }
    else{
        playSong(userData?.currentSong.id);
    }
});

//funcionalide de pausar a musica 
pauseButton.addEventListener("click", pauseSong);
//funcionalidade de passar para prozima musica
nextButton.addEventListener("click", playNextSong);
//funcionalidade de voltar a musica anterior
previousButton.addEventListener("click", playPreviousSong);
shuffleButton.addEventListener("click", shuffle);

audio.addEventListener("ended", () => {
    //verificar se tem uma proxima musica para tocar
    const currentSongIndex = getCurrentSongIndex();
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined;

    if(nextSongExists){
        playNextSong(); // reproduzir automatico a proxima musica 
    }
    else{
        userData.currentSong = null;
        userData.songCurrentTime = 0;

        pauseSong();
        setPlayerDisplay();
        highlightCurrentSong();
        setPlayButtonAccessibleText();
    }
});


const sortSongs = () => {
    //O método sort() converte elementos de uma matriz em strings e os classifica no local com base em seus valores na codificação UTF-16.
    userData?.songs.sort((a, b) => {
        //ordenando as musicas em ordem alfabetica
        if(a.title < b.title){
            return -1;
        }
        if(a.title > b.title){
            return 1;
        }
        return 0;
    });

    //(?.) ajuda a evitar erros ao acessar propriedades aninhadas que podem ser nulas ou indefinidas. 
    return userData?.songs;
}

renderSongs(sortSongs());



