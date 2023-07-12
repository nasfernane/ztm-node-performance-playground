const express = require('express');
const cluster = require('cluster');
const os = require('os');
// const availableParallelism = require('node:os');

const app = express();

const PORT = 3000;
const CPUS_NUMBER = os.availableParallelism();

// subtilité pour que ça marche sur windows
cluster.schedulingPolicy = cluster.SCHED_RR;

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked..
  }
}

app.get('/', (req, res) => {
  // real life blocking functions
  // JSON.stringify({})
  // JSON.parse("{]")
  // [6, 1, 3, 2, 4].sort()
  res.send(`Performance example ${process.pid}`)
})

app.get('/timer', (req, res) => {
  // delay the response
  delay(5000);
  res.send(`Ding ding ding! ${process.pid}`);
})


if (cluster.isMaster) {
  console.log('Master has been started')

  for (let i = 1; i <= CPUS_NUMBER; i++) {
    cluster.fork().on('disconnect', () => {
    console.log(`Worker ${i} disconnected`);
  });
  }
} else {
  console.log('worker listening');
  app.listen(PORT);
}

