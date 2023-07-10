import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import userRoutes from './routes/user.route';
import blogRoutes from './routes/blog.route';
import {
  errorLogger,
  errorResponder,
  finalErrorHandler,
  invalidPathHandler,
  requestLogger,
} from './middlewares';

// connect to mongodb
require('./database/dbConn');

const app = express();
const port = 4000;

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: true,
  })
);

app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());

app.use('/', userRoutes);
app.use('/', blogRoutes);

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);
app.use(finalErrorHandler);

const server = app.listen(port, () =>
  console.log(`Server up on port ${port}!`)
);

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
