/* eslint-disable no-console */
const dotenv = require('dotenv');
const cluster = require('cluster');
const numCores = require('os').cpus().length;
const app = require('./app');

// Handle uncaught exceptions
process.on('uncaughtException', (uncaughtExc) => {
  console.error('uncaughtException Err::', uncaughtExc);
  console.error('uncaughtException Stack::', JSON.stringify(uncaughtExc.stack));
  process.exit(1);
});

const workers = [];
const setupWorkerProcesses = () => {
  console.info(`Master cluster setting up ${numCores} workers`);

  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());

    workers[i].on('message', function (message) {
      console.info(message);
    });
  }

  cluster.on('online', function (worker) {
    console.info(`Worker ${worker.process.pid} is listening`);
  });

  cluster.on('exit', function (worker, code, signal) {
    console.error(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`
    );
    console.info('Starting a new worker');
    cluster.fork();
    workers.push(cluster.fork());
    workers[workers.length - 1].on('message', function (message) {
      console.info(message);
    });
  });
};

const setUpExpress = () => {
  dotenv.config({ path: '.env' });

  const port = process.env.APP_PORT || 8000;

  const server = app.listen(port, () => {
    console.info(`App running on port ${port}...`);
  });

  // In case of an error
  app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack);
    console.error('on url', appCtx.req.url);
    console.error('with headers', appCtx.req.headers);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      console.info('💥 Process terminated!');
    });
  });
};

// Setup server either with clustering or without it
const setupServer = (isClusterRequired) => {
  // If it is a master process then call setting up worker process
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    // Setup server configurations and share port address for incoming requests
    setUpExpress();
  }
};

if (process.env.NODE_ENV === 'production') {
  setupServer(true);
} else {
  setupServer(false);
}
