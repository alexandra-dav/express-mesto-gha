const express = require('express');
const { json, urlencoded } = require('express');
const { connect } = require('mongoose');
const router = require('./routes/index');

const { PORT = 3001 } = process.env;

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

// подключаемся к серверу mongo
connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

// подключаем мидлвары, роуты и всё остальное...
app.use((req, res, next) => {
  req.user = {
    _id: '63ac5751b1864cc7a7a030a9',
  };

  next();
});
app.use('/', router);

app.listen(PORT);
