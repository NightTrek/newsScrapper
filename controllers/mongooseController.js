const mongoose = require('mongoose');
const CC = require('./cheerioControler');
let db = require("../models/articleModel");


module.exports = {

    storeNewArticlesAndReturnAllPageElements: async function () {
        let ArticleArray = [];
        try {
            let newArticles = await CC.pullNewsArticles();
            let oldArticles = await this.getArticlesFromDB();

            if(oldArticles.length >0){
                newArticles.forEach(element => {
                    let isArticlePresent = await db.Article.find(element.title);
                    console.log(isArticlePresent);
                    if(!isArticlePresent){
                        let additem = await db.Article.create(element);
                        console.log(additem);
                        ArticleArray.push(additem);
                    }
                    else{
                      ArticleArray.push(isArticlePresent)
                    }
                });

            }else{
                newArticles.forEach(element => {
                    let additem = await db.Article.create(element);
                    console.log(additem);
                    ArticleArray.push(additem);
                });
            }
            return new Promise((resolve, reject) => {
                if(ArticleArray.length>0){
                    resolve(ArticleArray);
                }else{
                    reject("Article Array is empty when building news Article array from mongoose");
                }
            });

        } catch (err) {
            console.log(err)
            console.log('error updating new articles')
        }
    },

    getArticlesFromDB: async function () {
        mongoose.connect("mongodb://localhost/newsScrapper_db", { useNewUrlParser: true });
        let dbArtciles = await db.Article.find();
        // Create a new Article using the `result` object built from scraping

        return new Promise ((resolve, reject) => {
            if(dbArtciles){
                resolve(dbArtciles);
            } else {
                reject("error finding documents")
            }

        });
    },

    addArticlesToDB: async function(){
        try{
            db.Article.create()
        }catch(err)
        {
            console.log(err);
        }
    }



}