Status ="";
video = "";
object=[];

function preload() {
    video= createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw() {
    image(video,0,0,480,380);

    if (Status !="") {
        Objectdetector.detect(video,gotresults);

        for ( i = 0; i < object.length; i++) {
      document.getElementById("status").innerHTML=" Status = Objects Detected";
      document.getElementById("obnumber").innerHTML="Number of object detected = "+object.length ; 
      
      fill("Red");
      percent = floor(object[i].confidence*100);
      text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
      noFill();
      stroke("black");
      rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    } 
}

function start() {
    Objectdetector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function modelloaded() {
    console.log("Modelloaded");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresults(error,results) {
    if (error) {
        console.log(error);
    } 
    console.log(results);
    object= results;
}