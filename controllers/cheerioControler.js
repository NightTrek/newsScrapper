const cheerio = require('cheerio');
const mongoose = require('mongoose');
const axios = require('axios');


//pull news from the site https://www.reddit.com/r/programminghumor/

module.exports = {
    site: "https://www.reddit.com/r/programminghumor/",//https://www.nytimes.com/section/us

    pullNewsArticles: async function () {
        let dom = await axios.get("https://www.nytimes.com/section/us");
        let $ = cheerio.load(dom.data);
        let results = [];
        $("article").each(function (i, element) {

            // Save the text of the element in a "title" variable
            let title = $(element).find('h2').children().text();

            // In the currently selected element, look at its child elements (i.e., its a-tags),
            // then save the values for any "href" attributes that the child elements may have
            let link = $(element).find('h2').children().attr("href");

            let summery = $(element).find('p').text();

            // Save these results in an object that we'll push into the results array we defined earlier
            results.push({
                title: title,
                summery: summery,
                link: link,
            });
        });
        //console.log(results);
        return new Promise((resolve, reject) => {
            if (results.length > 0) {
                resolve(results);
            }
            else {
                reject({ err: "results has 0 length failed to pull results" })
            }
        });
    }




}