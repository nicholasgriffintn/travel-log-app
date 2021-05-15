try {
  const express = require('express');

  const cors = require('cors');
  const cookieParser = require('cookie-parser');
  const compression = require('compression');
  const helmet = require('helmet');
  const hpp = require('hpp');
  const morgan = require('morgan');

  const app = express();

  // Add trust proxy
  app.set('trust proxy', 1);

  // Disable powered by
  app.disable('x-powered-by');

  // Add default headers
  app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Origin',
      req.header && req.header('Origin') ? req.header('Origin') : '*'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,authorization,type,Origin,Content-Type,Accept,Authorization,Access-Control-Allow-Credentials,sentry-trace,X-Api-Version'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader(
      'Permissions-Policy',
      `accelerometer, camera, geolocation, gyroscope, magnetometer, microphone, payment, usb`
    );
    res.setHeader('referrer-policy', 'strict-origin-when-cross-origin');
    res.setHeader('x-content-type-options', 'nosniff');

    res.setHeader('X-Server', `Server-${process.env.NODE_ENV}`);
    res.setHeader('X-Server-Process', process.pid);

    next();
  });

  // Enables Helmet, a set of tools to
  // increase security.
  let cspSrc = ["'self'", '*.localhost:5000'];
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: cspSrc,
          reportUri: `/api/csp/report`,
        },
        reportOnly: true,
      },
    })
  );

  // Parses cookies
  app.use(cookieParser());

  // Prevent HTTP parameter pollution
  app.use(hpp());

  // Allows for the parsing of JSON and forms
  app.use(
    express.json({
      limit: '50mb',
    })
  );
  app.use(
    express.urlencoded({
      limit: '50mb',
      extended: true,
    })
  );

  // to support x-ndjson
  app.use(
    express.text({
      limit: '50mb',
      type: 'application/x-ndjson',
    })
  );

  // Compresses the response
  app.use(compression());

  // Request logging
  app.use(morgan('tiny'));

  // Create the default API route
  const defaultRoute = express.Router();

  // Redirect the root path
  defaultRoute.get('/', (req, res, next) => {
    res.redirect('/health');
  });

  // Post API for CSP reports
  defaultRoute.post(`/csp/report`, (req, res) => {
    if (req.body && req.body['csp-report']) {
      logger.warn(`CSP header violation`, req.body[`csp-report`]);
      res.status(204).end();
    } else {
      res.status(204).end();
    }
  });

  defaultRoute.get('/health', cors(), (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'All is well',
    });
  });

  // Controller for logs
  const logs = require('./controllers/logs');

  defaultRoute.use('/logs', logs);

  // Add the default route to the /api endpoint
  app.use('/api', defaultRoute);

  // Default route handeler
  app.get('*', (req, res, next) => {
    const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);

    error.statusCode = 404;

    next(error);
  });

  // Error handeler
  app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;

    res.status(statusCode).send(message);
  });

  const PORT = 5156;

  app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
} catch (err) {
  console.error(err);
}
