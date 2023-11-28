const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

// definindo o handlebar como template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

// past de arquivos estáticos com CSS, imagens
app.use(express.static("public"))

// trabalhar com dados no  formato jason
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas 
app.get("/", (requisicao, resposta) => {
    resposta.render("home")
})

// conexão com o mySQL
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if (error) {
        console.log(error)
        return
    }

    console.log("Conectando ao MySQL!")

    app.listen(3306, () => {
        console.log("Servidor rodando na porta 3000!")
    })
})


