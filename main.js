song1="";
song2="";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
song1status="";
song2status="";
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song1=loadSound("on.mp3")
    song2=loadSound("ptd.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    song1status = song1.isPlaying()
    song2status = song2.isPlaying()

    if(scoreLeftWrist > 0.2)
    {
       circle(leftWristX, leftWristY, 20);
       song1.stop()
       if(song2status==false) 
       {
           song2.play()
           document.getElementById("song").innerHTML = "Song = Permission To Dance ";
       }
       
    }
    if(scoreRightWrist > 0.2)
    {
       circle(rightWristX, rightWristY, 20);
       song2.stop()
       if(song1status==false) 
       {
           song1.play()
           document.getElementById("song").innerHTML = "Song = ON ";
       }
       
    }
}

function modelLoaded() {
    console.log('PoseNet Is Intilaised');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY)
    }
}

