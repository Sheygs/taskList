import { allSongs } from './data/songs.js';
import { sortSongs } from './utils.js';

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
  songs: [...allSongs],
  currentSong: null,
  songCurrentTime: 0,
};

const sorted = sortSongs(userData?.songs);

const playSong = (songId = '') => {
  const song = sorted?.find(({ id }) => id === songId);

  // very unlikely
  if (!song) return;

  audio.src = song.src;
  audio.title = song.title;

  // before a song is played, we need to make sure it starts from the beginning
  if (!userData.currentSong || userData?.currentSong.id !== song.id) {
    audio.currentTime = 0;
  } else {
    audio.currentTime = userData.songCurrentTime;
  }

  userData.currentSong = song;
  playButton.classList.add('playing');
  audio.play().catch((error) => {
    console.error('playback failed:', error);
  });
};

const handleMap = ({ id, title, artist, duration }) => {
  return `
      <li id="song-${id}" class="playlist-song">
         <button class="playlist-song-info" data-id="${id}">
            <span class="playlist-song-title">${title}</span>
            <span class="playlist-song-artist">${artist}</span>
            <span class="playlist-song-duration">${duration}</span>
         </button>
         <button class="playlist-song-delete" aria-label="Delete ${title}">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
         </button>
      </li>
   `;
};

const renderSongs = (songs = []) => {
  const songsHTML = songs.map(handleMap).join('');
  playlistSongs.innerHTML = songsHTML;

  document.querySelectorAll('.playlist-song-info').forEach((button) => {
    button.addEventListener('click', function (e) {
      const songId = e.currentTarget.dataset.id;
      playSong(songId);
    });
  });
};

playButton.addEventListener('click', () => {
  if (!userData?.currentSong) {
    playSong(userData?.songs[0].id);
  } else {
    playSong(userData?.currentSong.id);
  }
  console.log(userData);
});

renderSongs(sorted);
