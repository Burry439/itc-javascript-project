
const express = require('express')
const app = express()
const port = 3000
const path = require('path');

// set the directory from where to serve static assets
app.use ("/", express.static (path.join(__dirname, "public") ))

//send the index.html page to the client
app.get("/", (req,res) =>{
    res.sendFile("./public/html/index.html", { root: __dirname })
})

//send the company.html page to the client
app.get("/company.html", (req,res) =>{
    res.sendFile("./public/html/company.html", { root: __dirname })
})

//send the error.html page to the client when a client goes to a route that we havent made
app.get('*', (req, res) => {
    res.sendFile('./public/html/error.html', { root: __dirname });
});

//start the server and tell it to listen on port 3000
app.listen(port, () => console.log(`listening at http://localhost:${port}`))