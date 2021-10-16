const http=require("http");
const fs=require("fs");
var requests=require("requests");
const homePage=fs.readFileSync("index.html","utf-8");
const replaceVal=(tempVal,orgVal)=>{
var temperature;
temperature=tempVal.replace("{%tempvalue%}",orgVal.main.temp);
 temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
 temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
  temperature=temperature.replace("{%location%}",orgVal.name);
//   console.log(orgVal.main.temp);
 temperature=temperature.replace("{%country%}",orgVal.sys.country);
 return temperature;
}  
const server=http.createServer((req,res)=>{
if(req.url=="/"){ 
    requests('https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=6ba7ea7cb1d8028349f4b1644ce04b39')
    .on('data', (chunk)=> { 
        const obj_data=JSON.parse(chunk);
        const arrdata=[obj_data];
    //   console.log(arrdata[0].main.temp);
      const realtimedata=arrdata.map((val)=> replaceVal(homePage,val))
      .join(" ");
        // return va
      res.write(realtimedata);
    console.log(realtimedata) 
    })
    .on('end',  (err)=> {
      if (err) return console.log('connection closed due to errors', err);
     res.end();
    //   console.log('end');
    });
           
}
// .on("data",function ())
});

server.listen(8000,"127.0.0.1");