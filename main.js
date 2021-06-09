const { Worker, isMainThread } = require('worker_threads');

(async function example() {
    let username = process.argv[2];
    let password = process.argv[3];
    let cvv = process.argv[4];
    let numberOfThreads = process.argv[5];
    for (i = 0; i < numberOfThreads; i++) {
        originalArray = [username, password, cvv];
        const worker = new Worker('./worker.js', { 
            workerData: originalArray
        });
      } 
})();
