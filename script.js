let songs = [];

const songsList = document.querySelector('.song-list-container');
const addSongForm = document.querySelector('.add-songs');
const filterTitleInput = document.querySelector('#filter-title');
const filterStyleInput = document.querySelector('#filter-style');
const filterForm = document.querySelector('.filter-songs');
const resetFiltersBtn = document.querySelector('.reset-filters');

const filterList = e => {
    showSongs(e, filterTitleInput.value, filterStyleInput.value);
};

const resetFilters = e => {
    filterForm.reset();
    showSongs();
};

resetFiltersBtn.addEventListener('click', resetFilters);
filterTitleInput.addEventListener('keyup', filterList);
filterStyleInput.addEventListener('change', filterList);

const showSongs = (event, filterTitle, filterStyle) => {
    let sortedSongs = songs.sort((a, b) => b.score - a.score)
    if (filterTitle) {
        sortedSongs = sortedSongs.filter(song => {
           let lowerCaseTitle = song.title.toLowerCase();
           let lowerCaseFilter = filterTitle.toLowerCase();
           lowerCaseTitle.includes(lowerCaseFilter);
           if (lowerCaseTitle.includes(lowerCaseFilter)) {
               return true;
           }
        });
    } 
    if (filterStyle) {
        sortedSongs = sortedSongs.filter(song => song.style === filterStyle);
    }
    // sort the song
    const html = sortedSongs.map(song => {
        return `
            <article class="song">
                <section>
                    <img src="${song.picture}" alt="artist-picture" />
                </section>
                <section>
                    <h5>${song.title}</h5>
                    <p>${song.style}</p>
                </section>
                <section>
                    <h5>${song.artist}</h5>
                    <p>${song.length}</p>
                </section>
                <section>
                    SCORE: ${song.score}
                </section>
                <section>
                    <button class="increment-score" data-id="${song.id}">+1</button>
                    <button class="delete" data-id="${song.id}">
                        <img src="./assets/icons/trash.svg" alt="Delete Song" />
                    </button>
                </section>
            </article>
        `
    }).join("");
    console.log(html);
    songsList.innerHTML = html;
};
showSongs();

const addSong = e => {
    e.preventDefault();
    const form = e.target;
    const newSong = {
        title: form.title.value,
        artist: form.artist.value,
        style: form.style.value,
        length: form.length.value,
        picture: form.picture.value,
        id: Date.now(),
        score: 0
    }
    songs.push(newSong);
    form.reset();
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
    
};

// event delegation for update and delete song buttons
const handleClick = e => {
    if (e.target.closest('button.increment-score')) {
        const button = e.target.closest('button.increment-score');
        const id = button.dataset.id;
        updateSong(Number(id));
    }
    if (e.target.closest('button.delete')) {
        const button = e.target.closest('button.delete');
        const id = button.dataset.id;
        deleteSong(Number(id));
    }
};

const updateSong = idFromTheButton => {
    const song = songs.find(song => song.id === idFromTheButton);
    song.score++;
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
};

const deleteSong = idToDelete => {
    songs = songs.filter(song => song.id !== idToDelete);
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
};

// when we reload, we want to look inside the local storage and put them into songs
const initLocalStorage = () => {
    const stringFromLs = localStorage.getItem('songs');
    const lsItemms = JSON.parse(stringFromLs);
    if (lsItemms) {
        songs = lsItemms;
        console.log('Songs', songs)
    } else {
        songs = [];
        console.log("Nothing")
    }
    songsList.dispatchEvent(new CustomEvent('pleaseUpdateTheList'));
};

// we want to update the local storage each time we update, delete or add an attirbute
const updateLocalStorage = () => {
    localStorage.setItem('songs', JSON.stringify(songs));
};

addSongForm.addEventListener('submit', addSong);
songsList.addEventListener('pleaseUpdateTheList', showSongs);
songsList.addEventListener('pleaseUpdateTheList', updateLocalStorage);
songsList.addEventListener('click', handleClick);

initLocalStorage();
