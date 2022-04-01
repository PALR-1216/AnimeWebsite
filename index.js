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

app.get('/view/:Id', urlencodedParser, (req,res) =>{
    var animeName = req.name;
    console.log(animeName)
})



const PORT = process.env.PORT || 3000

app.listen(PORT ,() =>{
    console.log("server running in port 3000")
})