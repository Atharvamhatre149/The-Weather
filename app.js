const express=require("express");
const https=require("https");
const bodyParser=require("body-parser")

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    console.log(req.body.cityName);
    const query=req.body.cityName;
    const api="48274b7ac4f5ecf861c7d832629b39";
    const unit="metric"; 
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+api+"&units="+unit+"";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            
            const WeatherData=JSON.parse(data);
            const WeatherDesc=WeatherData.weather[0].description;
            const temp=WeatherData.main.temp;
            const icon=WeatherData.weather[0].icon;
            const imageURL= "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<h1>The temperaturn in "+ query +" is " + temp +" Degree Celcius</h1>");
            res.write("<p>The Weather is currently "+WeatherDesc+ " </p>")
            res.write("<img src="+imageURL+">");
            res.send();       
        })
    })
});



app.listen(3000,function(){
    console.log("Server is running on port 3000");
})
