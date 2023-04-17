const audioContext = new window.AudioContext();

function beep(vol = 20, freq = 2000, duration = 50) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.connect(gain);
  oscillator.frequency.value = freq;
  oscillator.type = "square";
  gain.connect(audioContext.destination);
  gain.gain.value = vol * 0.01;
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration * 0.001);
}

function touchedTheRacketSound() {
  beep(50, 1000);
}

function missedTheBallSound() {
  beep(50, 200, 100);
}

export { touchedTheRacketSound, missedTheBallSound };
