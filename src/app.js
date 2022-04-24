// import express
const express = require("express");
const app = express();

// require hbs file
const hbs = require("hbs");

// Import Path
const path = require("path");

// import conn.js file
require("./db/conn")

// import models file
const Register = require("./models/registers")

const port = process.env.PORT || 3333;


app.use(express.json());
app.use(express.urlencoded({extended:false}));



// Define path of index fileURLToPath, This file we will use to show, Filename not needed
// const static_path = path.join(__dirname,"../public");
// serving index.html file
// app.use(express.static(static_path));

// Define paths of files
// path of views
const templatePath = path.join(__dirname,"../templates/views");

// path of hbs file
const partialpath = path.join(__dirname,"../templates/partials")


// to set hbs file path
app.set("view engine","hbs");

// to set view folder location
app.set("views",templatePath);

// set hbs path
hbs.registerPartials(partialpath)



app.get("/",(req,res)=>{
    // res.send("Hi from Server");
    res.render("index")
});



app.post("/register",async(req,res)=>{
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    if(password===cpassword){
        const registeremp = new Register({
            name :req.body.firstname,
            email :req.body.email,
            password :req.body.password,
            cpassword :req.body.cpassword
        })
        const reg = await registeremp.save();
        // res.status(201).send(reg)
        res.status(201).render("welcome")
    }else{
        res.send("Password not matching")
    }
})

app.get("/register/:id",async(req,res)=>{
    
    // While using async await add async in above just before req,res
    try{
        const _id = req.params.id;
        const employeetData= await Register.findById(_id);
        res.status(201).send(employeetData)
    }catch(e){
        res.status(401).send(e)
    }
});


app.listen(port,()=>{
    console.log(`Server running at ${port}`)
})