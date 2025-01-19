const express=require("express");

const app=express();

app.get("/",(req,res)=>{
    return res.send("Welcome to Homepage");
})

app.get("/about",(req,res)=>{
    return res.send("Welcome to about page");
})

app.listen(8800,()=>console.log("Server Started"));
