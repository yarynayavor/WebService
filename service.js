var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/theukrainians";

require('chromedriver');
var webdriver = require ('selenium-webdriver'),
    By=webdriver.By;
    until=webdriver.until;

    var driver=new webdriver.Builder().forBrowser('chrome').build();

    driver.get('https://theukrainians.org');
    

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
      
      db.close();
    });
    //driver.sleep(10000);
    //driver.quit();

    try {
      let k=0;
      driver.findElements(By.xpath("//div[@class='news_box']//h2[@class='news_title']")).then(function(elements){
        elements.forEach(function (element) {
          element.getText().then(function(text){
              if(text!=="") {
                k++;
                console.log(text+k);
              }
          });
        });
    });
   
      // var elements = driver.findElements(By.xpath("//div[@class='news_box']"));
    } catch (err) {
      console.log(err);
    }

    // elements.then(res=>{
    //   console.log(res);
    // })
    