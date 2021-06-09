const { parentPort, workerData } = require('worker_threads');
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        let username = workerData[0];
        let password = workerData[1];
        let cvv = workerData[2];
        let login = 'https://www.bestbuy.com/identity/signin?token=tid%3Ae4470626-c8ce-11eb-b407-0a588ff6653d';
        let url = 'https://www.bestbuy.com/site/wowwee-fingerlings-baby-penguin-tux-multi/6361538.p?skuId=6361538';
        let checkout = 'https://www.bestbuy.com/checkout/r/fast-track';
        //let url = 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3070-ti-8gb-gddr6x-pci-express-4-0-graphics-card-dark-platinum-and-black/6465789.p?skuId=6465789';
        //let url = 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440';
  
        await driver.get(login);
        //enter username and password
        await driver.wait(until.elementLocated(By.name('fld-e'))).sendKeys(username);
        await driver.wait(until.elementLocated(By.name('fld-p1'))).sendKeys(password);
        await driver.findElement(By.css("button[class='btn btn-secondary btn-lg btn-block c-button-icon c-button-icon-leading cia-form__controls__submit ']")).click();
        setTimeout( async function(){
            console.log("Logged in"); 
            let checkForAddToCartButton = true;
            while(checkForAddToCartButton) {
                await driver.get(url);
                await driver.findElement(By.css("button[class='btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button']"))
                    .then(function(webElement) {
                        checkForAddToCartButton = false;
                        console.log('Element exists');
                    }, function(err) {
                        if (err.name === 'NoSuchElementError') {
                            console.log('Element not found');
                        }
                    });
                }
       
            await driver.findElement(By.css("button[class='btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button']")).click();
            await driver.get(checkout);
       
            if(cvv != 0) {
                await driver.wait(until.elementLocated(By.xpath("//input[contains (@id, 'cvv')]"))).sendKeys(cvv);
            }
     
            //click place Order
            //await driver.wait(until.elementLocated(By.css("button[class='btn btn-lg btn-block btn-primary button__fast-track']"))).click();
            setTimeout(function(){ console.log("Hello"); }, 12000);
            }, 6000);
    } finally {
      //await driver.quit();
    }
  })();