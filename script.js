let songs = [];

const songsList = document.querySelector('.song-list-container');
const addSongForm = document.querySelector('.add-songs');
const filterTitleInput = document.querySelector('#filter-title');
const filterStyleInput = document.querySelector('#filter-style');
const filterForm = document.querySelector('.filter-songs');
const resetFiltersBtn = document.querySelector('.reset-filters');

const filterList = e => {};

const resetFilters = e => {};

resetFiltersBtn.addEventListener('click', resetFilters);
filterTitleInput.addEventListener('keyup', filterList);
filterStyleInput.addEventListener('change', filterList);

const showSongs = (event, filterTitle, filterStyle) => {};

const addSong = e => {};

// event delegation for update and delete song buttons
const handleClick = e => {};

const updateSong = idFromTheButton => {};

const deleteSong = idToDelete => {};

// when we reload, we want to look inside the local storage and put them into songs
const initLocalStorage = () => {};

// we want to update the local storage each time we update, delete or add an attirbute
const updateLocalStorage = () => {};

addSongForm.addEventListener('submit', addSong);
songsList.addEventListener('pleaseUpdateTheList', showSongs);
songsList.addEventListener('pleaseUpdateTheList', updateLocalStorage);
songsList.addEventListener('click', handleClick);

initLocalStorage();
