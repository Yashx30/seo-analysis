const express = require('express')
const {exec} = require('child_process')
const isUp = require("is-up")
const app = express()
const moment = require("moment");
const AlexaRank = require('alexa-rank-nodejs').default;
var isValidDomain = require('is-valid-domain');


const whoisinfo = require("whois-json");

const bodyParser = require('body-parser')
const prependhttp = require('prepend-http')
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname+'/public'));

const path = require('path');
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})
app.get('/brokenlink',(req,res,stdout)=>{
    res.render('brokenlink', {title: 'F',info: stdout})
})
app.get('/domaininfo23',(req,res)=>{
    res.render("domaininfo", {
        title:      "Whois Lookup Info Domain Availability & Registrar Checker - FreeMediaTools.com",
        data: "",
        flag: false,
        date: "",
        domainAge: "",
      });
    });
    app.get("/domaininfo23", (req, res) => {
        res.render("domainage", {
          title:
            "Check Domain Age Online - Website Age Checker - Domain Age Checker - FreeMediaTools.com",
          data: "",
          flag: false,
          date: "",
          domainAge: "",
      });
      });
    app.get("/webup",(req,res)=>{
        res.render("Websiteupdown.ejs", { title: "FREE Bulk Website Up-Down Status Checker Online Tool - Best Bulk Website Uptime Checker Tool - FreeMediaTools.com" });

    })  
    app.get('/alexarank',(req,res) => {
      res.render('alexasiteinfo',{title:"FREE Alexa Rank Of Website Checker Information - FreeMediaTools.com",flag:false,data:''})
    })
    
    app.post('/alexasiteinfo',async(req,res,) => {
      
     
    
      var site = req.body.url
    
      console.log(site)
      if(isValidDomain(site)){
    
        var data = await AlexaRank.siteinfo(site);
        console.log(data);
    
        if(data.status === 400){
          res.send("Please enter domain without http or https")
        }else if(data.status === 404){
          res.send("Your Website Doesn't have a alexa rank")
        }
        else{
          res.render('alexasiteinfo',{title:"FREE Alexa Rank Of Website Checker Information - FreeMediaTools.com",flag:true,data:data})
        }
    
      }
      else{
        res.send("Domain name is not valid")
      }
    
    })
    
    
    
    app.post("/singledomainstatuschecker", async (req, res) => {
        var url = req.body.domain;
    
        var statusResult = await isUp(url);
        if(statusResult){
          res.json({
            domain: url,
            domainstatus:"Site is Running (200) OK",
          });
        }
        else{
          res.json({
            domain: url,
            domainstatus:"Site is Down (500) Not Ok",
          });
        }
    });
      app.post("/domainwhoisinfo", async (req, res) => {
        var domain = req.body.domain;
      
        var results = await whoisinfo(domain);
      
        var date = moment(results.creationDate).format("YYYY-MM-DD");
        var currentDate = moment(new Date()).format("YYYY-MM-DD");
      
        console.log(date);
        console.log(currentDate);
      
        var a = moment(date);
        var b = moment(currentDate);
      
        var years = b.diff(a, "year");
        a.add(years, "years");
      
        var months = b.diff(a, "months");
        a.add(months, "months");
      
        var days = b.diff(a, "days");
        
      var domainAge = years + " years " + months + " months " + days + " days";
    
      console.log(years);
      console.log(months);
      console.log(days);
    
      //console.log(year + "-" + month + "-" + dt);
    
      res.render("domaininfo", {
        title:
          "Whois Lookup Info Domain Availability & Registrar Checker - FreeMediaTools.com",
        data: results,
        flag: true,
        date: date,
        domainAge: domainAge,
      });
    });
    
    app.post("/domainagechecker", async (req, res) => {
        var domain = req.body.domain;
      
        var results = await whoisinfo(domain);
      
        var date = moment(results.creationDate).format("YYYY-MM-DD");
        var currentDate = moment(new Date()).format("YYYY-MM-DD");
      
        console.log(date);
        console.log(currentDate);
        var a = moment(date);
        var b = moment(currentDate);
      
        var years = b.diff(a, "year");
        a.add(years, "years");
      
        var months = b.diff(a, "months");
        a.add(months, "months");
      
        var days = b.diff(a, "days");
      
        var domainAge = years + " years " + months + " months " + days + " days";
      
        console.log(years);
        console.log(months);
        console.log(days);
    
        //console.log(year + "-" + month + "-" + dt);
      
        res.render("domainage", {
          title:
            "Check Domain Age Online - Website Age Checker - Domain Age Checker - FreeMediaTools.com",
          data: results,
          flag: true,
          date: date,
          domainAge: domainAge,
        });
    })


app.post('/brokenf', (req, res) => {
    var url = prependhttp(req.body.url)
  
    exec(`brkn ${url} --verbose`, (err, stdout, stderr) => {
  
      if (err) {
        res.send(err)
      }
  
      console.log(stdout)
      res.render('brokenlink', {title: 'F',info: stdout})
  

    })
  })
  
  
  

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
