const PORT = 8000
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();

const url = 'https://www.theguardian.com/europe'

//reminder that axios works by passing through an url, visiting it and gitting a response from it
//we are going to get te response data and save it as some html that we can work with 
axios(url)
    .then(response => {
        const html = response.data; //gets back a response with al the html from the website we are scrapping
        const $ = cheerio.load(html);
        const articles = []; 
        
//11/10/2023 - IF YOU SEE THIS IN THE FUTURE, THE WEBSITE MIGHT HAVE CHANGED. CHECK FOR NEW CLASS OR APPLY IT AS YOU WISH IN OTHER WEBSITES
        $('.dcr-12ilguo', html).each(function(){ //we are looking for that class in the html. For each item like this:
            const title = $(this).text(); //get this item, and grab its text
            const url = $(this).find('a').attr('href') //get this item, find the a tag that exists in the item and get the attribute of href
            articles.push({ //for each item that I get, push it into the empty array, as show in the object below
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log (`server is running on Port ${PORT}`));
