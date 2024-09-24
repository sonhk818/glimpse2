let sliderSize // creat global variable (everyone knows about it)
let sliderSize2 // creat global variable (everyone knows about it)

function setup() {
createCanvas(windowWidth, windowHeight)


angleMode(DEGREES)

// setupAudio();

sliderSize = createSlider(10, 255, 1) // min, mac, default, [step]
sliderSize.position(width/2, 50)
sliderSize2 = createSlider(10, 360, 1) // min, mac, default, [step]
sliderSize2.position(width/2+200, 50)
}

function draw() {
/* audio vars: amp, ampEase, fft, waveform */
// updateAudio();

// pinStripe(sliderSize2.value(), sin(frameCount/28)* 150, color(frameCount % 255, 0, sliderSize.value()), .5)
pinStripe(sliderSize2.value(), sin(frameCount/28)* 150, color(100, 0, sliderSize.value()), .5)
pinStripe(sliderSize2.value(), -sin(frameCount/28) * 300, color(sliderSize.value(), 0, frameCount % 255), .5)
pinStripe(sliderSize2.value(), sin(frameCount/28)*100, color(100, sliderSize.value(), 0), .5)


}

function pinStripe(loopCount = 10, rot = 0, col = 255, sw = 1) {
stroke(col)
strokeWeight(sw)
// let loopCount = 25
push()
translate(width / 2, height / 2)
rotate(rot)
for(let i = 0; i < loopCount; i++) {
    let x = map(i, 0, loopCount - 1, -width / 1.5, width / 1.5)
    line(x, -height, x, height)
}
pop()

}

/* AUDIO INIT */
// let mic, fftRaw, fft = [],
// waveform = [],
// amp = 0.0,
// ampStereo = {
//     l: 0.0,
//     r: 0.0
// },
// ampEase = 0.0,
// numBins = 512,
// bands = 12;

// function setupAudio() {
// userStartAudio();
// mic = new p5.AudioIn();
// mic.start();
// fftRaw = new p5.FFT(0.75, numBins);
// fftRaw.setInput(mic);
// }

// function updateAudio() {
// fftRaw.analyze();
// amp = mic.getLevel() * 1000; // average mixed amplitude
// ampStereo.l = mic.amplitude.getLevel(0) * 500; // average left amplitude
// ampStereo.r = mic.amplitude.getLevel(1) * 500; // average right amplitude
// ampEase = ease(amp, ampEase, 0.075); // smooth 'amp'
// waveform = fftRaw.waveform(); // array (-1, 1)
// fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); // array (0, 255)
// }