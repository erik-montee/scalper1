require('dotenv').config();
const {Worker} = require('worker_threads');

(async function example() {
    const username = process.env.BB_USER_NAME;
    const password = process.env.PASSWORD;
    const cvv = process.env.CVV;
    const numberOfThreads = process.env.NUM_THREADS;

    for (let i = 0; i < numberOfThreads; i++) {
        const originalArray = [username, password, cvv];
        new Worker('./worker.js', {
            workerData: originalArray
        });
    }
})();
