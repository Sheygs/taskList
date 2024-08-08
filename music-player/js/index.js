import { _songs } from './data/songs.js';
import { sortSongs, handleMap } from './utils.js';

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

const userData = {
  songs: [..._songs],
  currentSong: null,
  songCurrentTime: 0,
};

const sorted = sortSongs(userData?.songs);

const playSong = (songId = '') => {
  const song = sorted?.find(({ id }) => id === songId);

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
