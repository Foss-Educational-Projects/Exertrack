require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const hbs = require('express-handlebars')

const app = express()

const { server } = require('./utils/server')
const { extname } = require('path')

const hbsConfig = hbs.create({
    layoutsDir: path.join(__dirname, 'views'),
    encoding: 'utf8',
    extname: '.hbs',
    defaultLayout: 'index',
})

app.engine('handlebars', hbs.engine(hbsConfig))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index.hbs')
})

app.listen(process.env.PORT, server)
