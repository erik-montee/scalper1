const { parentPort, workerData } = require('worker_threads');
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        const username = workerData[0];
        const password = workerData[1];
        const cvv = workerData[2];
        const login = process.env.LOGIN_URL;
        const url = workerData[3];
        const checkout = process.env.CHECKOUT_URL;

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
     
            //click place Order UNCOMMENT THIS LINE for actual use
            //await driver.wait(until.elementLocated(By.css("button[class='btn btn-lg btn-block btn-primary button__fast-track']"))).click();
            parentPort.postMessage(true);
            setTimeout(function(){ console.log("Hello"); }, 3000);
            console.log("hiiii");
            }, 6000);
    } finally {
      //await driver.quit();
    }
  })();