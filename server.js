const express = require("express")
const app = express()
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/urlshortener", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const shorturl = require("./models/shorturl")

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: false }))

app.get("/", async(req, res) => {
    const shorturls = await shorturl.find()
    res.render("index", { shorturls: shorturls })
})

app.post("/shrinkurl", async(req, res) => {
    await shorturl.create({
        fullurl: req.body.urlpath
    })

    res.redirect("/")
})

app.get("/:shorturl", async(req, res) => {

    const short = await shorturl.findOne({ shorturl: req.params.shorturl })
    if (short == null) return res.sendStatus(404)

    short.clicks++
        short.save()

    res.redirect(short.fullurl)
})
const port = process.env.PORT || 10000
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected on port " + port);

    }
})