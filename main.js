require('dotenv').config();
const {Worker} = require('worker_threads');
const fs = require('fs');

(async function example() {
    let data = JSON.parse(fs.readFileSync('data.json'));
    count = 0;
    data.forEach(function(value) {
        const originalArray = [value.username, value.password, value.cvv, value.url];
        let worker = new Worker('./worker.js', {
            workerData: originalArray
        });

        worker.on('message', (result) => {
            if(result){
                count++;
                console.log(count);
                console.log(process.env.NUMBER_TO_BUY);
                console.log(count >= parseInt(process.env.NUMBER_TO_BUY));
                if(count >= process.env.NUMBER_TO_BUY) {
                    console.log('dieing');
                    process.exit();
                }
            }
        });
    });
})();
