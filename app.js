var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const router = express.Router();



var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
  console.log("Connected to mongodb server")
});
process.env.TZ = 'Asia/Seoul';

var browser;
var page;

mongoose.connect('mongodb://localhost/db_fundingrate');
var rate = require('./models/rate');
setInterval(()=>{
  (async () => {
    try {
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();
    await page.setViewport({
      width: 1366,
      height: 768
    });
    // "https://www.goodchoice.kr/product/search/2" URL에 접속한다. (여기어때 호텔 페이지)
    await page.goto("https://www.coinglass.com/FundingRate",{
      waitUntil:'load',
      timeout:0
    });
 
    
      const content = await page.content();

      const $ = cheerio.load(content);
      
      const lists = $("#ufr");
      var ratemodel = new rate();
      var nIndex = 0;
      var column = ['binance','Okex','Bybit','FTX','Huobi','Gate','Bitget'];
      for(let i =0;i < lists[0].children[0].children.length;i++){
          var node = lists[0].children[0].children[i]
          var data = node.children[0].childNodes[0].children[0].data;
          ratemodel[column[nIndex++]]=data;
      }



      ratemodel.save(function(err){
        if(err){
            console.error(err);
            page.close();
            browser.close()
            return;
        }
      });
    } catch (error) {
      page.close();
      browser.close()
      console.error(error);
    }
  
    
      page.close();
    browser.close();
  
      
  
    
    
    
  })();
},300000);
