export function requestLogger(req, res, next) {
  console.log(`${req.method} url:: ${req.url}`);
  next();
}

export function errorLogger(error, req, res, next) {
  console.log(`error ${error.message}`);
  next(error);
}

export function errorResponder(error, req, res, next) {
  res.header('Content-Type', 'application/json');

  const status = error.statusCode || 400;
  res.status(status).send({ message: error.message });
}

export function invalidPathHandler(error, req, res, next) {
  response.status(404);
  response.send('invalid path');
}

export function finalErrorHandler(error, req, res, next) {
  if (res.headersSent) return next(err);
  console.error(error.stack);
  res.status(500);
  res.send({ message: error.message });
}
