const express=require('express');
const app =express();

const vision = require('@google-cloud/vision');
const serviveAccount=require('./gp-ocr-remon-new.json')
// Creates a client
const client = new vision.ImageAnnotatorClient({
    credentials:serviveAccount,
});

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
const imgName = 'new_temp.JPG';

// Performs text detection on the local file


app.get('/' , (req,res) => {
    //regex patterns
    let measurmentsPattern=/(?<Component>.{3,4}): +(?<Value>[0-9.]{2,5})/g;
    let namePattern=/Name (?<Name>[a-zA-Z]+ [a-zA-Z]+)/;
    let agePattern=/Age (?<Age>[0-9]{1,2})/;
    let datePattern=/(?<Date>\d{1,2}\/\d{1,2}\/\d{4})/;
    let genderPattern= /(?<Gender>Male|Female)/
    let commentsPattern=/COMMENTS (?<Comments>.*)/

    let data={
        name:"",
        age:"",
        gender:"",
        date:"",
        measurments:[],
        comments:""
    }
    let extractedText="";//the whole text 
    client.textDetection(imgName)
    .then(val => {
        const [result] =val
        const detections = result.textAnnotations;
        detections.forEach(txt =>  {
            extractedText=extractedText+txt.description+' '
        });
        console.log(extractedText)
        // apply pattern matching 
        let measumentsMatches =[...extractedText.matchAll(measurmentsPattern)]
        measumentsMatches.forEach((match,i) => {
            data.measurments[i]=match.groups.Value
            console.log(match.groups.Component.trim()+":"+match.groups.Value)
            
        });
        
        let nameMatch=extractedText.match(namePattern)
        console.log(nameMatch[1])
        data.name=nameMatch[1]

        let ageMatch=extractedText.match(agePattern)
        console.log(ageMatch[1])
        data.age=ageMatch[1]

        let genderMatch=extractedText.match(genderPattern)
        console.log(genderMatch[0])
        data.gender=genderMatch[0]

        let dateMatch=extractedText.match(datePattern)
        console.log(dateMatch[0])
        data.date=dateMatch[0]

        let commentsMatch=extractedText.match(commentsPattern)
        console.log(commentsMatch[0])
        data.comments=commentsMatch[0]

        console.log(data)
        data=JSON.stringify(data) //convert js object to json
        console.log(data)
        res.write(`<h1> ${extractedText} </h1>`)
        res.end()

    }).catch(err => {
        console.log('error:',err)
    })
})

app.listen(3000,()=>{
    console.log("running")
})

// NFOvYl4DCw6DEyW7