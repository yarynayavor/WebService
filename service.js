var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/theukrainians";

require('chromedriver');
var webdriver = require ('selenium-webdriver'),
    By=webdriver.By;
    until=webdriver.until;

    var driver=new webdriver.Builder().forBrowser('chrome').build();

    driver.get('https://theukrainians.org');
    // driver.sleep(100000);
    // driver.quit();
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      db.close();
    });