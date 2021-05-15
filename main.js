Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

prediction_1="";
prediction_2="";

Camera=document.getElementById("Webcam");
Webcam.attach(Camera);

function CaptureImage()
{
    Webcam.snap(function(data_uri)
    {
         document.getElementById("Result").innerHTML="<img src='"+data_uri+"'id='Snapshot'>";
    });
}

console.log(ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oQSsSgGgA/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model has been loaded");
}

function PredictImage()
{
    capturedImage=document.getElementById("Snapshot");
    classifier.classify(capturedImage,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_gesture_name_1").innerHTML=results[0].label;
        document.getElementById("result_gesture_name_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
    }
    if(prediction_1=="Best")
    {
        document.getElementById("result_gesture_1").innerHTML="<span>&#128077;</span>";
    }
    else if(prediction_1=="Rock")
    {
        document.getElementById("result_gesture_1").innerHTML="<span>&#129304;</span>";
    }
    else if(prediction_1=="Amazing")
    {
        document.getElementById("result_gesture_1").innerHTML="<span>&#128076;</span>";
    }

    if(prediction_2=="Best")
    {
        document.getElementById("result_gesture_2").innerHTML="<span>&#128077;</span>";
    }
    else if(prediction_2=="Rock")
    {
        document.getElementById("result_gesture21").innerHTML="<span>&#129304;</span>";
    }
    else if(prediction_2=="Amazing")
    {
        document.getElementById("result_gesture_2").innerHTML="<span>&#128076;</span>";
    }
    speak();
}

function speak()
{
    var Synth=window.speechSynthesis;
    var speak1="The first prediction is"+prediction_1;
    var speak2="And the second prediction is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak1+speak2);
    Synth.speak(utterThis);
}