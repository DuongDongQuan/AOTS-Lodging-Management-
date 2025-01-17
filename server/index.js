const express = require('express')
const cors = require('cors')
const route = require('./src/routes')
const db = require('./src/config/db')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

db.connect()
route(app)

const port = 3999
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})