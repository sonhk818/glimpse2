// let libs = ['https://unpkg.com/ml5@1/dist/ml5.js']
let faceMesh
let options = { maxFaces: 1, refineLandmarks: false, flipped: false }
let video
let faces = []
let font, points
let layer;
let layer2;
let img
let img1
let img2
let img3
let img4
let img5
let img6
let img7
let img8
let img9
let img10
let img11
let img12
let img13

let offset = 0;
let easing = 0.05;

// let sliderSize // creat global variable (everyone knows about it)
let sliderSize2 // creat global variable (everyone knows about it)

function preload() {
  faceMesh = ml5.faceMesh(options)
  img1 = loadImage("face/1.png")
  img2 = loadImage("face/2.png")
  img3 = loadImage("face/3.png")
  img4 = loadImage("face/4.png")
  img5 = loadImage("face/5.png")
  img6 = loadImage("face/6.png")
  img7 = loadImage("face/7.png")
  img8 = loadImage("face/8.png")
  img9 = loadImage("face/9.png")
  img10 = loadImage("face/10.png")
  img11 = loadImage("face/glimpse.png")
  img12 = loadImage("face/wavy.png")
  img13 = loadImage("face/wavy2.png")
}

function setup() {

  // setupAudio()

  angleMode(DEGREES)
  createCanvas(1080, 1920)
	layer = createGraphics(width, height); // create layer as big as canvas 
  layer2 = createGraphics(width, height); // create layer as big as canvas 
 
    // Create the video and hide it
  video = createCapture(VIDEO)
  video.size(0, height)
  video.hide()

  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces)

  // sliderSize = createSlider(10, 255, 1) // min, mac, default, [step]
	// sliderSize.position(width/2, 50)
	sliderSize2 = createSlider(10, 100, 1) // min, mac, default, [step]
	sliderSize2.position(width/2+200, 50)

  blend(layer, 0, 0, 33, 100, 67, 0, 33, 100, SCREEN);
}

function gotFaces(results) {
  // Save the output to the faces variable
  faces = results
}


let faceDistance = 0

function draw() {
	layer.push()
	imageMode(CENTER)
	// tint(255, 255);
	//Map distance of face to the opacity
  console.log(faceDistance)
	let opacity = map(faceDistance, 80, 180, 255, 0)
	background(0, 10)
	tint(255, opacity);
	image(img1, width/2, height/2, 0, 1920);
	image(img2, width/2, height/2, 0, 1920);
	image(img3, width/2, height/2, 0, 1920);
	image(img4, width/2, height/2, 0, 1920);
	image(img5, width/2, height/2, 0, 1920);
	image(img6, width/2, height/2, 0, 1920);
	image(img7, width/2, height/2, 0, 1920);
	image(img8, width/2, height/2, 0, 1920);
	image(img9, width/2, height/2, 0, 1920);
	image(img10, width/2, height/2, 0, 1920);

	if(opacity < 20) {
        noTint()
        image(img12, width/2, height/2, 0, 1920)
  }
  if(opacity < 8) {
      tint(255, -opacity)
      // tint(opacity, -opacity)
      image(video, width/2, height/2, 1920*1.33, 1920)
  }
  if(opacity < 3) {
      noTint()
      image(img13, width/2, height/2, 0, 1920)
  }

	// Display the top image with opacity.
	layer.pop()
	
	 //image(img2, 0, 0, width, height)
	 
	 // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]
    faceDistance = dist(face.keypoints[10].x, face.keypoints[10].y, face.keypoints[152].x, face.keypoints[152].y)
    console.log(faceDistance)
    for (let j = 0; j < face.keypoints.length; j++) {
      let keypoint = face.keypoints[j]
    //   fill(0, 255, 0)
    //   noStroke()
    //   circle(keypoint.x, keypoint.y, 15)     
    }

    // pinStripe(sliderSize2.value(), sin(frameCount/28)* 150, color(faceDistance*100, 0, sliderSize.value()), .5)
    // pinStripe(sliderSize2.value(), -sin(frameCount/28) * 300, color(sliderSize.value(), 0, frameCount % 255), .5)
    // pinStripe(sliderSize2.value(), sin(frameCount/28)*100, color(0, sliderSize.value(), 0), .5)
    layer2.clear()
    layer2.blendMode(MULTIPLY)
    // layer2.push()
    pinStripe(sliderSize2.value(), tan(faceDistance)%360, color(255, faceDistance*0.5), .5)
    pinStripe(sliderSize2.value(), frameCount/200, color(255, faceDistance*0.5), .5)
    pinStripe(sliderSize2.value(), sin(faceDistance), color(255, faceDistance*0.5), .5)
    // layer2.pop()
    image(layer2, width/2, height/2)

    // filter(BLUR, faceDistance/50, false);
  }

  function pinStripe(loopCount = 10, rot = 0, col = 255, sw = 10) {
    layer2.stroke(col);
    layer2.strokeWeight(sw);
    // let loopCount = 25
    layer2.push()
    layer2.translate(width / 2, height / 2);
    layer2.rotate(rot);
    for(let i = 0; i < loopCount; i++) {
      let x = map(i, 0, loopCount - 1, -width / 1.5, width / 1.5)
      layer2.line(x, -height, x, height)
    }
    layer2.pop();
  
  }
  
  
  	// noFill()
	// stroke(255)
	// strokeWeight(1)
	// genType('GIMPSE', width / 4)
}



/* AUDIO INIT */
// let mic, fftRaw, fft = [],
// 	waveform = [],
// 	amp = 0.0,
// 	ampStereo = {
// 		l: 0.0,
// 		r: 0.0
// 	},
// 	ampEase = 0.0,
// 	numBins = 512,
// 	bands = 12;

// function setupAudio() {
// 	userStartAudio();
// 	mic = new p5.AudioIn();
// 	mic.start();
// 	fftRaw = new p5.FFT(0.75, numBins);
// 	fftRaw.setInput(mic);
// }

// function updateAudio() {
// 	fftRaw.analyze();
// 	amp = mic.getLevel() * 1000; // average mixed amplitude
// 	ampStereo.l = mic.amplitude.getLevel(0) * 500; // average left amplitude
// 	ampStereo.r = mic.amplitude.getLevel(1) * 500; // average right amplitude
// 	ampEase = ease(amp, ampEase, 0.075); // smooth 'amp'
// 	waveform = fftRaw.waveform(); // array (-1, 1)
// 	fft = fftRaw.logAverages(fftRaw.getOctaveBands(bands)); // array (0, 255)
// }

// function genType(txtString, txtSize) {
// 	// grab bounding box of text
// 	let bounds = font.textBounds(txtString, 0, 0, txtSize)

// 	// textToPoints(txt, x, y, size, options)
// 	points = font.textToPoints(txtString, -bounds.w / 2, bounds.h / 2, txtSize, {
// 		sampleFactor: .07,
// 		simplifyThreshold: 0
// 	})
// }