import { songs } from './data/songs.js';
import { handleMap } from './utils.js';

const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const playlistSongs = document.querySelector('#playlist-songs');

// Web Audio API
const audio = new Audio();

// since users will be able to shuffle
// and delete songs, we will need to
// create a copy of the original `songs`
// array without mutating the original

let userData = {
  // songs: [...songs],
  songs: Object.assign([], songs),
  currentSong: null,
  songCurrentTime: 0,
};

const renderSongs = (songs = []) => {
  const songsHTML = songs.map(handleMap).join('');
  playlistSongs.innerHTML = songsHTML;
};

renderSongs(userData.songs);
