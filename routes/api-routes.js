const db = require ("../models/index.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app){
    app.get("/",(req,res) => {
       res.render("index");
    });
    
    // The scrape route pulls info from Beer Advocate and pushes it into the database
    app.get("/scrape", (req,res) => {
        axios.get("https://www.beeradvocate.com/beer/")
        .then(response => {
            const $ = cheerio.load(response.data);
            const scrapeData = {
                "data":[]
            };
            $("div#rating_fullview_container").each(function(i, element){
                const name = $(element).find("h6").children("a").text();
                
                scrapeData.data.push({
                    "beerName":name
                });
            });
            
            res.json(scrapeData);
        });

    });

};