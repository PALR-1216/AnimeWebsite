const express = require('express')
const app = express()
const body_parse = require('body-parser')
const path = require('path')
const mysql = require('mysql')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

var urlencodedParser = body_parse.urlencoded({extended:false});



var conn = mysql.createConnection({
    host:'bn8cepiflg4apyvypdto-mysql.services.clever-cloud.com',
    user:'uuqcbzq048lebkxt',
    password:'s6OHD2KAlVjCZ59pYYNv',
    port:3306,
    database:'bn8cepiflg4apyvypdto'
});


conn.connect((err) =>{
    if(err) throw err.sqlMessage;
    console.log("connected to database")

  
})

app.get("/", (req,res) =>{

    conn.query("select * from animeList", (err, rows) =>{

        res.render('Home', {model:rows}) 
    })
})

app.get('/list/:id', urlencodedParser, (req,res) =>{
//   var AnimeName = req.params.ANimeName;
  conn.query("select * from myAnimeShows where animeId = " + req.params.id, (err,rows) =>{
      if(err) throw err;
      console.log(rows)
      
      res.render("ListShows", {model:rows})
  })
  
})

app.get('/watch/:animeVideoId', (req,res) =>{
    
    conn.query(`select animeVideoId from myAnimeShows where animeVideoId = '${req.params.animeVideoId}'`  , (err,rows) =>{
        if(err) throw err;
        console.log(rows)
        res.render('VideoPlayer', {model:{
            videoId: req.params.animeVideoId
        }})
        
    })
})

app.get('/info', (req,res) =>{
    res.send("a Anime WebSite made from pedro Lorenzo")
})



const PORT = process.env.PORT || 3000

app.listen(PORT ,() =>{
    console.log("server running in port 3000")
})

//StreamTapeAPI List files in Juju Folder//https://api.streamtape.com/file/listfolder?login=68889ca36ba038773ad4&key=PDz3B0DDvvt0VZ8&folder=PRg2z04aROs