Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4Qws6YPbi/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth=window.SpeechSynthesis;
    speak_data_1="The first prediction is " + prediction_1;
    speak_data_2="and the second prediction is " + prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction_1=results[0].label;
        if(results[0].label=="Super")
        {
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(results[0].label=="Thumbs Up")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(results[0].label=="Claps")
        {
            document.getElementById("update_emoji").innerHTML="&#128079;";
        }
    }

}