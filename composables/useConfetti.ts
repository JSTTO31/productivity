export default () => {
  const celebrationAudio : HTMLAudioElement = document.getElementById('audio-celebration') as HTMLAudioElement
  if(celebrationAudio){
    celebrationAudio.play()
    celebrationAudio.volume = 1
  }
  //@ts-ignore
  confetti({
    scalar: 1.1,
    particleCount: 50,
    angle: .5, // Straight up
    colors: [
      "#ff4500", // OrangeRed
      "#9370db", // MediumPurple
      "#ffa500", // Orange
    ],
    spread: 555,
    startVelocity: 55,
    origin: { x: 0.2, y: 0, }, // Bottom center
  });
  //@ts-ignore
  confetti({
    scalar: 1.1,
    particleCount: 50,
    angle: 1, // Straight up
    colors: [
      "#ff4500", // OrangeRed
      "#9370db", // MediumPurple
      "#ffa500", // Orange
    ],
    spread: 555,
    startVelocity: 55,
    origin: { x: 0.8, y: 0 }, // Bottom center
  });
};
