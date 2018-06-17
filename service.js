var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

require('chromedriver');
var webdriver = require ('selenium-webdriver'),
    By=webdriver.By;
    until=webdriver.until;

    var driver=new webdriver.Builder().forBrowser('chrome').build();

    driver.get('https://theukrainians.org');

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("theukrainians");
      dbo.createCollection("news", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
    });
  });

    //driver.sleep(10000);
    //driver.quit();

    try {
      let k=0;
      var arrTitles=[];
      driver.findElements(By.xpath("//section[@class='section-white']//div[@class='news_box']//h2[@class='news_title']")).then(function(elements){

        elements.forEach(function (element,index,array) {
          element.getText().then(function(title){
              if(title!=="") {
                k++;
                myobj= {
                  title:title
                };
                arrTitles.push(myobj);
                console.log(title+elements.length+ " "+k);
                if(k===elements.length) {
                MongoClient.connect(url, function(err, db) {
                  var dbo = db.db("theukrainians");
                  dbo.collection("news").insertMany( arrTitles, function(err, res) {
                    if (err) throw err;
                    console.log("Number of documents inserted: " + res.insertedCount+" "+res);
                    db.close();
                  });
                });
                }
              }
          });
        });
    });

    } catch (err) {
      console.log(err);
    }

    try {
      driver.findElements(By.xpath("//section[@class='section-white fourCol'][1]//div[@class='list_filter']//a[3]")).then(function(elements){
        elements.forEach(function(element){
          element.getAttribute("href").then(function(href){
            console.log(href);
            var d=new webdriver.Builder().forBrowser('chrome').build();
            d.get(href);
            try {
              let k=0;
              var arrTitles=[];
             
              d.findElements(By.xpath("//div[@class='news_box']//div[@class='b_text']//h2[@class='news_title']//a")).then(function(elements){
        
                elements.forEach(function (element) {
                  element.getText().then(function(title){
                      if(title!=="") {
                        //console.log(title);
                        k++;
                        console.log(title+" "+k+" "+elements.length);
                        // k++; 
                        myobj= {
                          title:title
                        };
                      
                       // console.log(k+"us");

                        arrTitles.push(myobj);
                        //console.log(arrTitles.length+" "+i);
                        console.log(elements.length+" "+k);
                        if(k===elements.length) {
                          
                        MongoClient.connect(url, function(err, db) {
                          var dbo = db.db("theukrainians");
                          dbo.collection("news").insertMany( arrTitles, function(err, res) {
                            if (err) throw err;
                            console.log("Number of documents inserted interview: " + res.insertedCount+" "+res);
                            db.close();
                            //d.sleep(5000);
                          });
                        });
                        }
                      }
                  });
                });
            });
        
            } catch (err) {
              console.log(err);
            }
          });
         
        });
      });
    }
    catch (err){
      console.log(err);
    }
    