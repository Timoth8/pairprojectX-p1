const express = require('express')
const app = express()
const port = 3000
const router = require('./router')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))

app.use("/", router) // ini utk memindahkan routing


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})