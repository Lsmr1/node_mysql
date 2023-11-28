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
app.post("/edit/save", (request, response) => {
    const { id, title, pageqty } = request.body

    const sql = `
    UPDATE books
    SET title = '${title}', pageqty = '${pageqty}'
    WHERE id = ${id}
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        response.redirect("/")
    })
})

app.get("/register/save", (request, response) => {
    const { title, pageqty } = request.body

    const query = `
    INSERT INTO  books (title , pageqty) 
    VALUES ('${title}','${pageqty}')
    `
    conn.query(query, (error) => {
        if (error) {
            console.log(error)
            return
        }
        response.redirect("/")
    })
})
app.get("/edit/:id", (request, response) => {
    const id = request.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`
    
    conn.query(sql, (error, data ) => {
        if (error) {
            return console.log(error)
        }
        
        const book = data[0]

        responce.render('edit', { book })
    })
})

app.get("/book/:id", (resquest, responce) => {
const id = request.params.id

const sql = `
    SELECT * FROM books
    WHERE id=${id}
    `
    
    conn.query(sql,(error, data) => {
        if(error) {
            return console.log(error)
        }
        
        const book = data[0]

        responce.render("book", {book})
    })
})

app.get("/register", (request, response) => {
    response.render("register")
})

app.get("/", (requisicao, resposta) => {
    const query = 'SELECT * FROM books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }
        const books = data
        console.log(books)
        resposta.render("home", { books })
    })


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


