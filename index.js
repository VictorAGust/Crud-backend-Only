require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//initial route/end point
app.get('/', (req, res) => {})


//DB-Connection
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@crud.cxng3.mongodb.net/Crud?retryWrites=true&w=majority`)
.then(() => {
    console.log("Conectamos ao MongoDB")
    app.listen(3000)
})
.catch((err) => console.log(err))
