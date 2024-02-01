var express = require("express");
var path = require("path");
const bodyParser = require('body-parser');
var app = express();

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://robert:pogosyan@cluster0.rloxndr.mongodb.net/RobertDatabase';


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set("view engine",'ejs');
app.get("/", function(req, res){
    mongoose.connect(connectionString, { useUnifiedTopology: true ,useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
        try{
            // const allMovies = await mongoose.connection.db.collection('sessions').find().toArray();
            let result = await mongoose.connection.db.collection('theaters').find({'location.address.city':'Bloomington'}).toArray();
            res.render("../public/form.ejs",{
                info: result
            });
        }catch(error){
    console.error('Error retrieving movies:',error);
        }finally{
            mongoose.connection.close();
        }
    })
 });
 


app.post('/addName', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    mongoose.connect(connectionString, { useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', async () => {
        console.log('Connected to MongoDB!');
    
        try{
            // const allMovies = await mongoose.connection.db.collection('sessions').find().toArray();
            await mongoose.connection.db.collection('users').insertOne({
                id: age,
                name: name
            })
        }catch(error){
    console.error('Error retrieving movies:',error);
        }finally{
            mongoose.connection.close();
        }
        mongoose.connection.close();
    });
    
 });

app.listen(3000, function(){
   console.log("Example is running on port 3000");
});

