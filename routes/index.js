const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const CC = require('../controllers/cheerioControler');
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

    console.log(resp.articles);

    resp.articles.forEach(element => {
      //let dbArtciles = await db.Article.find();
      // Create a new Article using the `result` object built from scraping
      db.Article.create(element)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
      
    });

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