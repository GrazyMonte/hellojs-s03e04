const knex = require("./db").knex
const express = require("express")
const app = express()
const bodyParser = require('body-parser')

app.use(express.static("public"))

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/pessoas/list", (req, res) => {
    knex("pessoa").select().then(ret => {
        res.send(ret)
    }).catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

app.post("/dosave", (req, res) => {
    res.send(`
    <h2>Olá, ${req.body.nome}!</h2>
    <a href="index2.html">Voltar</a>
    `)
})

knex.migrate.latest().then(_=>{
    console.log("knex migrate latest")
    app.listen(3000, _ => console.log('All subsystems - [ONLINE]'))
})
