import * as express from 'express';
import * as logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import showplacesRouter from './routes/showplaces';

const App = express();


App.use(logger('dev'));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

App.use('/', indexRouter);
App.use('/users', usersRouter);
App.use('/showplaces', showplacesRouter);

App.use(function(req, res, next) {
  res.json({ statusCode: 404 })
});

// error handler
App.use(function(err, req, res, next) {
  res.json({ 
    statusCode: 500, 
    mesage: err.message,
    stack: err.stack
    })
});

export default App;
