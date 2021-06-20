const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
require("./Book");
const dataBase = mongoose.model("Entry");

mongoose.connect("mongodb+srv://admin:admin@cluster0.clq6u.mongodb.net/test", () => {
    console.log("database connected");
});

app.get('/', (req, res) => {
    res.send("default page with get");
})

app.get('/inventory', (req, res) => {
    dataBase.find().then((items) => {
        res.json(items)
    }).catch(err => {
        throw err;
    })
})

app.delete('/inventory', (req, res) => {
    dataBase.remove().then(() => {
        console.log("removed all");
        res.send("deleted all");
    }).catch(err => {
        throw err;
    })
})

app.delete('/inventory/:id', (req, res) => {
    dataBase.findByIdAndRemove({ _id: req.params.id }).then(console.log("deleted")).catch(err => {
        if (err) {
            throw err;
        }
    })
    res.send("deleted");
})

app.get('/inventory/:id', (req, res) => {
    dataBase.findById(req.params.id).then((data) => {
        if (data) {
            res.json(data)
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
})


app.post('/inventory', (req, res) => {
    var newData = {
        name: req.body.name,
        quantity: req.body.quantity
    }
    var data = new dataBase(newData)
    data.save().then(() => {
        console.log("new data created")
    }).catch((err) => {
        throw err;
    })
    console.log(req.body);
    res.send("data sent")
})

app.put("/inventory/:name", (req, res) => {
    var itemName = req.params.name;
    dataBase.findByIdAndUpdate(itemName,req.body).then((items)=>{
        res.send(items);
    }).catch((err)=>{
        console.log(err);
    })
});

app.listen(4545, () => {
    console.log("up and running");
})