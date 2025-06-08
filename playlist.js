

// Audio player functionality
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const songTitle = document.querySelector('.song-info h2');
const songArtist = document.querySelector('.song-info p');
const albumArt = document.querySelector('.album-art');

// Track data
const tracks = [
    {
        title: "This Fire",
        artist: "Killswitch Engage",
        src: "audio/this-fire.mp3",
        albumArt: "images/killswitch-engage-daylight-dies.webp"
    },
    {
        title: "Sleepwalking",
        artist: "Bring Me The Horizon",
        src: "audio/bmth-sleepwalking.mp3",
        albumArt: "images/bmth-sempiternal.webp"
    }
];

let currentTrack = 0;

// Initialize the audio player with the first track
function initPlayer() {
    audioPlayer.src = tracks[0].src;
    audioPlayer.volume = 0.5;
    songTitle.textContent = tracks[0].title;
    songArtist.textContent = tracks[0].artist;
    albumArt.style.backgroundImage = `url('${tracks[0].albumArt}')`;
}

// Play or pause the current track
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        audioPlayer.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

// Play a specific track
function playTrack(index) {
    currentTrack = index;

    // Update player
    audioPlayer.src = tracks[index].src;
    songTitle.textContent = tracks[index].title;
    songArtist.textContent = tracks[index].artist;
    albumArt.style.backgroundImage = `url('${tracks[index].albumArt}')`;

    // Start playing
    audioPlayer.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
}

// Play previous track
function playPrevious() {
    let prevTrack = currentTrack - 1;
    if (prevTrack < 0) prevTrack = tracks.length - 1;
    playTrack(prevTrack);
}

// Play next track
function playNext() {
    let nextTrack = currentTrack + 1;
    if (nextTrack >= tracks.length) nextTrack = 0;
    playTrack(nextTrack);
}

// When track ends, play next track
audioPlayer.addEventListener('ended', playNext);

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', playPrevious);
nextBtn.addEventListener('click', playNext);

// Initialize player
initPlayer();
