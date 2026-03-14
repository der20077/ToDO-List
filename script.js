const loadAuduoPlayer = () => {
  const audio = document.getElementById("audio");
  const prevBtn = document.getElementById("prev");
  const playBtn = document.getElementById("play");
  const pauseBtn = document.getElementById("pause");
  const stopBtn = document.getElementById("stop");
  const nextBtn = document.getElementById("next");
  const currentTimeEl = document.getElementById("current-time");
  const pregressBar = document.getElementById("progress");
  const durationEl = document.getElementById("duration");
  const volumeImg = document.querySelectorAll(".volume img");
  const volumSlider = document.getElementById("volume");
  const playList = document.getElementById("playlist");

  const tracks = [
    { name: "Король и Шут - Внезапная голова", src: "tracks/track1.mp3" },
    { name: "Сектор Газа - Твой звонок", src: "tracks/track2.mp3" },
    { name: "ДДТ - Ты не один ", src: "tracks/track3.mp3" },
  ];

  let currentTrack = 0;

  const saveVolume = localStorage.getItem("volum");

  if (saveVolume !== null) {
    volumSlider.value = parseFloat(saveVolume);
  }

  const saveTrack = localStorage.getItem("indexTrek");
  if (saveTrack !== null) {
    currentTrack = parseInt(saveTrack);
  }

  const renderTrack = () => {
    playList.innerHTML = " ";
    tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.textContent = track.name;
      li.addEventListener("click", () => {
        loadTrack(index);
        playTrack();
      });
      if (index === currentTrack) {
        li.classList.add("active");
      }
      playList.append(li);
    });
  };

  const loadTrack = (index) => {
    const track = tracks[index];
    audio.src = track.src;
    audio.load();
    currentTrack = index;
    renderTrack();
    localStorage.setItem("indexTrek", index);
  };

  const playTrack = () => {
    audio.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
  };

  const pauseTrack = () => {
    audio.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
  };

  const stopTrack = () => {
    audio.pause();
    audio.currentTime = 0;
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
  };

  const nextTrack = () => {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
  };

  const prevTrack = () => {
    currentTrack = (currentTrack - 1) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
  };

  const updateRangeFill = (rangeElement) => {
    const value =
      ((rangeElement.value - rangeElement.min) /
        (rangeElement.max - rangeElement.min)) *
      100;
    rangeElement.style.background = `linear-gradient(to right, #83baf6 0%, #83baf6 ${value}%, rgba(255, 255, 255, 0.3) ${value}%, rgba(255, 255, 255, 0.3) 100%)`;
  };

  const updateProgressBar = () => {
    const { currentTime, duration } = audio;
    if (isNaN(duration)) {
      return;
    }
    const preogressPesson = (currentTime / duration) * 100;
    pregressBar.value = preogressPesson;
    currentTimeEl.textContent = timecConvert(currentTime);
    durationEl.textContent = timecConvert(duration);
    updateRangeFill(pregressBar);
  };

  const timecConvert = (time) => {
    const minites = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const second = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minites} : ${second}`;
  };

  const seekTime = () => {
    audio.currentTime = (pregressBar.value / 100) * audio.duration;
  };

  const setVolum = (volume) => {
    audio.volume = volume;

    updateRangeFill(volumSlider);
    volumeImg.forEach((icon, index) => {
      if (volume < 0.01) {
        icon.style.display = index === 0 ? "inline" : "none";
      } else {
        const sliderVolueShow = Math.min(Math.floor(volume * 3), 2);
        icon.style.display = index === sliderVolueShow ? "inline" : "none";
      }
    });
  };
  audio.addEventListener("ended", nextTrack);
  audio.addEventListener("timeupdate", updateProgressBar);
  playBtn.addEventListener("click", playTrack);
  pauseBtn.addEventListener("click", pauseTrack);
  stopBtn.addEventListener("click", stopTrack);
  nextBtn.addEventListener("click", nextTrack);
  prevBtn.addEventListener("click", prevTrack);
  pregressBar.addEventListener("input", seekTime);
  volumSlider.addEventListener("input", () => {
    const volume = volumSlider.value;
    localStorage.setItem("volum", volume);
    setVolum(volume);
  });

  loadTrack(currentTrack);
  setVolum(volumSlider.value);
  renderTrack();
};

document.addEventListener("DOMContentLoaded", loadAuduoPlayer);
