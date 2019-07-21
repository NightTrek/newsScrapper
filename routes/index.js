const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CC = require('../controllers/cheerioControler');
const MC = require('../controllers/mongooseController');
let db = require("../models/articleModel");

mongoose.connect("mongodb://localhost/newsScrapper_db", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const article = new Schema({
  title: String,
  summery: String,
  link: String,
  comments: Array
});



//homepage get function
router.get("/", async function(req, res) {
    try{
      
    let resp = {articles: await CC.pullNewsArticles()};

    //let mcResp = await MC.getArticlesFromDB();
    console.log(resp.articles);

  

    res.render("DisplayAll", resp)
    }catch(err){
      res.render('error page');
      console.log(err)

    }
  });

  router.post("/comment", async function(req, res) {
    try{
    let resp = {articles: await CC.pullNewsArticles()};

    console.log(resp.articles);

    res.render("DisplayAll", resp)
    }catch(err){
      res.render('error page');
      console.log(err)
    }
  });

module.exports = router