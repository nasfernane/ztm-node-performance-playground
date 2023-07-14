const express = require('express');
// const cluster = require('cluster');
// const os = require('os');
// const availableParallelism = require('node:os');

const app = express();

const PORT = 3000;
// const CPUS_NUMBER = os.availableParallelism();

// subtilité pour que ça marche sur windows
// cluster.schedulingPolicy = cluster.SCHED_RR;

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
  res.send(`Beep Beep Beep! ${process.pid}`);
})


// if (cluster.isMaster) {
//   console.log('Master has been started')

//   for (let i = 1; i <= CPUS_NUMBER; i++) {
//     cluster.fork().on('disconnect', () => {
//       console.log(`Worker ${i} disconnected`);
//     });
//   }
// } else {
//   console.log('worker listening');
//   app.listen(PORT);
// }

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`)
});

// Au lieu de créer un cluster qu'on fork selon le nombre de cpus disponibles, on peut lancer via pm2 qui intègre directement le clustering en spécifiant le nombre d'instances ou en ouvrant le nombre max
// ex : pm2 start server.js -l logs.txt -i 8
// ex : pm2 start server.js -l logs.txt -i max

// regarder le détail d'un process spécifique avec show
// ex: pm2 show 0

// interrompre un process spécifique avec stop
// ex: pm2 stop 4

// relancer un process spécifique avec start
// pm2 start 4

// monitorer les processus avec monit
// pm2 monit

// restart all
// pm2 restart server

// zero downtime restart
// pm2 reload server

